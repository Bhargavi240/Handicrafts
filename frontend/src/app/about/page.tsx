"use client";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-24 w-full text-brand-cream">
      <Link href="/" className="inline-flex items-center gap-2 text-brand-gold hover:text-white transition-colors mb-12">
        <ArrowLeft size={16} /> Back to Home
      </Link>
      
      <h1 className="text-4xl md:text-5xl font-serif mb-8 text-brand-gold">Our Story</h1>
      
      <div className="space-y-6 text-lg font-light leading-relaxed text-white/80">
        <p>
          Welcome to Aangi Handicrafts, where elegance is woven in every thread. For over two decades, our family has been deeply rooted in the rich traditions of Indian textiles, collaborating with master artisans across the subcontinent to bring you the finest ethnic wear.
        </p>
        <p>
          Our journey began in a small boutique in Gujarat, driven by a passion to preserve the intricate art forms of hand-embroidery, block printing, and handloom weaving. Today, Aangi Handicrafts stands as a bridge between age-old craftsmanship and modern aesthetics.
        </p>
        <p>
          Every saree, kurti, and lehenga in our collection is a testament to the dedication of the weavers who spend weeks, sometimes months, perfecting a single piece. When you choose Aangi, you are not just buying a garment; you are embracing a piece of history and empowering artisan communities to thrive.
        </p>
      </div>
    </div>
  );
}
