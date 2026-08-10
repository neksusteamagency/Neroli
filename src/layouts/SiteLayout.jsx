import { Outlet } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CartDrawer from "@/components/CartDrawer";
import WishlistDrawer from "@/components/WishlistDrawer";
import SearchDrawer from "@/components/SearchDrawer";

export default function SiteLayout() {
  return (
    <div className="min-h-screen flex flex-col bg-bg-primary">
      <Navbar />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
      <CartDrawer />
      <WishlistDrawer />
      <SearchDrawer />
    </div>
  );
}
