"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Filter, ChevronDown, Heart, ShoppingBag, Eye, X, Loader2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

import { getProducts, Product } from "@/lib/api";

const categories = ["All", "Sarees", "Kurtis", "Lehengas", "Dresses", "Co-ords"];
const sortOptions = ["Latest", "Price Low to High", "Price High to Low", "Popular"];

export default function ShopPage() {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("All");
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

  const filteredProducts = products.filter(p => selectedCategory === "All" || p.categoryId === selectedCategory);

  return (
    <div className="max-w-7xl mx-auto px-6 py-12 w-full flex flex-col md:flex-row gap-8">
      
      {/* Mobile Filter Toggle */}
      <div className="md:hidden flex justify-between items-center w-full mb-4">
        <button 
          onClick={() => setIsFilterOpen(true)}
          className="flex items-center gap-2 text-brand-brown font-medium"
        >
          <Filter size={20} /> Filters
        </button>
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium">Sort by:</span>
          <select 
            value={sortBy} 
            onChange={(e) => setSortBy(e.target.value)}
            className="text-sm border-b border-brand-brown/20 pb-1 outline-none bg-transparent"
          >
            {sortOptions.map(opt => <option key={opt}>{opt}</option>)}
          </select>
        </div>
      </div>

      {/* Sidebar Filters */}
      <aside 
        className={`fixed inset-y-0 left-0 z-50 w-72 bg-brand-cream p-6 shadow-xl transition-transform duration-300 ease-in-out md:static md:w-1/4 md:bg-transparent md:p-0 md:shadow-none md:translate-x-0 ${isFilterOpen ? 'translate-x-0' : '-translate-x-full'}`}
      >
        <div className="flex justify-between items-center mb-8 md:hidden">
          <h3 className="text-xl font-serif text-brand-brown">Filters</h3>
          <button onClick={() => setIsFilterOpen(false)}><X size={24} /></button>
        </div>

        <div className="mb-10">
          <h4 className="text-lg font-medium text-brand-brown mb-4 uppercase tracking-wider text-sm border-b border-brand-brown/10 pb-2">Categories</h4>
          <ul className="space-y-3">
            {categories.map(cat => (
              <li key={cat}>
                <button 
                  onClick={() => setSelectedCategory(cat)}
                  className={`text-sm ${selectedCategory === cat ? 'text-brand-gold font-medium' : 'text-brand-brown/70 hover:text-brand-brown'}`}
                >
                  {cat}
                </button>
              </li>
            ))}
          </ul>
        </div>

        <div className="mb-10">
          <h4 className="text-lg font-medium text-brand-brown mb-4 uppercase tracking-wider text-sm border-b border-brand-brown/10 pb-2">Price Range</h4>
          <input type="range" className="w-full accent-brand-gold" min="0" max="20000" />
          <div className="flex justify-between text-xs text-brand-brown/60 mt-2">
            <span>₹0</span>
            <span>₹20,000+</span>
          </div>
        </div>
      </aside>
      
      {/* Mobile Filter Overlay */}
      {isFilterOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={() => setIsFilterOpen(false)}
        />
      )}

      {/* Main Content */}
      <div className="flex-1">
        <div className="hidden md:flex justify-between items-center mb-8">
          <h1 className="text-3xl font-serif text-brand-brown">Shop</h1>
          <div className="flex items-center gap-3">
            <span className="text-sm text-brand-brown/70">Sort by:</span>
            <div className="relative">
              <select 
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="appearance-none border border-brand-brown/20 py-2 pl-4 pr-10 text-sm focus:outline-none focus:border-brand-gold bg-transparent cursor-pointer"
              >
                {sortOptions.map(opt => <option key={opt}>{opt}</option>)}
              </select>
              <ChevronDown size={16} className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-brand-brown/60" />
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
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
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
                className="group bg-white rounded-sm shadow-sm hover:shadow-xl transition-all duration-300"
              >
                <div className="relative h-80 overflow-hidden">
                  <Image 
                    src={product.images && product.images.length > 0 ? product.images[0] : "https://images.unsplash.com/photo-1610189013233-317180b5b139?q=80&w=600"}
                    alt={product.name}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  
                  <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-4">
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
                  <p className="text-xs text-brand-brown/50 uppercase tracking-widest mb-1">Product</p>
                  <Link href={`/product/${product.id}`}>
                    <h3 className="font-serif text-lg text-brand-brown hover:text-brand-gold transition-colors mb-2 line-clamp-1">
                      {product.name}
                    </h3>
                  </Link>
                  <div className="font-bold text-brand-brown">₹{product.price}</div>
                </div>
              </motion.div>
            ))
          ) : (
            <div className="col-span-full text-center py-20 text-brand-brown/60">
              No products found.
            </div>
          )}
        </motion.div>
      </div>

    </div>
  );
}
