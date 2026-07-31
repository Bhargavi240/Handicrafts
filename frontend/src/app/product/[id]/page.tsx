"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import { Star, Heart, Share2, ShieldCheck, Truck, RotateCcw, Loader2 } from "lucide-react";
import { motion } from "framer-motion";
import { getProduct, Product } from "@/lib/api";
import { useCart } from "@/context/CartContext";

export default function ProductDetails() {
  const { id } = useParams() as { id: string };
  const { addToCart } = useCart();
  const [product, setProduct] = useState<Product | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const [mainImage, setMainImage] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [selectedColor, setSelectedColor] = useState("#800000"); // Mocked color
  const [added, setAdded] = useState(false);

  useEffect(() => {
    async function loadProduct() {
      setIsLoading(true);
      const data = await getProduct(id);
      setProduct(data);
      if (data && data.images && data.images.length > 0) {
        setMainImage(data.images[0]);
      } else {
        setMainImage("https://images.unsplash.com/photo-1583391733958-d25e07fac04f?q=80&w=800");
      }
      setIsLoading(false);
    }
    if (id) loadProduct();
  }, [id]);

  const handleAddToCart = () => {
    if (product) {
      addToCart(product, quantity);
      setAdded(true);
      setTimeout(() => setAdded(false), 2000);
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <Loader2 className="animate-spin text-brand-gold w-10 h-10" />
      </div>
    );
  }

  if (!product) {
    return <div className="text-center py-20 text-xl text-brand-brown">Product not found.</div>;
  }

  return (
    <div className="max-w-7xl mx-auto px-6 py-12 w-full">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
        
        {/* Product Gallery */}
        <div className="flex flex-col-reverse md:flex-row gap-4">
          <div className="flex md:flex-col gap-4 overflow-x-auto md:overflow-visible no-scrollbar">
            {product.images && product.images.map((img, idx) => (
              <button 
                key={idx} 
                onClick={() => setMainImage(img)}
                className={`relative w-20 h-24 md:w-24 md:h-32 flex-shrink-0 border-2 transition-colors ${mainImage === img ? 'border-brand-gold' : 'border-transparent'}`}
              >
                <Image src={img} alt="" fill className="object-cover" />
              </button>
            ))}
          </div>
          <div className="relative flex-1 h-[500px] md:h-[600px] bg-gray-100">
            <Image src={mainImage} alt={product.name} fill className="object-cover" />
          </div>
        </div>

        {/* Product Info */}
        <div className="flex flex-col">
          <h1 className="text-3xl md:text-4xl font-serif text-brand-brown mb-2">{product.name}</h1>
          
          <div className="flex items-center gap-4 mb-6">
            <div className="flex items-center text-brand-gold">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={18} fill={i < Math.floor(4.8) ? "currentColor" : "none"} />
              ))}
            </div>
            <span className="text-sm text-brand-brown/60 underline cursor-pointer">124 Reviews</span>
          </div>

          <div className="text-3xl font-bold text-brand-brown mb-8">₹{product.price}</div>
          
          <p className="text-brand-brown/80 mb-8 leading-relaxed">
            {product.description}
          </p>

          <div className="mb-8">
            <span className="block text-sm uppercase tracking-wider font-medium text-brand-brown mb-3">Color Options</span>
            <div className="flex gap-3">
              {['#800000', '#1a237e', '#1b5e20'].map(color => (
                <button 
                  key={color}
                  onClick={() => setSelectedColor(color)}
                  className={`w-8 h-8 rounded-full border-2 ${selectedColor === color ? 'border-brand-gold p-1' : 'border-transparent'}`}
                >
                  <div className="w-full h-full rounded-full" style={{ backgroundColor: color }} />
                </button>
              ))}
            </div>
          </div>

          <div className="flex items-end gap-6 mb-8">
            <div>
              <span className="block text-sm uppercase tracking-wider font-medium text-brand-brown mb-3">Quantity</span>
              <div className="flex items-center border border-brand-brown/20 w-32">
                <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="w-10 h-12 flex items-center justify-center text-brand-brown hover:bg-brand-cream transition-colors">-</button>
                <input type="number" value={quantity} readOnly className="w-12 h-12 text-center bg-transparent focus:outline-none text-brand-brown font-medium" />
                <button onClick={() => setQuantity(quantity + 1)} className="w-10 h-12 flex items-center justify-center text-brand-brown hover:bg-brand-cream transition-colors">+</button>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 mb-10">
            <button 
              onClick={handleAddToCart}
              className="flex-1 bg-brand-brown hover:bg-brand-gold text-white font-medium h-14 uppercase tracking-widest transition-colors duration-300"
            >
              {added ? "Added!" : "Add to Cart"}
            </button>
            <button className="flex-1 border border-brand-brown text-brand-brown hover:bg-brand-cream font-medium h-14 uppercase tracking-widest transition-colors duration-300">
              Buy It Now
            </button>
            <button className="w-14 h-14 border border-brand-brown/20 flex items-center justify-center text-brand-brown hover:text-brand-maroon hover:border-brand-maroon transition-colors">
              <Heart size={24} />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 py-6 border-y border-brand-brown/10">
            <div className="flex items-center gap-3">
              <ShieldCheck className="text-brand-gold" size={24} />
              <span className="text-xs uppercase tracking-wider text-brand-brown font-medium">Secure Payment</span>
            </div>
            <div className="flex items-center gap-3">
              <Truck className="text-brand-gold" size={24} />
              <span className="text-xs uppercase tracking-wider text-brand-brown font-medium">Free Shipping</span>
            </div>
            <div className="flex items-center gap-3">
              <RotateCcw className="text-brand-gold" size={24} />
              <span className="text-xs uppercase tracking-wider text-brand-brown font-medium">7 Days Return</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
