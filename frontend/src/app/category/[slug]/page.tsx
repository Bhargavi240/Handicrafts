"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Filter, ChevronDown, Heart, ShoppingBag, Eye, X, Loader2, ArrowLeft } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useParams } from "next/navigation";

import { getProducts, Product } from "@/lib/api";

const sortOptions = ["Latest", "Price Low to High", "Price High to Low", "Popular"];

export default function CategoryPage() {
  const params = useParams();
  const slug = params?.slug as string || "";
  
  const categoryName = slug.charAt(0).toUpperCase() + slug.slice(1);

  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [sortBy, setSortBy] = useState("Latest");
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadProducts() {
      setIsLoading(true);
      const data = await getProducts();
      setProducts(data);
      setIsLoading(false);
    }
    loadProducts();
  }, []);

  const filteredProducts = products.filter(p => 
    p.name.toLowerCase().includes(slug.toLowerCase()) || 
    (p.tags && p.tags.some(t => t.toLowerCase() === slug.toLowerCase())) ||
    true 
  );

  return (
    <div className="max-w-7xl mx-auto px-6 py-24 w-full">
      <Link href="/shop" className="inline-flex items-center gap-2 text-brand-gold hover:text-white transition-colors mb-8">
        <ArrowLeft size={16} /> Back to Shop
      </Link>

      <div className="flex justify-between items-center mb-12">
        <h1 className="text-4xl md:text-5xl font-serif text-brand-cream">{categoryName}</h1>
        <div className="hidden md:flex items-center gap-3">
          <span className="text-sm text-brand-cream/70">Sort by:</span>
          <div className="relative">
            <select 
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="appearance-none border border-white/20 py-2 pl-4 pr-10 text-sm focus:outline-none focus:border-brand-gold bg-transparent cursor-pointer text-white"
            >
              {sortOptions.map(opt => <option key={opt}>{opt}</option>)}
            </select>
            <ChevronDown size={16} className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-brand-cream/60" />
          </div>
        </div>
      </div>

      <motion.div 
        variants={{
          hidden: { opacity: 0 },
          show: {
            opacity: 1,
            transition: { staggerChildren: 0.1 }
          }
        }}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
      >
        {isLoading ? (
          <div className="col-span-full flex justify-center py-20">
            <Loader2 className="animate-spin text-brand-gold w-10 h-10" />
          </div>
        ) : filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <motion.div 
              key={product.id}
              variants={{
                hidden: { opacity: 0, y: 20 },
                show: { opacity: 1, y: 0 }
              }}
              className="group bg-brand-beige border border-white/5 rounded-sm shadow-sm hover:shadow-xl transition-all duration-300"
            >
              <div className="relative h-80 overflow-hidden">
                <Image 
                  src={product.images && product.images.length > 0 ? product.images[0] : "https://images.unsplash.com/photo-1583391733958-d25e07fac04f?q=80&w=600"}
                  alt={product.name}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-4">
                  <button className="bg-white p-3 rounded-full text-brand-brown hover:bg-brand-gold hover:text-white transition-colors shadow-lg translate-y-4 group-hover:translate-y-0 transition-all duration-300 delay-75">
                    <Heart size={20} />
                  </button>
                  <Link href={`/product/${product.id}`} className="bg-white p-3 rounded-full text-brand-brown hover:bg-brand-gold hover:text-white transition-colors shadow-lg translate-y-4 group-hover:translate-y-0 transition-all duration-300 delay-100">
                    <Eye size={20} />
                  </Link>
                  <button className="bg-white p-3 rounded-full text-brand-brown hover:bg-brand-gold hover:text-white transition-colors shadow-lg translate-y-4 group-hover:translate-y-0 transition-all duration-300 delay-150">
                    <ShoppingBag size={20} />
                  </button>
                </div>
              </div>
              
              <div className="p-5 text-center">
                <Link href={`/product/${product.id}`}>
                  <h3 className="font-serif text-lg text-brand-cream hover:text-brand-gold transition-colors mb-2 line-clamp-1">
                    {product.name}
                  </h3>
                </Link>
                <div className="font-bold text-brand-gold text-xl">₹{product.price}</div>
              </div>
            </motion.div>
          ))
        ) : (
          <div className="col-span-full text-center py-20 text-brand-cream/60">
            No products found in this category.
          </div>
        )}
      </motion.div>
    </div>
  );
}
