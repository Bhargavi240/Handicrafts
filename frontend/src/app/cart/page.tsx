"use client";

import Link from "next/link";
import Image from "next/image";
import { Trash2, ArrowRight } from "lucide-react";
import { useCart } from "@/context/CartContext";

export default function CartPage() {
  const { items, removeFromCart, updateQuantity, subtotal } = useCart();
  const gst = subtotal * 0.18; // 18% GST
  const total = subtotal + gst;

  return (
    <div className="max-w-7xl mx-auto px-6 py-24 w-full">
      <h1 className="text-3xl md:text-4xl font-serif text-brand-gold mb-8 text-center md:text-left">Your Cart</h1>
      
      {items.length > 0 ? (
        <div className="flex flex-col lg:flex-row gap-12">
          {/* Cart Items */}
          <div className="flex-1">
            <div className="hidden md:grid grid-cols-12 gap-4 pb-4 border-b border-white/10 text-sm font-medium uppercase tracking-wider text-white/60">
              <div className="col-span-6">Product</div>
              <div className="col-span-2 text-center">Price</div>
              <div className="col-span-2 text-center">Quantity</div>
              <div className="col-span-2 text-right">Total</div>
            </div>

            <div className="divide-y divide-white/10">
              {items.map((item) => (
                <div key={item.product.id} className="grid grid-cols-1 md:grid-cols-12 gap-4 py-6 items-center">
                  <div className="col-span-1 md:col-span-6 flex items-center gap-4">
                    <div className="relative w-20 h-24 bg-white/5 flex-shrink-0">
                      <Image 
                        src={item.product.images && item.product.images.length > 0 ? item.product.images[0] : "https://images.unsplash.com/photo-1610189013233-317180b5b139?q=80&w=200"} 
                        alt={item.product.name} 
                        fill 
                        className="object-cover" 
                      />
                    </div>
                    <div>
                      <h3 className="font-serif text-lg text-brand-cream">{item.product.name}</h3>
                      <button 
                        onClick={() => removeFromCart(item.product.id)}
                        className="text-red-400 text-sm flex items-center gap-1 mt-2 hover:text-red-300 transition-colors"
                      >
                        <Trash2 size={14} /> Remove
                      </button>
                    </div>
                  </div>
                  <div className="col-span-1 md:col-span-2 md:text-center text-white">
                    <span className="md:hidden text-sm text-white/60">Price: </span>
                    ₹{item.product.price}
                  </div>
                  <div className="col-span-1 md:col-span-2 flex md:justify-center">
                    <span className="md:hidden text-sm text-white/60 mr-2">Quantity: </span>
                    <div className="flex items-center border border-white/20">
                      <button 
                        onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                        className="w-8 h-8 flex items-center justify-center text-white hover:bg-white/10 transition-colors"
                      >-</button>
                      <input type="text" value={item.quantity} readOnly className="w-10 text-center bg-transparent text-sm text-white focus:outline-none" />
                      <button 
                        onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                        className="w-8 h-8 flex items-center justify-center text-white hover:bg-white/10 transition-colors"
                      >+</button>
                    </div>
                  </div>
                  <div className="col-span-1 md:col-span-2 md:text-right font-bold text-brand-gold">
                    <span className="md:hidden text-sm text-white/60 font-normal">Total: </span>
                    ₹{item.product.price * item.quantity}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:w-96">
            <div className="bg-brand-beige border border-white/10 p-8 rounded-sm">
              <h2 className="text-xl font-serif text-brand-gold mb-6">Order Summary</h2>
              
              <div className="space-y-4 text-sm text-white/80 mb-6">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>₹{subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>GST (18%)</span>
                  <span>₹{gst.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span className="text-brand-gold">Free</span>
                </div>
              </div>

              <div className="border-t border-white/10 pt-4 flex justify-between font-bold text-lg text-white mb-8">
                <span>Total</span>
                <span>₹{total.toFixed(2)}</span>
              </div>

              <Link href="/checkout" className="flex items-center justify-center gap-2 w-full bg-brand-gold hover:bg-white text-brand-brown font-semibold h-14 uppercase tracking-widest transition-colors duration-300">
                Checkout <ArrowRight size={18} />
              </Link>
            </div>
          </div>
        </div>
      ) : (
        <div className="text-center py-20">
          <p className="text-brand-cream/70 mb-6">Your cart is currently empty.</p>
          <Link href="/shop" className="inline-block border border-brand-gold text-brand-gold hover:bg-brand-gold hover:text-brand-brown px-8 py-3 uppercase tracking-widest font-medium transition-colors">
            Continue Shopping
          </Link>
        </div>
      )}
    </div>
  );
}
