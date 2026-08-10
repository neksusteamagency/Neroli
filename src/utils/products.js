import {
  collection,
  addDoc,
  doc,
  getDocs,
  updateDoc,
  deleteDoc,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "@/firebase/config";

export async function getAllProducts() {
  const snap = await getDocs(collection(db, "products"));
  return snap.docs.map((d) => ({ id: d.id, ...d.data() }));
}

export async function createProduct(data) {
  const ref = await addDoc(collection(db, "products"), {
    ...data,
    createdAt: serverTimestamp(),
  });
  return ref.id;
}

export async function editProduct(id, data) {
  await updateDoc(doc(db, "products", id), data);
}

export async function removeProduct(id) {
  await deleteDoc(doc(db, "products", id));
}
