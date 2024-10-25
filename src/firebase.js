// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyDB18pBJcxhiHuUPoOeXj_5Ong4ToIA1nQ",
    authDomain: "resource-portal-3f3e1.firebaseapp.com",
    projectId: "resource-portal-3f3e1",
    storageBucket: "resource-portal-3f3e1.appspot.com",
    messagingSenderId: "188718695414",
    appId: "1:188718695414:web:cd426120c85c1aa32b7dd7",
    measurementId: "G-3LEFQ7EPY1"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);
export {auth,db,storage};