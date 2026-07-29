import HeroBanner from "@/components/home/HeroBanner";
import FeaturedCategories from "@/components/home/FeaturedCategories";
import TrendingProducts from "@/components/home/TrendingProducts";
import Newsletter from "@/components/home/Newsletter";

export default function Home() {
  return (
    <main className="flex flex-col min-h-screen">
      {/* Hero Banner Section */}
      <HeroBanner />
      
      {/* Featured Categories */}
      <FeaturedCategories />
      
      {/* Trending Products */}
      <TrendingProducts />

      {/* Newsletter Subscription */}
      <Newsletter />
    </main>
  );
}
