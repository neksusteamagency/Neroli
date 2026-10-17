import { useStore } from "@/context/StoreContext";
import SectionTitle from "@/components/SectionTitle";
import ProductCard from "@/components/ProductCard";

export default function FeaturedProducts() {
  const featured = products.slice(0, 4);
  const { products } = useStore();
  return (
    <section className="section-pad bg-bg-alt">
      <div className="container-luxe">
        <SectionTitle
          eyebrow="Curated Selection"
          title="Featured Fragrances"
          align="center"
        />
<div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-x-6 gap-y-12 mt-14">          {featured.map((p, i) => (
            <ProductCard key={p.id} product={p} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
