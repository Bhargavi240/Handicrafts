"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";

const categories = [
  {
    name: "Sarees",
    image: "https://images.unsplash.com/photo-1583391733958-d25e07fac04f?q=80&w=600&auto=format&fit=crop",
    link: "/category?slug=sarees"
  },
  {
    name: "Kurtis",
    image: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?q=80&w=600&auto=format&fit=crop",
    link: "/category?slug=kurtis"
  },
  {
    name: "Lehengas",
    image: "https://images.unsplash.com/photo-1583391733958-d25e07fac04f?q=80&w=600&auto=format&fit=crop",
    link: "/category?slug=lehengas"
  },
  {
    name: "Co-ord Sets",
    image: "https://images.unsplash.com/photo-1585487000160-6ebcfceb0d03?q=80&w=600&auto=format&fit=crop",
    link: "/category?slug=coord-sets"
  }
];

export default function FeaturedCategories() {
  return (
    <section className="py-24 px-6 max-w-7xl mx-auto w-full bg-brand-brown">
      <div className="text-center mb-16">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl md:text-5xl font-serif text-brand-cream mb-6 tracking-wide"
        >
          Shop by Category
        </motion.h2>
        <motion.div 
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="w-24 h-1 bg-brand-gold mx-auto"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {categories.map((category, index) => (
          <motion.div 
            key={category.name}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ delay: index * 0.15, duration: 0.8, ease: "easeOut" }}
            className="group relative h-[450px] overflow-hidden cursor-pointer"
          >
            <Link href={category.link}>
              <Image 
                src={category.image}
                alt={category.name}
                fill
                className="object-cover transition-transform duration-1000 group-hover:scale-110 opacity-80 group-hover:opacity-100"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-brand-brown via-brand-brown/40 to-transparent flex items-end justify-center pb-10 transition-opacity duration-500 group-hover:opacity-90">
                <h3 className="text-3xl font-serif text-brand-gold tracking-widest uppercase translate-y-4 group-hover:translate-y-0 transition-transform duration-500">{category.name}</h3>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
