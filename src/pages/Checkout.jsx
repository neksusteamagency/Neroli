import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { CheckCircle2, Truck } from "lucide-react";
import { useStore } from "@/context/StoreContext";
import { useAuth } from "@/context/AuthContext";
import { placeOrder } from "@/utils/orders";
import Button from "@/components/Button";

export default function Checkout() {
  const { cart, cartTotal, clearCart } = useStore();
  const { user } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: user?.displayName || "",
    phone: "",
    address: "",
    city: "",
    notes: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [orderId, setOrderId] = useState(null);

  if (!user) {
    return (
      <div className="pt-40 pb-24 text-center px-6">
        <h1 className="text-2xl font-light mb-4">Please sign in to checkout</h1>
        <p className="text-text-secondary mb-8">
          You'll need a Neroli account to place an order.
        </p>
        <Button as={Link} to="/login" variant="primary">
          Sign In
        </Button>
      </div>
    );
  }

  if (cart.length === 0 && !orderId) {
    return (
      <div className="pt-40 pb-24 text-center px-6">
        <h1 className="text-2xl font-light mb-4">Your bag is empty</h1>
        <Button as={Link} to="/shop" variant="primary">
          Explore Collection
        </Button>
      </div>
    );
  }

  function handleChange(e) {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    if (!form.name || !form.phone || !form.address || !form.city) {
      setError("Please fill in all required fields.");
      return;
    }
    setLoading(true);
    try {
      const id = await placeOrder({
        user,
        items: cart,
        total: cartTotal,
        delivery: form,
      });
      setOrderId(id);
      clearCart();
    } catch (err) {
      setError("Something went wrong placing your order. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  if (orderId) {
    return (
      <div className="pt-40 pb-24 text-center px-6 max-w-md mx-auto">
        <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}>
          <CheckCircle2 size={56} strokeWidth={1} className="text-olive mx-auto mb-6" />
          <h1 className="text-3xl font-light mb-3">Order Placed</h1>
          <p className="text-text-secondary mb-2">
            Thank you for choosing Neroli. We'll contact you shortly to confirm
            delivery.
          </p>
          <p className="text-xs tracking-[0.1em] uppercase text-olive mb-10">
            Order #{orderId.slice(0, 8).toUpperCase()}
          </p>
          <div className="flex flex-col gap-3">
            <Button as={Link} to="/account" variant="primary">
              View My Orders
            </Button>
            <Button as={Link} to="/shop" variant="ghost">
              Continue Shopping
            </Button>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="pt-28 md:pt-32 pb-24">
      <div className="container-luxe">
        <div className="mb-12">
          <p className="eyebrow mb-2">Secure Checkout</p>
          <h1 className="text-[36px] md:text-[44px] font-light">Complete Your Order</h1>
        </div>

        <div className="grid lg:grid-cols-[1fr_400px] gap-10">
          <form onSubmit={handleSubmit} className="space-y-10">
            <div className="bg-white rounded-card p-8 border border-border">
              <h3 className="text-xl font-light mb-6 pb-5 border-b border-border">
                Delivery Information
              </h3>
              <div className="grid sm:grid-cols-2 gap-5 mb-5">
                <Field label="Full Name *" name="name" value={form.name} onChange={handleChange} />
                <Field label="Phone Number *" name="phone" value={form.phone} onChange={handleChange} type="tel" />
              </div>
              <Field label="Street Address *" name="address" value={form.address} onChange={handleChange} className="mb-5" />
              <div className="grid sm:grid-cols-2 gap-5 mb-5">
                <Field label="City *" name="city" value={form.city} onChange={handleChange} />
              </div>
              <div>
                <label className="text-[11px] tracking-[0.1em] uppercase text-text-secondary mb-2 block">
                  Order Notes
                </label>
                <textarea
                  name="notes"
                  value={form.notes}
                  onChange={handleChange}
                  rows={3}
                  className="w-full border border-border rounded-input px-4 py-3 text-sm outline-none focus:border-olive transition-colors resize-none"
                  placeholder="Special instructions for delivery…"
                />
              </div>
            </div>

            <div className="bg-white rounded-card p-8 border border-border">
              <h3 className="text-xl font-light mb-6 pb-5 border-b border-border">
                Payment Method
              </h3>
              <div className="flex items-center gap-4 border border-olive bg-bg-secondary/40 rounded-input p-5">
                <Truck size={22} strokeWidth={1.3} className="text-olive shrink-0" />
                <div>
                  <p className="text-sm font-medium text-olive">Cash on Delivery</p>
                  <p className="text-xs text-text-secondary mt-1">
                    Pay in cash when your order arrives. No card required.
                  </p>
                </div>
                <div className="ml-auto w-3 h-3 rounded-full bg-olive shrink-0" />
              </div>
            </div>

            {error && <p className="text-sm text-red-700">{error}</p>}
          </form>

          {/* Order summary */}
          <div className="h-fit sticky top-32">
            <div className="bg-white rounded-card p-8 border border-border">
              <h3 className="text-xl font-light mb-6 pb-5 border-b border-border">
                Order Summary
              </h3>
              <div className="space-y-4 mb-6">
                {cart.map((item) => (
                  <div key={item.id} className="flex justify-between text-sm">
                    <div>
                      <p>{item.name}</p>
                      <p className="text-text-secondary text-xs">Qty: {item.qty}</p>
                    </div>
                    <p>${(item.price * item.qty).toFixed(2)}</p>
                  </div>
                ))}
              </div>
              <div className="flex justify-between items-center pt-5 border-t border-border mb-6">
                <span className="eyebrow">Total</span>
                <span className="font-display text-2xl">${cartTotal.toFixed(2)}</span>
              </div>
              <Button
                onClick={handleSubmit}
                variant="primary"
                className="w-full"
                disabled={loading}
              >
                {loading ? "Placing Order…" : "Place Order"}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Field({ label, className = "", ...props }) {
  return (
    <div className={className}>
      <label className="text-[11px] tracking-[0.1em] uppercase text-text-secondary mb-2 block">
        {label}
      </label>
      <input
        required
        {...props}
        className="w-full border border-border rounded-input px-4 py-3 text-sm outline-none focus:border-olive transition-colors"
      />
    </div>
  );
}
