import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyDkXPwfUAazWlhb6wsO6_lXo_vWVzd0png",
    authDomain: "khoastore-d53e2.firebaseapp.com",
    projectId: "khoastore-d53e2",
    storageBucket: "khoastore-d53e2.appspot.com",
    messagingSenderId: "329464957412",
    appId: "1:329464957412:web:0577f58f9ab4595d9adff1",
    measurementId: "G-KN84PTW3HF"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const storage = getStorage(app);