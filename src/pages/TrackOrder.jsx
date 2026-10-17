import { useState, useEffect } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { Package } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { getUserOrders, getOrder } from "@/utils/orders";
import OrderTimeline from "@/components/OrderTimeline";
import Button from "@/components/Button";
import EmptyState from "@/components/EmptyState";

export default function TrackOrder() {
  const { user } = useAuth();
  const [searchParams, setSearchParams] = useSearchParams();
  const idParam = searchParams.get("id");

  const [myOrders, setMyOrders] = useState([]);
  const [loadingMine, setLoadingMine] = useState(false);

  const [guestId, setGuestId] = useState("");
  const [guestOrder, setGuestOrder] = useState(null);
  const [guestError, setGuestError] = useState("");
  const [guestLoading, setGuestLoading] = useState(false);

  const [selectedOrder, setSelectedOrder] = useState(null);

  useEffect(() => {
    if (user) {
      setLoadingMine(true);
      getUserOrders(user.uid).then(setMyOrders).finally(() => setLoadingMine(false));
    }
  }, [user]);

  // Deep link support: /track-order?id=xxx (used from Account page)
  useEffect(() => {
    if (idParam && user) {
      getOrder(idParam).then((o) => {
        if (o && o.userId === user.uid) setSelectedOrder(o);
      });
    }
  }, [idParam, user]);

  async function handleGuestLookup(e) {
    e.preventDefault();
    setGuestError("");
    setGuestOrder(null);
    if (!guestId.trim()) {
      setGuestError("Please enter your order ID.");
      return;
    }
    setGuestLoading(true);
    try {
      const order = await getOrder(guestId.trim());
      if (!order) {
        setGuestError("We couldn't find an order with that ID.");
      } else {
        setGuestOrder(order);
      }
    } catch {
      setGuestError("Something went wrong. Please try again.");
    } finally {
      setGuestLoading(false);
    }
  }

  // A single order's detail + timeline view
  function OrderDetail({ order }) {
    return (
      <div className="bg-white rounded-card border border-border p-8">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-xl font-light">
            Order #{order.id.slice(0, 8).toUpperCase()}
          </h3>
          <span className="text-xs text-text-secondary">
            {order.createdAt?.toDate
              ? order.createdAt.toDate().toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                })
              : ""}
          </span>
        </div>
        <p className="text-sm text-text-secondary mb-4">
          {order.items?.length || 0} item{order.items?.length === 1 ? "" : "s"} · $
          {order.total?.toFixed(2)}
        </p>
        <OrderTimeline status={order.status} />
      </div>
    );
  }

  return (
    <div className="pt-28 md:pt-32 pb-24">
      <div className="container-content">
        <div className="text-center mb-12">
          <p className="eyebrow mb-2">Order Status</p>
          <h1 className="text-[36px] md:text-[44px] font-light">Track Your Order</h1>
        </div>

        {/* Deep-linked single order (from Account page) */}
        {selectedOrder ? (
          <div className="max-w-xl mx-auto">
            <button
              onClick={() => {
                setSelectedOrder(null);
                setSearchParams({});
              }}
              className="text-sm text-olive hover:underline mb-6"
            >
              ← Back
            </button>
            <OrderDetail order={selectedOrder} />
          </div>
        ) : user ? (
          // Logged-in: show all their orders
          <div className="max-w-xl mx-auto">
            {loadingMine ? (
              <p className="text-center text-text-secondary text-sm">Loading your orders…</p>
            ) : myOrders.length === 0 ? (
              <EmptyState
                icon={Package}
                title="No orders yet"
                description="Once you place an order, you can track it here."
                action={
                  <Button as={Link} to="/shop" variant="primary">
                    Start Shopping
                  </Button>
                }
              />
            ) : (
              <div className="space-y-6">
                {myOrders.map((o) => (
                  <OrderDetail key={o.id} order={o} />
                ))}
              </div>
            )}
          </div>
        ) : (
          // Guest lookup
          <div className="max-w-md mx-auto">
            <form onSubmit={handleGuestLookup} className="bg-white rounded-card border border-border p-8 mb-8">
              <div className="mb-6">
                <label className="text-[11px] tracking-[0.1em] uppercase text-text-secondary mb-2 block">
                  Order ID
                </label>
                <input
                  value={guestId}
                  onChange={(e) => setGuestId(e.target.value)}
                  placeholder="e.g. AB12CD34"
                  className="w-full border border-border rounded-input px-4 py-3 text-sm outline-none focus:border-olive"
                />
              </div>
              {guestError && <p className="text-sm text-red-700 mb-4">{guestError}</p>}
              <Button type="submit" variant="primary" className="w-full" disabled={guestLoading}>
                {guestLoading ? "Searching…" : "Track Order"}
              </Button>
            </form>

            {guestOrder && <OrderDetail order={guestOrder} />}

            <p className="text-center text-xs text-text-secondary mt-6">
              Have an account?{" "}
              <Link to="/login" className="text-olive hover:underline">
                Sign in
              </Link>{" "}
              to see all your orders at once.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}