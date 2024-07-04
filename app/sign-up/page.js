'use client'
import { useState } from 'react';
import {useCreateUserWithEmailAndPassword} from 'react-firebase-hooks/auth'
import {auth} from '@/app/firebase/config'

const SignUp = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [createUserWithEmailAndPassword] = useCreateUserWithEmailAndPassword(auth);

  const handleSignUp = async () => {
    try {
        const res = createUserWithEmailAndPassword(email, password)
        console.log({res})
        sessionStorage.setItem('user', true)
        setEmail('');
        setPassword('')

    } catch(e){
        console.error(e)
    }
  };
  

  return (
    <section>
      <main className="flex min-h-screen flex-col items-center justify-between sm:p-24 p-4">
        <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm">
          <h1 className="text-4xl p-4 text-center">Sign Up</h1>
          <form className="flex items-center flex-col justify-between bg-slate-800 p-4 rounded-lg">
            <fieldset className="w-full">
              <ul className="w-full">
                <li className="mb-4">
                  <label htmlFor="email" className="block mb-2">Email:</label>
                  <input 
                    type="email" 
                    id="email" 
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)}  
                    name="email" 
                    required 
                    className="w-full p-3 border text-black" 
                  />
                </li>
                <li className="mb-4">
                  <label htmlFor="password" className="block mb-2">Password:</label>
                  <input 
                    type="password" 
                    id="password" 
                    value={password} 
                    onChange={(e) => setPassword(e.target.value)}  
                    name="password" 
                    required 
                    className="w-full p-3 border text-black" 
                  />
                </li>
              </ul>
              <button onClick={handleSignUp} type="button" className="text-white bg-slate-950 hover:bg-slate-900 p-3 text-xl w-full mt-4">Sign Up</button>
            </fieldset>
            <div className="mt-4 text-center">
              <p className="text-white pb-2">or</p>
              <a href="/sign-in" className="text-blue-500 cursor-pointer">Login</a>
            </div>
          </form>
        </div>
      </main>
    </section>
  );
}

export default SignUp;