import { products } from "@/data/products";
import SectionTitle from "@/components/SectionTitle";
import ProductCard from "@/components/ProductCard";

export default function FeaturedProducts() {
  const featured = products.slice(0, 4);
  return (
    <section className="section-pad bg-bg-alt">
      <div className="container-luxe">
        <SectionTitle
          eyebrow="Curated Selection"
          title="Featured Fragrances"
          align="center"
        />
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-12 mt-14">
          {featured.map((p, i) => (
            <ProductCard key={p.id} product={p} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
