"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { login as apiLogin } from "@/lib/api";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import { motion } from "framer-motion";

export default function LoginPage() {
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
      } else if (data.token) {
        login(data.token, data.user);
        router.push("/shop");
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
    <div className="relative min-h-[80vh] flex items-center justify-center overflow-hidden py-12 px-4 sm:px-6 lg:px-8 bg-white">
      {/* LUXURIOUS ANIMATED BACKGROUND */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5 }}
        className="absolute inset-0 z-0"
        style={{
          background: "linear-gradient(120deg, #FFFFFF, #Fdfbf7, #fdf6e3, #FFFFFF)",
          backgroundSize: "300% 300%",
          animation: "gradientBG 12s ease infinite"
        }}
      />

      <motion.div
        animate={{
          scale: 1.1,
          opacity: 0.5,
        }}
        transition={{ duration: 4, repeat: Infinity, repeatType: "mirror", ease: "easeInOut" }}
        className="absolute top-0 right-0 w-[40rem] h-[40rem] bg-brand-gold/10 rounded-full mix-blend-multiply filter blur-3xl z-0 -translate-y-1/2 translate-x-1/2"
      />
      <motion.div
        animate={{
          scale: 1.2,
          opacity: 0.4,
        }}
        transition={{ duration: 5, repeat: Infinity, repeatType: "mirror", ease: "easeInOut", delay: 1 }}
        className="absolute bottom-0 left-0 w-[30rem] h-[30rem] bg-amber-100/40 rounded-full mix-blend-multiply filter blur-3xl z-0 translate-y-1/3 -translate-x-1/3"
      />

      {/* MAIN LOGIN CARD */}
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative z-10 max-w-md w-full space-y-8 bg-white/70 backdrop-blur-xl p-10 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-white/80"
      >
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          <h2 className="mt-2 text-center text-4xl font-serif text-black tracking-tight">
            Welcome back
          </h2>
          <p className="mt-3 text-center text-sm font-medium text-gray-500 uppercase tracking-widest">
            Sign in to your account
          </p>
        </motion.div>
        
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          {error && (
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-red-50 text-red-600 p-4 rounded-xl text-sm text-center border border-red-100 font-medium"
            >
              {error}
            </motion.div>
          )}

          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            transition={{ delay: 0.4, staggerChildren: 0.1 }} 
            className="space-y-5"
          >
            <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }}>
              <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Email address</label>
              <input
                name="email"
                type="email"
                required
                className="appearance-none block w-full px-4 py-3.5 border border-gray-200 rounded-xl placeholder-gray-400 text-black focus:outline-none focus:ring-2 focus:ring-brand-gold focus:border-transparent transition-all sm:text-sm bg-white shadow-sm"
                placeholder="jane@example.com"
                value={formData.email}
                onChange={handleChange}
              />
            </motion.div>

            <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }}>
              <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Password</label>
              <div className="relative">
                <input
                  name="password"
                  type={showPassword ? "text" : "password"}
                  required
                  className="appearance-none block w-full px-4 py-3.5 border border-gray-200 rounded-xl placeholder-gray-400 text-black focus:outline-none focus:ring-2 focus:ring-brand-gold focus:border-transparent transition-all sm:text-sm bg-white shadow-sm"
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={handleChange}
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-brand-gold transition-colors"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </motion.div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 10 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ delay: 0.6 }}
          >
            <button
              type="submit"
              disabled={isLoading}
              className="group relative w-full flex justify-center py-4 px-4 border border-transparent text-sm font-bold rounded-xl text-white bg-black hover:bg-brand-gold focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-gold transition-colors duration-300 disabled:opacity-70 disabled:cursor-not-allowed uppercase tracking-widest shadow-md"
            >
              {isLoading ? (
                <Loader2 className="animate-spin w-5 h-5" />
              ) : (
                "Sign In"
              )}
            </button>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            transition={{ delay: 0.7 }} 
            className="text-center mt-6"
          >
            <p className="text-sm font-medium text-gray-500">
              Don't have an account?{" "}
              <Link href="/register" className="text-brand-gold hover:text-black transition-colors font-bold ml-1 border-b border-brand-gold/30 hover:border-black">
                Create one
              </Link>
            </p>
          </motion.div>
        </form>
      </motion.div>
    </div>
  );
}
