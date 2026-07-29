"use client";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function PrivacyPage() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-24 w-full text-brand-cream">
      <Link href="/" className="inline-flex items-center gap-2 text-brand-gold hover:text-white transition-colors mb-12">
        <ArrowLeft size={16} /> Back to Home
      </Link>
      
      <h1 className="text-4xl md:text-5xl font-serif mb-8 text-brand-gold">Privacy Policy</h1>
      
      <div className="space-y-6 text-lg font-light leading-relaxed text-white/80">
        <p>
          At Aangi Handicrafts, we value your privacy and are committed to protecting your personal information. This Privacy Policy outlines how we collect, use, and safeguard the data you provide to us when you visit our website or make a purchase.
        </p>
        <h2 className="text-2xl font-serif text-brand-gold mt-8 mb-4">Information We Collect</h2>
        <p>
          When you make a purchase or register an account, we collect personal details such as your name, email address, phone number, and shipping address. We do not store your payment card details directly; transactions are processed securely through our payment partners.
        </p>
        <h2 className="text-2xl font-serif text-brand-gold mt-8 mb-4">How We Use Your Information</h2>
        <p>
          Your information is used solely for processing your orders, providing customer support, and, with your explicit consent, sending you updates about our latest collections and exclusive offers. We will never sell or rent your personal information to third parties.
        </p>
      </div>
    </div>
  );
}
