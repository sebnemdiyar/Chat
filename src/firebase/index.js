// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAeokIM7rgW43C4HYo7CTQis3tqD56jH3Q",
  authDomain: "chat-ae3da.firebaseapp.com",
  projectId: "chat-ae3da",
  storageBucket: "chat-ae3da.firebasestorage.app",
  messagingSenderId: "661695216523",
  appId: "1:661695216523:web:a51dc43a9cee1b86dbcd8e",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// auth servisinin referansını al
export const auth = getAuth(app);

// google sağlayıcısının kurulumu
export const provider = new GoogleAuthProvider();

// firestore servisinin referansını al
export const db = getFirestore(app);
