"use client";

import { useState, useEffect } from "react";
import { Plus, Search, Edit2, Trash2, Loader2, Package, TrendingUp, Users } from "lucide-react";
import Image from "next/image";
import { getProducts, Product, deleteProduct } from "@/lib/api";
import { useAuth } from "@/context/AuthContext";
import { motion, AnimatePresence } from "framer-motion";

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } }
};

export default function AdminProductsPage() {
  const { token } = useAuth();
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isDeleting, setIsDeleting] = useState<string | null>(null);

  useEffect(() => {
    async function fetchProducts() {
      setIsLoading(true);
      const data = await getProducts();
      setProducts(data);
      setIsLoading(false);
    }
    fetchProducts();
  }, []);

  const handleDelete = async (id: string) => {
    if (!token) return;
    if (confirm("Are you sure you want to delete this product?")) {
      setIsDeleting(id);
      const success = await deleteProduct(id, token);
      if (success) {
        setProducts(products.filter(p => p.id !== id));
      } else {
        alert("Failed to delete product.");
      }
      setIsDeleting(null);
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[80vh] bg-gray-50">
        <motion.div 
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
        >
          <Loader2 className="text-brand-gold w-8 h-8" />
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 p-6 lg:p-10 font-sans relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand-gold/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-100/40 rounded-full blur-[120px] pointer-events-none" />

      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="max-w-7xl mx-auto relative z-10"
      >
        {/* Header Stats */}
        <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          {[
            { label: "Total Products", value: products.length.toString(), icon: Package, color: "text-blue-800 bg-blue-100 border-blue-300" },
            { label: "Active Orders", value: "0", icon: TrendingUp, color: "text-green-800 bg-green-100 border-green-300" },
            { label: "Total Customers", value: "0", icon: Users, color: "text-purple-800 bg-purple-100 border-purple-300" },
          ].map((stat, i) => (
            <div key={i} className="bg-white border-2 border-gray-300 rounded-xl p-6 shadow-md flex items-center justify-between hover:shadow-lg transition-shadow">
              <div>
                <p className="text-sm text-gray-800 font-extrabold uppercase tracking-widest mb-1">{stat.label}</p>
                <h3 className="text-4xl font-bold tracking-wider text-black">{stat.value}</h3>
              </div>
              <div className={`p-4 rounded-lg border-2 ${stat.color}`}>
                <stat.icon size={28} strokeWidth={2.5} />
              </div>
            </div>
          ))}
        </motion.div>

        {/* Top Bar */}
        <motion.div variants={itemVariants} className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
          <div className="flex-1 w-full relative">
            <input 
              type="text" 
              placeholder="Search inventory..." 
              className="w-full md:max-w-md pl-12 pr-4 py-4 bg-white border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-4 focus:ring-brand-gold focus:border-brand-gold text-base placeholder-gray-500 font-medium transition-all shadow-sm text-black"
            />
            <Search size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-600 font-bold" />
          </div>
          <motion.button 
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="flex items-center gap-2 bg-black text-white px-8 py-4 rounded-lg text-sm font-extrabold uppercase tracking-widest transition-colors hover:bg-brand-gold w-full md:w-auto justify-center shadow-lg border-2 border-black hover:border-brand-gold"
          >
            <Plus size={20} strokeWidth={2.5} /> New Product
          </motion.button>
        </motion.div>

        {/* Data Table */}
        <motion.div variants={itemVariants} className="bg-white border-2 border-gray-300 rounded-xl overflow-hidden shadow-lg">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-base">
              <thead className="bg-gray-100 text-black uppercase tracking-widest text-sm border-b-2 border-gray-300">
                <tr>
                  <th className="px-6 py-5 font-extrabold">Product</th>
                  <th className="px-6 py-5 font-extrabold">Category</th>
                  <th className="px-6 py-5 font-extrabold">Price</th>
                  <th className="px-6 py-5 font-extrabold">Stock</th>
                  <th className="px-6 py-5 font-extrabold">Status</th>
                  <th className="px-6 py-5 font-extrabold text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y-2 divide-gray-200">
                <AnimatePresence>
                  {products.map((product, index) => (
                    <motion.tr 
                      key={product.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                      transition={{ delay: index * 0.05 }}
                      className="hover:bg-gray-100 transition-colors group"
                    >
                      <td className="px-6 py-5">
                        <div className="flex items-center gap-5">
                          <div className="relative w-16 h-16 bg-gray-200 rounded-md overflow-hidden flex-shrink-0 border-2 border-gray-300 group-hover:border-brand-gold transition-colors shadow-sm">
                            <Image 
                              src={product.images && product.images.length > 0 ? product.images[0] : "https://images.unsplash.com/photo-1583391733958-d25e07fac04f?q=80&w=100"} 
                              alt={product.name} 
                              fill 
                              className="object-cover opacity-100" 
                            />
                          </div>
                          <div>
                            <p className="font-extrabold text-black text-lg line-clamp-1 group-hover:text-brand-gold transition-colors">{product.name}</p>
                            <p className="text-sm text-gray-700 mt-1 uppercase tracking-widest font-bold">SKU: {product.sku}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-5 text-gray-800 font-bold text-base">{product.categoryId || 'Uncategorized'}</td>
                      <td className="px-6 py-5 font-extrabold text-black text-lg">₹{product.price.toFixed(2)}</td>
                      <td className="px-6 py-5">
                        <span className="text-black font-extrabold text-lg">{product.stock}</span>
                      </td>
                      <td className="px-6 py-5">
                        <span className={`inline-flex items-center px-4 py-2 rounded-md text-sm uppercase tracking-widest border-2 font-extrabold shadow-sm ${product.stock > 0 ? 'bg-green-100 text-green-800 border-green-400' : 'bg-red-100 text-red-800 border-red-400'}`}>
                          {product.stock > 0 ? 'Active' : 'Empty'}
                        </span>
                      </td>
                      <td className="px-6 py-5 text-right">
                        <div className="flex justify-end gap-3 opacity-100">
                          <button className="text-gray-700 hover:text-white p-3 transition-colors rounded hover:bg-black border-2 border-transparent hover:border-black shadow-sm bg-gray-200 font-bold">
                            <Edit2 size={18} strokeWidth={2.5} />
                          </button>
                          <button 
                            onClick={() => handleDelete(product.id)}
                            disabled={isDeleting === product.id}
                            className="text-white hover:text-white p-3 transition-colors rounded bg-red-600 hover:bg-red-700 border-2 border-red-700 disabled:opacity-50 shadow-sm font-bold"
                          >
                            {isDeleting === product.id ? <Loader2 size={18} className="animate-spin" /> : <Trash2 size={18} strokeWidth={2.5} />}
                          </button>
                        </div>
                      </td>
                    </motion.tr>
                  ))}
                </AnimatePresence>
                {products.length === 0 && (
                  <tr>
                    <td colSpan={6} className="px-6 py-16 text-center text-gray-700 uppercase tracking-widest text-base font-extrabold bg-gray-50">
                      No inventory found. Click 'New Product' to add items.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          
          <div className="px-6 py-5 border-t-2 border-gray-300 flex justify-between items-center text-sm text-black tracking-widest uppercase font-extrabold bg-gray-100">
            <span>Showing {products.length} records</span>
            <div className="flex gap-3">
              <button className="px-4 py-2 border-2 border-gray-400 rounded bg-white hover:bg-gray-200 transition-colors disabled:opacity-50 text-black shadow-sm">Prev</button>
              <button className="px-4 py-2 border-2 border-black rounded bg-black text-white transition-colors shadow-sm">1</button>
              <button className="px-4 py-2 border-2 border-gray-400 rounded bg-white hover:bg-gray-200 transition-colors disabled:opacity-50 text-black shadow-sm">Next</button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
