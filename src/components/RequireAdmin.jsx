import { Navigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";

export default function RequireAdmin({ children }) {
  const { user, isAdmin, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-text-secondary text-sm">Loading…</p>
      </div>
    );
  }

  if (!user || !isAdmin) {
    return <Navigate to="/" replace />;
  }

  return children;
}
