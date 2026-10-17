import { useState } from "react";
import { Link } from "react-router-dom";
import { Instagram, Facebook, MessageCircle, X } from "lucide-react";

const columns = [
  {
    title: "Shop",
    links: [
      { name: "All Products", path: "/shop" },
      { name: "Brands", path: "/shop?category=brands" },
      { name: "Car Scents", path: "/shop?category=car-scents" },
      { name: "Gift Sets", path: "/shop?category=gift-sets" },
      { name: "Gadgets & Deco", path: "/shop?category=gadgets-deco" },
      { name: "Best Sellers", path: "/shop" },
    ],
  },
  {
    title: "Discover",
    links: [
      { name: "Our Philosophy", path: "/discover" },
      { name: "Scent Guide", path: "/scent-guide" },
      { name: "Journal", path: "/journal" },
      { name: "FAQs", path: "/discover" },
    ],
  },
];

// Customer Care links are modals, not routes — handled separately below

export default function Footer() {
  const [activeModal, setActiveModal] = useState(null); // "shipping" | "returns" | "terms" | null

  const careLinks = [
    { name: "Contact Us", type: "link", path: "/discover" },
    { name: "Shipping & Delivery", type: "modal", key: "shipping" },
    { name: "Returns & Exchanges", type: "modal", key: "returns" },
    { name: "Track Your Order", type: "link", path: "/track-order" },
    { name: "Terms & Conditions", type: "modal", key: "terms" },
  ];

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
                  <li key={link.name}>
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
              Customer Care
            </h4>
            <ul className="space-y-3">
              {careLinks.map((link) =>
                link.type === "modal" ? (
                  <li key={link.name}>
                    <button
                      onClick={() => setActiveModal(link.key)}
                      className="text-sm text-text-secondary hover:text-olive transition-colors text-left"
                    >
                      {link.name}
                    </button>
                  </li>
                ) : (
                  <li key={link.name}>
                    <Link
                      to={link.path}
                      className="text-sm text-text-secondary hover:text-olive transition-colors"
                    >
                      {link.name}
                    </Link>
                  </li>
                )
              )}
            </ul>
          </div>

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

      {/* Customer Care Modals */}
      {activeModal && (
        <div className="fixed inset-0 z-[60] bg-text-primary/40 backdrop-blur-[2px] flex items-center justify-center p-4">
          <div className="bg-white rounded-card max-w-lg w-full max-h-[80vh] overflow-y-auto p-8 relative">
            <button
              onClick={() => setActiveModal(null)}
              className="absolute top-6 right-6"
              aria-label="Close"
            >
              <X size={20} />
            </button>
            {activeModal === "shipping" && (
              <>
                <h3 className="text-2xl font-light mb-4">Shipping & Delivery</h3>
                <p className="text-sm text-text-secondary leading-relaxed">
                  Orders are processed within 1–2 business days. Delivery across
                  Lebanon typically takes 2–4 business days. Free delivery on
                  orders over $150. International shipping available on request.
                </p>
              </>
            )}
            {activeModal === "returns" && (
              <>
                <h3 className="text-2xl font-light mb-4">Returns & Exchanges</h3>
                <p className="text-sm text-text-secondary leading-relaxed">
                  We accept returns within 14 days of delivery for unopened,
                  unused products in their original packaging. Contact us via
                  WhatsApp or email to initiate a return or exchange.
                </p>
              </>
            )}
            {activeModal === "terms" && (
              <>
                <h3 className="text-2xl font-light mb-4">Terms & Conditions</h3>
                <p className="text-sm text-text-secondary leading-relaxed">
                  By using this site and placing an order, you agree to our
                  pricing, availability, and delivery terms as stated at
                  checkout. All fragrances are sourced from authorized
                  distributors.
                </p>
              </>
            )}
          </div>
        </div>
      )}
    </footer>
  );
}