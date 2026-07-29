"use client";
import Link from "next/link";
import { ArrowLeft, Truck, Clock, Globe } from "lucide-react";

export default function ShippingPage() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-24 w-full text-brand-cream">
      <Link href="/" className="inline-flex items-center gap-2 text-brand-gold hover:text-white transition-colors mb-12">
        <ArrowLeft size={16} /> Back to Home
      </Link>
      
      <h1 className="text-4xl md:text-5xl font-serif mb-8 text-brand-gold">Shipping & Returns</h1>
      
      <div className="space-y-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-brand-beige border border-white/10 p-6 rounded-sm text-center">
            <Truck size={32} className="mx-auto text-brand-gold mb-4" />
            <h3 className="font-serif text-xl text-white mb-2">Free Delivery</h3>
            <p className="text-sm font-light text-white/70">On all orders above ₹5,000</p>
          </div>
          
          <div className="bg-brand-beige border border-white/10 p-6 rounded-sm text-center">
            <Clock size={32} className="mx-auto text-brand-gold mb-4" />
            <h3 className="font-serif text-xl text-white mb-2">Fast Dispatch</h3>
            <p className="text-sm font-light text-white/70">Ready-to-ship items in 48 hrs</p>
          </div>

          <div className="bg-brand-beige border border-white/10 p-6 rounded-sm text-center">
            <Globe size={32} className="mx-auto text-brand-gold mb-4" />
            <h3 className="font-serif text-xl text-white mb-2">Global Shipping</h3>
            <p className="text-sm font-light text-white/70">Delivering to 50+ countries</p>
          </div>
        </div>

        <div className="space-y-6 text-lg font-light leading-relaxed text-white/80">
          <h2 className="text-2xl font-serif text-brand-gold mb-4">Domestic Shipping</h2>
          <p>
            Orders within India are typically delivered within 5-7 business days via our trusted courier partners. Once dispatched, you will receive a tracking link via email to monitor your package's journey.
          </p>

          <h2 className="text-2xl font-serif text-brand-gold mt-8 mb-4">Returns & Exchanges</h2>
          <p>
            Due to the handcrafted nature of our products, we only accept returns in the case of manufacturing defects or if you received an incorrect item. Please reach out to our support team within 48 hours of delivery with photographic evidence to process a return. Custom-stitched garments and sale items are strictly non-refundable.
          </p>
        </div>
      </div>
    </div>
  );
}
