// ─── FIREBASE CONFIG ─────────────────────────────────────────────────────────
import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged, updateProfile } from "firebase/auth";
import { getFirestore, collection, doc, addDoc, setDoc, getDoc, getDocs, updateDoc, deleteDoc, query, where, orderBy, limit, serverTimestamp, increment } from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAeDO42nlWYXnTWgiQuW7lojH_z7qeBTIA",
  authDomain: "aromaperfume-cd773.firebaseapp.com",
  projectId: "aromaperfume-cd773",
  storageBucket: "aromaperfume-cd773.firebasestorage.app",
  messagingSenderId: "60876830132",
  appId: "1:60876830132:web:d36659120091d5defceee1",
  measurementId: "G-D9QV40834S",
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
 



export {
  createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged, updateProfile,
  collection, doc, addDoc, setDoc, getDoc, getDocs, updateDoc, deleteDoc,
  query, where, orderBy, limit, serverTimestamp, increment
};


export const ADMIN_EMAIL = "admin@neroli.house";
