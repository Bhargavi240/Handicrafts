"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { login as apiLogin } from "@/lib/api";
import { Eye, EyeOff, Loader2, ShieldCheck, ArrowLeft } from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";

export default function AdminLoginPage() {
  const router = useRouter();
  const { login } = useAuth();
  
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });
  
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const data = await apiLogin({
        email: formData.email,
        password: formData.password
      });
      if (data.error) {
        setError(data.error);
      } else if (data.user?.role !== 'ADMIN') {
        setError("Unauthorized access. Admin credentials required.");
      } else if (data.token) {
        login(data.token, data.user);
        router.push("/admin/products");
      } else {
        setError("Invalid response from server.");
      }
    } catch (err) {
      setError("An unexpected error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-gray-50 text-gray-900 px-4 sm:px-6 lg:px-8">
      {/* SLEEK LIGHT ANIMATED BACKGROUND */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2 }}
        className="absolute inset-0 z-0"
        style={{
          background: "radial-gradient(circle at center, #ffffff 0%, #f3f4f6 100%)",
        }}
      />
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.1, 0.2, 0.1],
        }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[40rem] h-[40rem] bg-brand-gold/20 rounded-full filter blur-[100px] z-0"
      />

      <Link href="/" className="absolute top-8 left-8 flex items-center gap-2 text-gray-400 hover:text-gray-900 transition-colors z-20 text-sm tracking-widest uppercase font-medium">
        <ArrowLeft size={16} /> Back to Site
      </Link>

      {/* MAIN ADMIN LOGIN CARD */}
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative z-10 max-w-md w-full space-y-8 bg-white/70 backdrop-blur-2xl p-10 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.06)] border border-white"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="flex flex-col items-center"
        >
          <div className="w-16 h-16 bg-brand-gold/10 rounded-full flex items-center justify-center mb-6 shadow-sm border border-brand-gold/20">
            <ShieldCheck size={32} className="text-brand-gold" />
          </div>
          <h2 className="text-center text-3xl font-serif font-semibold text-gray-900 tracking-wide uppercase">
            Admin Portal
          </h2>
          <p className="mt-3 text-center text-xs font-mono text-gray-500 uppercase tracking-widest">
            Secure Access Only
          </p>
        </motion.div>
        
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          {error && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              className="bg-red-50 text-red-600 p-4 rounded-lg text-sm text-center border border-red-100 font-mono"
            >
              {error}
            </motion.div>
          )}

          <div className="space-y-5">
            <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }}>
              <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2">Admin Email</label>
              <input
                name="email"
                type="email"
                required
                className="appearance-none block w-full px-4 py-3 border border-gray-200 rounded-lg placeholder-gray-400 text-gray-900 focus:outline-none focus:ring-2 focus:ring-brand-gold focus:border-transparent transition-all bg-white shadow-sm font-mono text-sm"
                placeholder="admin@aangihandicrafts.com"
                value={formData.email}
                onChange={handleChange}
              />
            </motion.div>

            <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.4 }}>
              <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2">Admin Password</label>
              <div className="relative">
                <input
                  name="password"
                  type={showPassword ? "text" : "password"}
                  required
                  className="appearance-none block w-full px-4 py-3 border border-gray-200 rounded-lg placeholder-gray-400 text-gray-900 focus:outline-none focus:ring-2 focus:ring-brand-gold focus:border-transparent transition-all bg-white shadow-sm font-mono text-sm"
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={handleChange}
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-brand-gold transition-colors"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </motion.div>
          </div>

          <motion.div 
            initial={{ opacity: 0, y: 10 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ delay: 0.5 }}
            className="pt-4"
          >
            <button
              type="submit"
              disabled={isLoading}
              className="group relative w-full flex justify-center py-4 px-4 border border-transparent text-xs font-bold rounded-lg text-white bg-gray-900 hover:bg-brand-gold focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900 transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed uppercase tracking-[0.2em] shadow-md"
            >
              {isLoading ? (
                <Loader2 className="animate-spin w-4 h-4" />
              ) : (
                "Authenticate"
              )}
            </button>
          </motion.div>
        </form>
      </motion.div>
    </div>
  );
}
