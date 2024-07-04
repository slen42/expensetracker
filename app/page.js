'use client'
import React, { useState, useEffect } from "react";
import { collection, addDoc, getDoc, querySnapshot, onSnapshot, query, deleteDoc, doc } from "firebase/firestore";
import { db } from "/app/firebase/config.js";
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth } from '@/app/firebase/config'
import { useRouter } from "next/navigation";
import { signOut } from "firebase/auth";

export default function Tracker() {
  const [items, setItems] = useState([]);
  const [newItem, setNewItem] = useState({ name: '', price: '' });
  const [total, setTotal] = useState();


  const [user] = useAuthState(auth);
  const router = useRouter()
  const userSession = sessionStorage.getItem('user');
  // console.log(userSession)
  // console.log(user)


  if (!user && !userSession) {
    router.push('/sign-up');
  }



  // console.log({user})
  const itempath = `users/${user?.uid}/items`;

  // Add item to database
  const addItem = async (e) => {
    e.preventDefault();
    if (newItem.name !== '' && newItem.price !== '') {
      // setItems([...items, newItem]);
      await addDoc(collection(db, itempath), {
        name: newItem.name.trim(),
        price: newItem.price,
      })
    }
  };

  // Read items from database
  useEffect(() => {
    const q = query(collection(db, itempath));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      let itemsArr = [];

      querySnapshot.forEach((doc) => {
        itemsArr.push({ ...doc.data(), id: doc.id });
      });
      setItems(itemsArr);

      // Read total from Array
      const calculateTotal = () => {
        const totalPrice = itemsArr.reduce((sum, item) => sum + parseFloat(item.price), 0);
        setTotal(totalPrice);
      };
      calculateTotal();
      return () => unsubscribe();
    });
  }, []);


  // Delete items from database
  const deleteItem = async (id) => {
    await deleteDoc(doc(db, itempath, id));
  }

  return (
    <>
      <button onClick={() => {signOut(auth); sessionStorage.removeItem('user')}} className=""> Log Out </button>
      <main className="flex min-h-screen flex-col items-center justify-between sm:p-24 p-4">
        <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm">
          <h1 className="text-4xl p-4 text-center">Expense Tracker</h1>
          <div className="bg-slate-800 p-4 rounded-lg">
            <form className="grid grid-cols-6 items-center text-black">
              <input
                value={newItem.name}
                onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
                className="col-span-3 p-3 border"
                type="text"
                placeholder="Enter Item"
              />
              <input
                value={newItem.price}
                onChange={(e) => setNewItem({ ...newItem, price: e.target.value })}
                className="col-span-2 p-3 border mx-3"
                type="number"
                placeholder="Enter $"
              />
              <button
                className="text-white bg-slate-950 hover:bg-slate-900 p-3 text-xl"
                type="submit"
                onClick={addItem}

              >
                +
              </button>
            </form>

            <ul>
              {items.map((item, id) => (
                <li key={id} className="my-4 w-full flex justify-between bg-slate-950">
                  <div className="p-4 w-full flex justify-between">
                    <span className="capitalize">{item.name}</span>
                    <span>${item.price}</span>
                  </div>
                  <button
                    onClick={() => {
                      deleteItem(item.id)
                    }}
                    className="ml-8 p-4 border-l-2 border-slate-900 hover:bg-slate-900 w-16"
                  >
                    X
                  </button>
                </li>
              ))}
            </ul>

            {items.length > 0 && (
              <div className="flex justify-between p-3">
                <span>Total</span>
                <span>${total}</span>
              </div>
            )}
          </div>
        </div>
      </main>
    </>
  );
}
