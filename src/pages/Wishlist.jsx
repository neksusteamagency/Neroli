import { Link } from "react-router-dom";
import { Heart } from "lucide-react";
import { useStore } from "@/context/StoreContext";
import { useNavigate } from "react-router-dom";
import ProductCard from "@/components/ProductCard";
import EmptyState from "@/components/EmptyState";
import Button from "@/components/Button";

export default function Wishlist() {
  const { wishlist } = useStore();
const navigate = useNavigate();


  return (
    <div className="pt-28 md:pt-32 pb-24">
      <div className="container-luxe">
        <div className="text-center mb-14">
          <p className="eyebrow mb-3">Saved For You</p>
          <h1 className="text-[36px] md:text-[48px] font-light">My Wishlist</h1>
        </div>

        {wishlist.length === 0 ? (
          <EmptyState
            icon={Heart}
            title="No favorites yet"
            description="Save fragrances you love and revisit them anytime."
            action={
              <Button as={Link} to="/shop" variant="primary">
                Explore Collection
              </Button>
            }
          />
        ) : (
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-12">
            {wishlist.map((p, i) => (
              <ProductCard key={p.id} product={p} index={i} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
