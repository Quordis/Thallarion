import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_API_KEY,
  authDomain: "thallarion-359ef.firebaseapp.com",
  projectId: "thallarion-359ef",
  storageBucket: "thallarion-359ef.appspot.com",
  messagingSenderId: "933642920516",
  appId: "1:933642920516:web:4440297e744efd6b741211",
  measurementId: "G-YR1SX87G5T"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth();
export const db = getFirestore();
export const storage = getStorage();