"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import { useRef } from "react";

export default function HeroBanner() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section ref={ref} className="relative w-full h-[90vh] flex items-center justify-center overflow-hidden bg-brand-brown">
      {/* Background Image Placeholder */}
      <motion.div 
        initial={{ scale: 1.1, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
        className="absolute inset-0 z-0 bg-cover bg-center h-[120%]"
        style={{ 
          backgroundImage: "url('https://images.unsplash.com/photo-1583391733958-d25e07fac04f?q=80&w=2000&auto=format&fit=crop')",
          y: backgroundY
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-brand-brown/90" />
      </motion.div>

      <motion.div 
        style={{ y: textY }}
        className="relative z-10 text-center px-4 max-w-4xl mx-auto flex flex-col items-center"
      >
        <motion.div
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: { staggerChildren: 0.1, delayChildren: 0.2 }
            }
          }}
        >
          {["Elegance", "Woven", "in", "Every", "Thread"].map((word, index) => (
            <motion.span
              key={index}
              variants={{
                hidden: { opacity: 0, y: 40 },
                visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100, damping: 10 } }
              }}
              className="inline-block text-5xl md:text-7xl font-serif font-bold text-white mb-6 drop-shadow-2xl tracking-wide mr-4"
            >
              {word}
            </motion.span>
          ))}
        </motion.div>
        
        <motion.p 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8, ease: "easeOut" }}
          className="text-lg md:text-2xl text-white/80 mb-10 max-w-2xl font-light drop-shadow-md"
        >
          Discover our premium collection of handcrafted women's ethnic wear. Celebrate traditions with a modern touch.
        </motion.p>
        
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 1.0, type: "spring", stiffness: 100 }}
        >
          <Link 
            href="/shop"
            className="group relative inline-block bg-brand-gold hover:bg-brand-gold/90 text-brand-brown font-semibold text-lg px-10 py-5 rounded-none transition-all duration-300 uppercase tracking-widest overflow-hidden shadow-2xl"
          >
            <span className="relative z-10">Shop The Collection</span>
            <div className="absolute inset-0 bg-white/30 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-in-out"></div>
          </Link>
        </motion.div>
      </motion.div>
    </section>
  );
}
