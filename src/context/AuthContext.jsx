import { createContext, useContext, useEffect, useState } from "react";
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut, 
  updateProfile,
} from "firebase/auth";
import { auth, ADMIN_EMAIL, db } from "@/firebase/config";

import {
  doc,
  setDoc,
  serverTimestamp,
} from "firebase/firestore";



const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (u) => {
      setUser(u);
      setLoading(false);
    });
    return unsub;
  }, []);

  const isAdmin = user?.email === ADMIN_EMAIL;

  async function login(email, password) {
    return signInWithEmailAndPassword(auth, email, password);
  }

  async function register(name, email, password) {
     // Create auth account
  const userCredential = await createUserWithEmailAndPassword(
    auth,
    email,
    password
  );

  const user = userCredential.user;

  // Update display name
  await updateProfile(user, {
    displayName: name,
  });

  console.log(db);

  // Create Firestore document
  await setDoc(doc(db, "users", user.uid), {
    uid: user.uid,
    name,
    email,
    role:"client",
    createdAt: serverTimestamp(),
  });

  return user;
  }

  async function logout() {
    return signOut(auth);
  }

  return (
    <AuthContext.Provider
      value={{ user, isAdmin, loading, login, register, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
