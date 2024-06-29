// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
import { getFirestore } from "firebase/firestore";

// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBo-5H78jnE2rSD9L1VH7XnmyhXSWtyxMg",
  authDomain: "si-expense-project.firebaseapp.com",
  projectId: "si-expense-project",
  storageBucket: "si-expense-project.appspot.com",
  messagingSenderId: "731019200421",
  appId: "1:731019200421:web:2eafdd601cf2acfff20a4c"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);