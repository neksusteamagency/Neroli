import { motion } from "framer-motion";
import { Package, Truck, Home, CircleCheck, XCircle } from "lucide-react";

const STEPS = [
  { key: "pending", label: "Order Placed", icon: Package },
  { key: "processing", label: "Processing", icon: Package },
  { key: "shipped", label: "Shipped", icon: Truck },
  { key: "delivered", label: "Delivered", icon: Home },
];

export default function OrderTimeline({ status }) {
  if (status === "cancelled") {
    return (
      <div className="flex flex-col items-center text-center py-10 bg-red-50 rounded-card border border-red-100">
        <XCircle size={32} className="text-red-600 mb-3" />
        <p className="text-red-700 font-medium">This order was cancelled</p>
      </div>
    );
  }

  const activeIndex = STEPS.findIndex((s) => s.key === status);
  const currentIndex = activeIndex === -1 ? 0 : activeIndex;
  // Bottle sits above each step at these horizontal percentages
  const positions = [0, 33.33, 66.66, 100];

  return (
    <div className="pt-14 pb-6 px-2">
      <div className="relative">
        {/* Track line */}
        <div className="absolute top-5 left-0 right-0 h-[2px] bg-border" />
        <motion.div
          className="absolute top-5 left-0 h-[2px] bg-olive"
          initial={{ width: 0 }}
          animate={{ width: `${positions[currentIndex]}%` }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        />

        {/* Jumping bottle */}
        <motion.div
          className="absolute -top-9 w-10 h-10"
          initial={false}
          animate={{ left: `calc(${positions[currentIndex]}% - 20px)` }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <motion.img
            src="/icons/perfume-bottle.png"
            alt=""
            className="w-full h-full object-contain drop-shadow-md"
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 1.1, repeat: Infinity, ease: "easeInOut" }}
          />
        </motion.div>

        {/* Steps */}
        <div className="flex justify-between relative">
          {STEPS.map((step, i) => {
            const reached = i <= currentIndex;
            const Icon = reached && i < currentIndex ? CircleCheck : step.icon;
            return (
              <div key={step.key} className="flex flex-col items-center gap-3 w-1/4">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-colors ${
                    reached
                      ? "bg-olive border-olive text-white"
                      : "bg-white border-border text-text-secondary"
                  }`}
                >
                  <Icon size={16} strokeWidth={1.6} />
                </div>
                <p
                  className={`text-[11px] tracking-[0.04em] uppercase text-center ${
                    reached ? "text-olive" : "text-text-secondary"
                  }`}
                >
                  {step.label}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}