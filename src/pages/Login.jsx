import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useAuth } from "@/context/AuthContext";
import Button from "@/components/Button";

export default function Login() {
  const [mode, setMode] = useState("login");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { login, register } = useAuth(); 
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      if (mode === "login") {
        await login(email, password);
      } else {
        if (!name.trim()) throw new Error("Please enter your name");
        if (password.length < 6) throw new Error("Password must be at least 6 characters");
        await register(name, email, password);
      }
      navigate("/account");
    } catch (err) {
      setError(
        err.message?.includes("auth/")
          ? "Invalid email or password."
          : err.message || "Something went wrong."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center pt-24 pb-16 px-6 bg-bg-secondary">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md bg-white rounded-card p-10"
      >
        <div className="text-center mb-8">
          <Link to="/" className="font-display text-2xl tracking-[0.18em]">
            NEROLI
          </Link>
          <h1 className="text-2xl font-light mt-6 mb-1">
            {mode === "login" ? "Welcome Back" : "Create Your Account"}
          </h1>
          <p className="text-text-secondary text-sm">
            {mode === "login"
              ? "Sign in to continue your journey"
              : "Join Neroli to start your collection"}
          </p>
        </div>

        <div className="flex mb-8 border-b border-border">
          {["login", "register"].map((m) => (
            <button
              key={m}
              onClick={() => { setMode(m); setError(""); }}
              className={`flex-1 pb-3 text-xs tracking-[0.1em] uppercase transition-colors border-b-2 -mb-px ${
                mode === m
                  ? "border-olive text-olive"
                  : "border-transparent text-text-secondary"
              }`}
            >
              {m === "login" ? "Sign In" : "Register"}
            </button>
          ))}
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          {mode === "register" && (
            <div>
              <label className="text-[11px] tracking-[0.1em] uppercase text-text-secondary mb-2 block">
                Full Name
              </label>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                type="text"
                required
                className="w-full border border-border rounded-input px-4 py-3 text-sm outline-none focus:border-olive transition-colors"
                placeholder="Your name"
              />
            </div>
          )}
          <div>
            <label className="text-[11px] tracking-[0.1em] uppercase text-text-secondary mb-2 block">
              Email Address
            </label>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              required
              className="w-full border border-border rounded-input px-4 py-3 text-sm outline-none focus:border-olive transition-colors"
              placeholder="your@email.com"
            />
          </div>
          <div>
            <label className="text-[11px] tracking-[0.1em] uppercase text-text-secondary mb-2 block">
              Password
            </label>
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              required
              className="w-full border border-border rounded-input px-4 py-3 text-sm outline-none focus:border-olive transition-colors"
              placeholder="••••••••"
            />
          </div>

          {error && <p className="text-sm text-red-700">{error}</p>}

          <Button type="submit" variant="primary" className="w-full" disabled={loading}>
            {loading ? "Please wait…" : mode === "login" ? "Sign In" : "Create Account"}
          </Button>
        </form>
      </motion.div>
    </div>
  );
}
