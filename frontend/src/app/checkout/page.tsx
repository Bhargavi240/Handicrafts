"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, CheckCircle2 } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useRouter } from "next/navigation";

export default function CheckoutPage() {
  const { items, subtotal, clearCart } = useCart();
  const router = useRouter();
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);

  const gst = subtotal * 0.18;
  const total = subtotal + gst;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setOrderPlaced(true);
      clearCart();
    }, 1500);
  };

  if (orderPlaced) {
    return (
      <div className="max-w-3xl mx-auto px-6 py-32 text-center text-brand-cream">
        <CheckCircle2 size={64} className="text-green-500 mx-auto mb-6" />
        <h1 className="text-4xl font-serif text-brand-gold mb-4">Order Placed Successfully!</h1>
        <p className="text-lg text-white/80 mb-8 font-light">
          Thank you for shopping with Aangi Handicrafts. Your order confirmation and tracking details will be emailed to you shortly.
        </p>
        <Link href="/shop" className="inline-block bg-brand-gold hover:bg-white text-brand-brown font-semibold px-8 py-3 uppercase tracking-widest transition-colors duration-300">
          Continue Shopping
        </Link>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="max-w-3xl mx-auto px-6 py-32 text-center text-brand-cream">
        <h1 className="text-3xl font-serif mb-4">Your cart is empty</h1>
        <p className="text-white/60 mb-8">Add some beautiful items to your cart before checking out.</p>
        <Link href="/shop" className="inline-block border border-brand-gold text-brand-gold hover:bg-brand-gold hover:text-brand-brown px-8 py-3 uppercase tracking-widest font-medium transition-colors">
          Browse Shop
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-6 py-24 w-full">
      <Link href="/cart" className="inline-flex items-center gap-2 text-brand-gold hover:text-white transition-colors mb-8">
        <ArrowLeft size={16} /> Back to Cart
      </Link>
      
      <h1 className="text-3xl md:text-4xl font-serif text-brand-gold mb-12">Checkout</h1>
      
      <div className="flex flex-col lg:flex-row gap-12">
        
        {/* Shipping Form */}
        <div className="flex-1">
          <form id="checkout-form" onSubmit={handleSubmit} className="space-y-8">
            
            <div className="bg-brand-beige border border-white/10 p-8 rounded-sm">
              <h2 className="text-2xl font-serif text-white mb-6">Shipping Details</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium mb-2 text-brand-gold">First Name</label>
                  <input required type="text" className="w-full bg-black/40 border border-white/10 px-4 py-3 text-white focus:outline-none focus:border-brand-gold transition-colors" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2 text-brand-gold">Last Name</label>
                  <input required type="text" className="w-full bg-black/40 border border-white/10 px-4 py-3 text-white focus:outline-none focus:border-brand-gold transition-colors" />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium mb-2 text-brand-gold">Email Address</label>
                  <input required type="email" className="w-full bg-black/40 border border-white/10 px-4 py-3 text-white focus:outline-none focus:border-brand-gold transition-colors" />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium mb-2 text-brand-gold">Address</label>
                  <input required type="text" className="w-full bg-black/40 border border-white/10 px-4 py-3 text-white focus:outline-none focus:border-brand-gold transition-colors" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2 text-brand-gold">City</label>
                  <input required type="text" className="w-full bg-black/40 border border-white/10 px-4 py-3 text-white focus:outline-none focus:border-brand-gold transition-colors" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2 text-brand-gold">Postal Code</label>
                  <input required type="text" className="w-full bg-black/40 border border-white/10 px-4 py-3 text-white focus:outline-none focus:border-brand-gold transition-colors" />
                </div>
              </div>
            </div>

            <div className="bg-brand-beige border border-white/10 p-8 rounded-sm">
              <h2 className="text-2xl font-serif text-white mb-6">Payment Method</h2>
              <div className="p-4 border border-brand-gold bg-brand-gold/10 rounded-sm">
                <label className="flex items-center gap-3 cursor-pointer">
                  <input type="radio" name="payment" defaultChecked className="w-4 h-4 text-brand-gold bg-transparent border-brand-gold focus:ring-brand-gold" />
                  <span className="text-white font-medium">Cash on Delivery (Simulated Test)</span>
                </label>
                <p className="mt-2 text-sm text-white/60 ml-7">
                  You will pay when the order arrives. (Stripe/Razorpay integration can be added later).
                </p>
              </div>
            </div>
            
          </form>
        </div>

        {/* Order Summary */}
        <div className="lg:w-96">
          <div className="bg-brand-beige border border-white/10 p-8 rounded-sm sticky top-28">
            <h2 className="text-xl font-serif text-brand-gold mb-6">Order Summary</h2>
            
            <div className="divide-y divide-white/10 mb-6">
              {items.map((item) => (
                <div key={item.product.id} className="py-3 flex justify-between text-sm text-white/80">
                  <span className="truncate pr-4">{item.quantity}x {item.product.name}</span>
                  <span className="flex-shrink-0">₹{item.product.price * item.quantity}</span>
                </div>
              ))}
            </div>

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

            <button 
              type="submit" 
              form="checkout-form"
              disabled={isSubmitting}
              className="flex items-center justify-center gap-2 w-full bg-brand-gold hover:bg-white text-brand-brown font-semibold h-14 uppercase tracking-widest transition-colors duration-300 disabled:opacity-50"
            >
              {isSubmitting ? "Processing..." : "Place Order"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
