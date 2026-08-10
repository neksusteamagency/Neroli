import {
  collection,
  addDoc,
  doc,
  getDoc,
  getDocs,
  updateDoc,
  query,
  where,
  orderBy,
  serverTimestamp,
  increment,
} from "firebase/firestore";
import { db } from "@/firebase/config";

export async function placeOrder({ user, items, total, delivery }) {
  // Verify stock for each item (best-effort; real product stock lives in Firestore in production)
  const orderData = {
    userId: user.uid,
    userName: delivery.name,
    userEmail: user.email,
    phone: delivery.phone,
    address: delivery.address,
    city: delivery.city,
    notes: delivery.notes || "",
    items: items.map((i) => ({
      id: i.id,
      name: i.name,
      price: i.price,
      qty: i.qty,
      image: i.image,
    })),
    total,
    status: "pending",
    paymentMethod: "Cash on Delivery",
    createdAt: serverTimestamp(),
  };
  const ref = await addDoc(collection(db, "orders"), orderData);
  return ref.id;
}

export async function getUserOrders(uid) {
  const q = query(
    collection(db, "orders"),
    where("userId", "==", uid),
    orderBy("createdAt", "desc")
  );
  const snap = await getDocs(q);
  return snap.docs.map((d) => ({ id: d.id, ...d.data() }));
}

export async function getAllOrders() {
  const q = query(collection(db, "orders"), orderBy("createdAt", "desc"));
  const snap = await getDocs(q);
  return snap.docs.map((d) => ({ id: d.id, ...d.data() }));
}

export async function updateOrderStatus(orderId, status) {
  await updateDoc(doc(db, "orders", orderId), { status });
}

export async function getOrder(orderId) {
  const snap = await getDoc(doc(db, "orders", orderId));
  return snap.exists() ? { id: snap.id, ...snap.data() } : null;
}
