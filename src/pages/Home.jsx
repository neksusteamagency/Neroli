import Hero from "@/sections/Hero";
import Features from "@/sections/Features";
import CollectionsGrid from "@/sections/CollectionsGrid";
import BrandStory from "@/sections/BrandStory";
import BestSellerCarousel from "@/sections/BestSellerCarousel";
import Newsletter from "@/sections/Newsletter";

export default function Home() {
  return (
    <>
      <Hero />
      <Features />
      <CollectionsGrid />
      <BrandStory />
      <BestSellerCarousel />
      <Newsletter />
    </>
  );
}
