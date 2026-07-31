import Link from "next/link";
import { Facebook, Instagram, Twitter } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-brand-brown text-white pt-16 pb-8 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
        
        {/* Brand */}
        <div className="col-span-1 md:col-span-1">
          <Link href="/" className="text-2xl font-serif font-bold text-white tracking-wide mb-4 inline-block">
            Aangi <span className="text-brand-gold">Handicrafts</span>
          </Link>
          <p className="text-white/70 text-sm font-light leading-relaxed mb-6">
            Elegance woven in every thread. Discover premium handcrafted women's ethnic wear that celebrates tradition.
          </p>
          <div className="flex gap-4">
            <a href="#" className="text-white/70 hover:text-brand-gold transition-colors"><Instagram size={20} /></a>
            <a href="#" className="text-white/70 hover:text-brand-gold transition-colors"><Facebook size={20} /></a>
            <a href="#" className="text-white/70 hover:text-brand-gold transition-colors"><Twitter size={20} /></a>
          </div>
        </div>

        {/* Links */}
        <div>
          <h4 className="text-lg font-serif mb-6 text-brand-gold">Shop</h4>
          <ul className="space-y-3 text-sm text-white/70 font-light">
            <li><Link href="/category?slug=sarees" className="hover:text-white transition-colors">Sarees</Link></li>
            <li><Link href="/category?slug=kurtis" className="hover:text-white transition-colors">Kurtis</Link></li>
            <li><Link href="/category?slug=lehengas" className="hover:text-white transition-colors">Lehengas</Link></li>
            <li><Link href="/category?slug=dresses" className="hover:text-white transition-colors">Dresses</Link></li>
            <li><Link href="/shop" className="hover:text-white transition-colors">New Arrivals</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-lg font-serif mb-6 text-brand-gold">Company</h4>
          <ul className="space-y-3 text-sm text-white/70 font-light">
            <li><Link href="/about" className="hover:text-white transition-colors">About Us</Link></li>
            <li><Link href="/contact" className="hover:text-white transition-colors">Contact</Link></li>
            <li><Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link></li>
            <li><Link href="/terms" className="hover:text-white transition-colors">Terms & Conditions</Link></li>
            <li><Link href="/shipping" className="hover:text-white transition-colors">Shipping Policy</Link></li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h4 className="text-lg font-serif mb-6 text-brand-gold">Contact Us</h4>
          <ul className="space-y-3 text-sm text-white/70 font-light">
            <li>Email: hello@aangihandicrafts.com</li>
            <li>Phone: +91 98765 43210</li>
            <li>Hours: Mon - Fri (9:00 AM - 6:00 PM)</li>
          </ul>
        </div>
      </div>

      <div className="max-w-7xl mx-auto border-t border-white/10 pt-8 text-center text-sm text-white/50 font-light flex justify-between items-center">
        <p>&copy; {new Date().getFullYear()} Aangi Handicrafts. All rights reserved.</p>
        <Link href="/admin/login" className="hover:text-brand-gold transition-colors">Admin Portal</Link>
      </div>
    </footer>
  );
}
