import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyCExSp9EYcwI6Y-lZY3_Z0LUUSE1ZXeW_g",
  authDomain: "gamify-todo-e8896.firebaseapp.com",
  projectId: "gamify-todo-e8896",
  storageBucket: "gamify-todo-e8896.appspot.com",
  messagingSenderId: "1012843406397",
  appId: "1:1012843406397:web:17b9890a29f82afa143654",
  measurementId: "G-XQ9E341YLZ",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const db = getFirestore();
const analytics = getAnalytics(app);
