"use client";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function TermsPage() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-24 w-full text-brand-cream">
      <Link href="/" className="inline-flex items-center gap-2 text-brand-gold hover:text-white transition-colors mb-12">
        <ArrowLeft size={16} /> Back to Home
      </Link>
      
      <h1 className="text-4xl md:text-5xl font-serif mb-8 text-brand-gold">Terms of Service</h1>
      
      <div className="space-y-6 text-lg font-light leading-relaxed text-white/80">
        <p>
          Welcome to Aangi Handicrafts. By accessing our website and purchasing our products, you agree to be bound by the following Terms and Conditions. Please read them carefully before using our services.
        </p>
        <h2 className="text-2xl font-serif text-brand-gold mt-8 mb-4">Product Authenticity & Variations</h2>
        <p>
          Because our garments are handcrafted by artisans, slight variations in color, texture, and embroidery are a hallmark of authenticity and are not considered defects. We strive to display product colors as accurately as possible, but we cannot guarantee that your device's display will be completely precise.
        </p>
        <h2 className="text-2xl font-serif text-brand-gold mt-8 mb-4">Orders & Cancellations</h2>
        <p>
          Once an order is placed, it can only be cancelled within 24 hours. Aangi Handicrafts reserves the right to refuse or cancel any order at any time for reasons including but not limited to product availability, errors in product description, or suspected fraudulent activity.
        </p>
      </div>
    </div>
  );
}
