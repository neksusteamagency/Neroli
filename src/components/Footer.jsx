import { Link } from "react-router-dom";
import { Instagram, Facebook, MessageCircle } from "lucide-react";

const columns = [
  {
    title: "Shop",
  links: [
  { name: "All Products", path: "/" },
  { name: "Perfumes", path: "/" },
  { name: "Home Scents", path: "/" },
  { name: "Room Sprays", path: "/" },
  { name: "Gift Sets", path: "/" },
  { name: "Best Sellers", path: "/" },
],
  },
  {
    title: "Discover",
     links: [
  { name: "About Us", path: "/" },
  { name: "Our Philosophy", path: "/" },
  { name: "Scent Guide", path: "/" },
  { name: "Journal", path: "/" },
  { name: "FAQs", path: "/" },
],
  },
  {
    title: "Customer Care",
     links: [
  { name: "Contact Us", path: "/" },
  { name: "Shipping & Delivery", path: "/" },
  { name: "Returns & Exchanges", path: "/" },
  { name: "Track Your Order", path: "/" },
  { name: "Terms & Conditions", path: "/" },
],
  },
];

export default function Footer() {
  return (
    <footer className="bg-bg-secondary border-t border-border">
      <div className="container-luxe py-16 md:py-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-x-8 gap-y-12">
          <div className="sm:col-span-2 lg:col-span-2">
            <span className="font-display text-2xl tracking-[0.18em]">NEROLI</span>
            <p className="text-[10px] tracking-[0.18em] uppercase text-text-secondary mt-1 mb-4">
              A Mediterranean Fragrance House
            </p>
            <p className="text-sm text-text-secondary leading-relaxed max-w-xs">
              Inspired by the Mediterranean way of living, we curate authentic
              fragrances and home scents from around the world.
            </p>
            <div className="flex items-center gap-4 mt-6">

            <a href="https://www.instagram.com/malakdaoud" target="_blank" rel="noopener noreferrer">
              <Instagram size={17} strokeWidth={1.4} className="cursor-pointer hover:text-olive transition-colors" />
            </a>

            <a href="https://www.facebook.com/malakdaoud" target="_blank" rel="noopener noreferrer">
              <Facebook size={17} strokeWidth={1.4} className="cursor-pointer hover:text-olive transition-colors" />
            </a>

             <a href="https://wa.me/96171051925" target="_blank" rel="noopener noreferrer">
              <MessageCircle size={17} strokeWidth={1.4} className="cursor-pointer hover:text-olive transition-colors" />
            </a>

            </div>
          </div>

          {columns.map((col) => (
            <div key={col.title}>
              <h4 className="text-[12px] tracking-[0.14em] uppercase mb-5 text-text-primary">
                {col.title}
              </h4>
              <ul className="space-y-3">
                {col.links.map((link) => (
  <li key={link.path}>
    <Link
      to={link.path}
      className="text-sm text-text-secondary hover:text-olive transition-colors"
    >
      {link.name}
    </Link>
  </li>
))}
              </ul>
            </div>
          ))}

          <div>
            <h4 className="text-[12px] tracking-[0.14em] uppercase mb-5 text-text-primary">
              We're Here to Help
            </h4>
            <ul className="space-y-3 text-sm text-text-secondary">
              <li>+961 81 123 456</li>
              <li>hello@neroli.house</li>
              <li>Beirut, Lebanon</li>
              <li className="pt-2 border-t border-border/60 mt-2">
                Mon – Fri: 9AM – 6PM
                <br />
                Sat: 10AM – 4PM
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border mt-14 pt-7 flex flex-col sm:flex-row justify-between items-center gap-3">
          <p className="text-xs text-text-secondary">
            © 2025 Neroli. All rights reserved.
          </p>
          <p className="text-xs text-text-secondary">
            Crafted with care in the Mediterranean spirit.
          </p>
        </div>
      </div>
    </footer>
  );
}
