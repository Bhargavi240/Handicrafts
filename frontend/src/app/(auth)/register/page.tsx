"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { register } from "@/lib/api";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import { motion } from "framer-motion";

const COUNTRIES = [
  { code: "+91", name: "India" },
  { code: "+1", name: "USA/Canada" },
  { code: "+44", name: "UK" },
  { code: "+61", name: "Australia" },
];

export default function RegisterPage() {
  const router = useRouter();
  const { login } = useAuth();
  
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    countryCode: "+91",
    mobileNumber: ""
  });
  
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const data = await register(formData);
      if (data.error) {
        setError(data.error);
      } else {
        login(data.token, data.user);
        router.push("/shop");
      }
    } catch (err: any) {
      setError("An unexpected error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <motion.div 
      initial={{ background: "linear-gradient(45deg, #FFE4E1, #FFF0F5)" }}
      animate={{ background: ["linear-gradient(45deg, #FFE4E1, #FFF0F5)", "linear-gradient(45deg, #FFF0F5, #FFDAB9)", "linear-gradient(45deg, #FFDAB9, #FFE4E1)"] }}
      transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
      className="min-h-[80vh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8"
    >
      <motion.div 
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.6, type: "spring", bounce: 0.4 }}
        className="max-w-md w-full space-y-8 bg-white/90 backdrop-blur-xl p-10 rounded-3xl shadow-2xl border border-white/50"
      >
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <h2 className="mt-2 text-center text-4xl font-serif font-extrabold text-brand-maroon tracking-tight">
            Create an Account
          </h2>
          <p className="mt-2 text-center text-sm font-medium text-gray-600">
            Join Aangi Handicrafts today
          </p>
        </motion.div>
        
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          {error && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              className="bg-red-50 text-red-500 p-3 rounded-md text-sm text-center border border-red-100"
            >
              {error}
            </motion.div>
          )}

          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            transition={{ delay: 0.3 }} 
            className="space-y-4"
          >
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-1">Full Name</label>
              <input
                name="name"
                type="text"
                required
                className="appearance-none block w-full px-4 py-3 border border-gray-200 rounded-xl placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-brand-maroon focus:border-transparent transition-all sm:text-sm bg-white/80"
                placeholder="Jane Doe"
                value={formData.name}
                onChange={handleChange}
              />
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-700 mb-1">Email address</label>
              <input
                name="email"
                type="email"
                required
                className="appearance-none block w-full px-4 py-3 border border-gray-200 rounded-xl placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-brand-maroon focus:border-transparent transition-all sm:text-sm bg-white/80"
                placeholder="jane@example.com"
                value={formData.email}
                onChange={handleChange}
              />
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-700 mb-1">Mobile Number</label>
              <div className="flex gap-2">
                <select
                  name="countryCode"
                  className="w-1/3 appearance-none block px-4 py-3 border border-gray-200 rounded-xl bg-white/80 focus:outline-none focus:ring-2 focus:ring-brand-maroon focus:border-transparent transition-all sm:text-sm"
                  value={formData.countryCode}
                  onChange={handleChange}
                >
                  {COUNTRIES.map(c => (
                    <option key={c.code} value={c.code}>{c.code} ({c.name})</option>
                  ))}
                </select>
                <input
                  name="mobileNumber"
                  type="tel"
                  required
                  className="w-2/3 appearance-none block px-4 py-3 border border-gray-200 rounded-xl placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-brand-maroon focus:border-transparent transition-all sm:text-sm bg-white/80"
                  placeholder="9876543210"
                  value={formData.mobileNumber}
                  onChange={handleChange}
                />
              </div>
            </div>

            <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.4 }}>
              <label className="block text-sm font-bold text-gray-700 mb-1">Password</label>
              <div className="relative">
                <input
                  name="password"
                  type={showPassword ? "text" : "password"}
                  required
                  className="appearance-none block w-full px-4 py-3 border border-gray-200 rounded-xl placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-brand-maroon focus:border-transparent transition-all sm:text-sm bg-white/80"
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={handleChange}
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-brand-maroon hover:text-brand-gold transition-colors"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </motion.div>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}>
            <button
              type="submit"
              disabled={isLoading}
              className="group relative w-full flex justify-center py-3.5 px-4 border border-transparent text-sm font-bold rounded-xl text-white bg-brand-maroon hover:bg-brand-gold focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-maroon transition-all duration-300 shadow-lg disabled:opacity-70 disabled:cursor-not-allowed hover:shadow-brand-gold/50 hover:-translate-y-1"
            >
              {isLoading ? (
                <Loader2 className="animate-spin w-5 h-5" />
              ) : (
                "Create Account"
              )}
            </button>
          </motion.div>
          
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }} className="text-center mt-6">
            <p className="text-sm font-medium text-gray-700">
              Already have an account?{" "}
              <Link href="/login" className="font-bold text-brand-maroon hover:text-brand-gold transition-colors">
                Sign in
              </Link>
            </p>
          </motion.div>
        </form>
      </motion.div>
    </motion.div>
  );
}
