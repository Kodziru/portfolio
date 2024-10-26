import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth, signInAnonymously } from "firebase/auth";

const firebaseConfig = {
    apiKey: "API_KEY",
    authDomain: "my-port-pro.firebaseapp.com",
    projectId: "my-port-pro",
    storageBucket: "my-port-pro.appspot.com",
    messagingSenderId: "778475156544",
    appId: "1:778475156544:web:0886edc34a70024e129ba5",
    measurementId: "G-PL45E5EQXN",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);
const auth = getAuth(app);

export { db, storage, auth };
