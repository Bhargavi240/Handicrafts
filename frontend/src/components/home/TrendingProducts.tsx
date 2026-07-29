"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Heart, ShoppingBag, Eye } from "lucide-react";

const products = [
  {
    id: "1",
    name: "Crimson Silk Saree",
    price: 4500,
    discount: 10,
    image: "https://images.unsplash.com/photo-1610189013233-317180b5b139?q=80&w=600&auto=format&fit=crop",
    rating: 4.8
  },
  {
    id: "2",
    name: "Embroidered Georgette Kurti",
    price: 1800,
    discount: 15,
    image: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?q=80&w=600&auto=format&fit=crop",
    rating: 4.5
  },
  {
    id: "3",
    name: "Royal Blue Velvet Lehenga",
    price: 12500,
    discount: 0,
    image: "https://images.unsplash.com/photo-1583391733975-520689e4c19a?q=80&w=600&auto=format&fit=crop",
    rating: 5.0
  },
  {
    id: "4",
    name: "Pastel Festive Co-ord",
    price: 3200,
    discount: 5,
    image: "https://images.unsplash.com/photo-1585487000160-6ebcfceb0d03?q=80&w=600&auto=format&fit=crop",
    rating: 4.6
  }
];

export default function TrendingProducts() {
  return (
    <section className="py-24 bg-brand-brown w-full relative">
      <div className="absolute inset-0 bg-brand-gold/5 blur-3xl rounded-full translate-y-1/2 scale-150 pointer-events-none" />
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-serif text-brand-cream mb-6 tracking-wide"
          >
            Trending Now
          </motion.h2>
          <motion.div 
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="w-24 h-1 bg-brand-gold mx-auto"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {products.map((product, index) => (
            <motion.div 
              key={product.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: index * 0.15, duration: 0.8, ease: "easeOut" }}
              className="group bg-brand-beige border border-white/5 rounded-sm shadow-lg hover:shadow-2xl hover:shadow-brand-gold/10 transition-all duration-500"
            >
              <div className="relative h-80 overflow-hidden">
                <Image 
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                
                {/* Overlay actions */}
                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-4">
                  <button className="bg-white p-3 rounded-full text-brand-brown hover:bg-brand-gold hover:text-white transition-colors" title="Add to Wishlist">
                    <Heart size={20} />
                  </button>
                  <button className="bg-white p-3 rounded-full text-brand-brown hover:bg-brand-gold hover:text-white transition-colors" title="Quick View">
                    <Eye size={20} />
                  </button>
                  <button className="bg-white p-3 rounded-full text-brand-brown hover:bg-brand-gold hover:text-white transition-colors" title="Add to Cart">
                    <ShoppingBag size={20} />
                  </button>
                </div>
                
                {product.discount > 0 && (
                  <div className="absolute top-4 left-4 bg-brand-maroon text-white text-xs font-bold px-3 py-1 uppercase tracking-wider">
                    {product.discount}% OFF
                  </div>
                )}
              </div>
              
              <div className="p-6 text-center">
                <Link href={`/product/${product.id}`}>
                  <h3 className="font-serif text-lg text-brand-cream hover:text-brand-gold transition-colors mb-2 line-clamp-1 tracking-wide">
                    {product.name}
                  </h3>
                </Link>
                <div className="flex items-center justify-center gap-3 mt-3">
                  <span className="font-bold text-brand-gold text-xl">₹{product.price - (product.price * product.discount / 100)}</span>
                  {product.discount > 0 && (
                    <span className="text-brand-cream/40 line-through text-sm">₹{product.price}</span>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
        
        <div className="mt-16 text-center">
          <Link href="/shop" className="inline-block border border-brand-gold text-brand-gold hover:bg-brand-gold hover:text-brand-brown transition-colors px-10 py-4 tracking-widest uppercase font-medium text-sm shadow-[0_0_15px_rgba(212,175,55,0.2)] hover:shadow-[0_0_25px_rgba(212,175,55,0.4)]">
            View All Products
          </Link>
        </div>
      </div>
    </section>
  );
}
