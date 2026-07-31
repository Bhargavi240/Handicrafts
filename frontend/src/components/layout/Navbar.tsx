"use client";

import Link from "next/link";
import { Search, ShoppingBag, User, Menu, LogOut, ShieldCheck } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { useCart } from "@/context/CartContext";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";

export default function Navbar() {
  const { user, isAdmin, logout } = useAuth();
  const { items } = useCart();
  const cartCount = items.reduce((sum, item) => sum + item.quantity, 0);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.header 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 100, damping: 20 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? "bg-black/80 backdrop-blur-xl border-b border-white/10 shadow-lg py-2" 
          : "bg-transparent py-4"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        
        {/* Mobile Menu */}
        <div className="md:hidden">
          <button className="text-white hover:text-brand-gold transition-colors">
            <Menu size={24} />
          </button>
        </div>

        {/* Logo */}
        <Link href="/" className="text-2xl md:text-3xl font-serif font-bold text-white tracking-wide drop-shadow-md">
          Aangi <span className="text-brand-gold">Handicrafts</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8 font-medium text-sm tracking-wider uppercase">
          <Link href="/shop" className="text-white hover:text-brand-gold transition-colors relative group">
            Shop
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-brand-gold transition-all group-hover:w-full"></span>
          </Link>
          <Link href="/category?slug=sarees" className="text-white hover:text-brand-gold transition-colors relative group">
            Sarees
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-brand-gold transition-all group-hover:w-full"></span>
          </Link>
          <Link href="/category?slug=kurtis" className="text-white hover:text-brand-gold transition-colors relative group">
            Kurtis
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-brand-gold transition-all group-hover:w-full"></span>
          </Link>
          <Link href="/category?slug=lehengas" className="text-white hover:text-brand-gold transition-colors relative group">
            Lehengas
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-brand-gold transition-all group-hover:w-full"></span>
          </Link>
        </nav>

        {/* Icons */}
        <div className="flex items-center gap-6 text-white">
          <button className="hover:text-brand-gold transition-colors">
            <Search size={22} />
          </button>
          
          <div className="relative hidden sm:block">
            {user ? (
              <div 
                className="relative"
                onMouseEnter={() => setIsDropdownOpen(true)}
                onMouseLeave={() => setIsDropdownOpen(false)}
              >
                <button className="hover:text-brand-gold transition-colors flex items-center gap-2">
                  <User size={22} />
                  <span className="text-sm font-medium">{user.name.split(' ')[0]}</span>
                </button>
                
                {isDropdownOpen && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="absolute right-0 mt-2 w-48 bg-brand-beige rounded-lg shadow-2xl py-2 border border-white/10"
                  >
                    {isAdmin && (
                      <Link href="/admin" className="block px-4 py-2 text-sm text-brand-cream hover:bg-white/5 flex items-center gap-2">
                        <ShieldCheck size={16} className="text-brand-gold" /> Admin Dashboard
                      </Link>
                    )}
                    <button 
                      onClick={logout}
                      className="w-full text-left px-4 py-2 text-sm text-red-400 hover:bg-white/5 flex items-center gap-2"
                    >
                      <LogOut size={16} /> Sign out
                    </button>
                  </motion.div>
                )}
              </div>
            ) : (
              <Link href="/login" className="hover:text-brand-gold transition-colors flex items-center gap-2">
                <User size={22} />
              </Link>
            )}
          </div>

          <Link href="/cart" className="relative hover:text-brand-gold transition-colors group">
            <ShoppingBag size={22} className="group-hover:scale-110 transition-transform" />
            {cartCount > 0 && (
              <motion.span 
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="absolute -top-2 -right-2 bg-brand-gold text-white text-[10px] w-5 h-5 flex items-center justify-center rounded-full font-bold shadow-md"
              >
                {cartCount}
              </motion.span>
            )}
          </Link>
        </div>

      </div>
    </motion.header>
  );
}
