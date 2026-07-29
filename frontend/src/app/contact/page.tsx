"use client";
import Link from "next/link";
import { ArrowLeft, Mail, Phone, MapPin } from "lucide-react";

export default function ContactPage() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-24 w-full text-brand-cream">
      <Link href="/" className="inline-flex items-center gap-2 text-brand-gold hover:text-white transition-colors mb-12">
        <ArrowLeft size={16} /> Back to Home
      </Link>
      
      <h1 className="text-4xl md:text-5xl font-serif mb-8 text-brand-gold">Contact Us</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        <div className="space-y-8 text-white/80">
          <p className="text-lg font-light leading-relaxed">
            We'd love to hear from you. Whether you have a question about our collections, need styling advice, or require assistance with your order, our team is here to help.
          </p>
          
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <div className="bg-brand-gold p-3 rounded-full text-brand-brown">
                <Phone size={20} />
              </div>
              <div>
                <p className="font-medium text-white">Phone</p>
                <p className="font-light">+91 98765 43210</p>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="bg-brand-gold p-3 rounded-full text-brand-brown">
                <Mail size={20} />
              </div>
              <div>
                <p className="font-medium text-white">Email</p>
                <p className="font-light">hello@aangihandicrafts.com</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="bg-brand-gold p-3 rounded-full text-brand-brown">
                <MapPin size={20} />
              </div>
              <div>
                <p className="font-medium text-white">Studio Address</p>
                <p className="font-light">123 Artisan Lane, Textile District, Gujarat</p>
              </div>
            </div>
          </div>
        </div>

        <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
          <div>
            <label className="block text-sm font-medium mb-2 text-brand-gold">Name</label>
            <input 
              type="text" 
              className="w-full bg-brand-beige border border-white/10 px-4 py-3 text-white focus:outline-none focus:border-brand-gold transition-colors"
              placeholder="Your full name"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2 text-brand-gold">Email</label>
            <input 
              type="email" 
              className="w-full bg-brand-beige border border-white/10 px-4 py-3 text-white focus:outline-none focus:border-brand-gold transition-colors"
              placeholder="Your email address"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2 text-brand-gold">Message</label>
            <textarea 
              rows={5}
              className="w-full bg-brand-beige border border-white/10 px-4 py-3 text-white focus:outline-none focus:border-brand-gold transition-colors"
              placeholder="How can we help you?"
            ></textarea>
          </div>
          <button className="w-full bg-brand-gold hover:bg-white text-brand-brown font-semibold py-4 uppercase tracking-widest transition-colors duration-300">
            Send Message
          </button>
        </form>
      </div>
    </div>
  );
}
