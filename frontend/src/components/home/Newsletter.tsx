"use client";

import { motion } from "framer-motion";

export default function Newsletter() {
  return (
    <section className="py-24 bg-brand-beige text-white text-center px-6 w-full">
      <div className="max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-5xl font-serif mb-6 text-black font-extrabold">Join Our Inner Circle</h2>
          <p className="text-black text-xl mb-10 font-bold">
            Subscribe to receive updates on new collections, exclusive offers, and a glimpse into the art of handcrafting.
          </p>
          
          <form className="flex flex-col sm:flex-row max-w-xl mx-auto gap-4 sm:gap-0" onSubmit={(e) => e.preventDefault()}>
            <input 
              type="email" 
              placeholder="Your email address" 
              required
              className="flex-1 bg-transparent border-2 border-black px-6 py-4 text-black font-bold placeholder:text-gray-600 focus:outline-none focus:border-brand-gold focus:ring-2 focus:ring-brand-gold transition-colors rounded-none"
            />
            <button 
              type="submit" 
              className="bg-black hover:bg-brand-gold text-white px-8 py-4 uppercase tracking-widest font-extrabold transition-colors duration-300 border-2 border-black"
            >
              Subscribe
            </button>
          </form>
        </motion.div>
      </div>
    </section>
  );
}
