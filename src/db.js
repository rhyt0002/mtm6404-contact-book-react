// src/db.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyC8cPwX5pceB0CafnudBRp5tKFmSI5628M",
    authDomain: "contacts-books-03.firebaseapp.com",
    projectId: "contacts-books-03",
    storageBucket: "contacts-books-03.firebasestorage.app",
    messagingSenderId: "168386776731",
    appId: "1:168386776731:web:1f4cf1acc2cccd8f3cc03e",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
