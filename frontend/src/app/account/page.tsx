"use client";

import { useState } from "react";
import Link from "next/link";
import { User, Package, MapPin, Heart, LogOut } from "lucide-react";

export default function AccountPage() {
  const [activeTab, setActiveTab] = useState("orders");

  return (
    <div className="max-w-7xl mx-auto px-6 py-12 w-full">
      <div className="flex flex-col md:flex-row gap-8">
        
        {/* Sidebar */}
        <aside className="w-full md:w-64 flex-shrink-0">
          <div className="bg-brand-cream p-6 rounded-sm">
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-brand-gold rounded-full mx-auto flex items-center justify-center text-white text-2xl font-serif mb-3">
                JD
              </div>
              <h3 className="font-serif text-lg text-brand-brown">Jane Doe</h3>
              <p className="text-sm text-brand-brown/60">jane.doe@example.com</p>
            </div>
            
            <nav className="space-y-2">
              <button 
                onClick={() => setActiveTab("orders")}
                className={`w-full flex items-center gap-3 px-4 py-3 text-sm transition-colors ${activeTab === "orders" ? "bg-brand-brown text-white" : "text-brand-brown hover:bg-white"}`}
              >
                <Package size={18} /> My Orders
              </button>
              <button 
                onClick={() => setActiveTab("profile")}
                className={`w-full flex items-center gap-3 px-4 py-3 text-sm transition-colors ${activeTab === "profile" ? "bg-brand-brown text-white" : "text-brand-brown hover:bg-white"}`}
              >
                <User size={18} /> Profile Details
              </button>
              <button 
                onClick={() => setActiveTab("addresses")}
                className={`w-full flex items-center gap-3 px-4 py-3 text-sm transition-colors ${activeTab === "addresses" ? "bg-brand-brown text-white" : "text-brand-brown hover:bg-white"}`}
              >
                <MapPin size={18} /> Saved Addresses
              </button>
              <button 
                onClick={() => setActiveTab("wishlist")}
                className={`w-full flex items-center gap-3 px-4 py-3 text-sm transition-colors ${activeTab === "wishlist" ? "bg-brand-brown text-white" : "text-brand-brown hover:bg-white"}`}
              >
                <Heart size={18} /> Wishlist
              </button>
              <button 
                className="w-full flex items-center gap-3 px-4 py-3 text-sm text-red-600 hover:bg-red-50 transition-colors mt-4"
              >
                <LogOut size={18} /> Logout
              </button>
            </nav>
          </div>
        </aside>

        {/* Main Content */}
        <div className="flex-1">
          {activeTab === "orders" && (
            <div>
              <h2 className="text-2xl font-serif text-brand-brown mb-6">My Orders</h2>
              <div className="space-y-4">
                {[1, 2].map((order) => (
                  <div key={order} className="border border-brand-brown/10 p-6 rounded-sm hover:shadow-md transition-shadow">
                    <div className="flex justify-between items-start mb-4 border-b border-brand-brown/10 pb-4">
                      <div>
                        <p className="text-sm text-brand-brown/60 mb-1">Order #AANGI-9823{order}</p>
                        <p className="text-xs text-brand-brown/60">Placed on Oct 24, 2023</p>
                      </div>
                      <div className="text-right">
                        <span className="inline-block px-3 py-1 bg-green-100 text-green-800 text-xs font-medium rounded-full mb-1">Delivered</span>
                        <p className="font-bold text-brand-brown">₹4500.00</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="w-16 h-20 bg-gray-200 relative overflow-hidden">
                        <img src="https://images.unsplash.com/photo-1610189013233-317180b5b139?q=80&w=200" alt="" className="object-cover w-full h-full" />
                      </div>
                      <div>
                        <h4 className="font-medium text-brand-brown">Crimson Silk Saree</h4>
                        <p className="text-sm text-brand-brown/60">Qty: 1</p>
                      </div>
                    </div>
                    <div className="mt-4 pt-4 border-t border-brand-brown/10 flex justify-end gap-3">
                      <button className="px-4 py-2 text-sm border border-brand-brown text-brand-brown hover:bg-brand-cream transition-colors">Track Order</button>
                      <button className="px-4 py-2 text-sm bg-brand-brown text-white hover:bg-brand-gold transition-colors">Buy Again</button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === "profile" && (
            <div>
              <h2 className="text-2xl font-serif text-brand-brown mb-6">Profile Details</h2>
              <form className="max-w-md space-y-4">
                <div>
                  <label className="block text-sm text-brand-brown/70 mb-1">Full Name</label>
                  <input type="text" defaultValue="Jane Doe" className="w-full border border-brand-brown/20 p-3 focus:outline-none focus:border-brand-gold" />
                </div>
                <div>
                  <label className="block text-sm text-brand-brown/70 mb-1">Email</label>
                  <input type="email" defaultValue="jane.doe@example.com" disabled className="w-full border border-brand-brown/20 p-3 bg-gray-50 text-gray-500" />
                </div>
                <div>
                  <label className="block text-sm text-brand-brown/70 mb-1">Phone Number</label>
                  <input type="tel" defaultValue="+91 9876543210" className="w-full border border-brand-brown/20 p-3 focus:outline-none focus:border-brand-gold" />
                </div>
                <button type="submit" className="mt-4 bg-brand-brown text-white px-6 py-3 uppercase tracking-wider text-sm hover:bg-brand-gold transition-colors">
                  Save Changes
                </button>
              </form>
            </div>
          )}

          {activeTab === "addresses" && (
            <div>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-serif text-brand-brown">Saved Addresses</h2>
                <button className="text-sm font-medium text-brand-gold hover:text-brand-brown">Add New</button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="border border-brand-gold p-5 relative">
                  <span className="absolute top-0 right-0 bg-brand-gold text-white text-xs px-2 py-1">Default</span>
                  <h4 className="font-bold text-brand-brown mb-2">Jane Doe</h4>
                  <p className="text-sm text-brand-brown/70 leading-relaxed mb-4">
                    123, Fashion Street, Near Heritage Mall<br />
                    Mumbai, Maharashtra - 400001<br />
                    India
                  </p>
                  <p className="text-sm text-brand-brown/70 mb-4">Phone: +91 9876543210</p>
                  <div className="flex gap-4 border-t border-brand-brown/10 pt-4">
                    <button className="text-sm font-medium text-brand-brown hover:text-brand-gold">Edit</button>
                    <button className="text-sm font-medium text-red-600 hover:text-red-800">Delete</button>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          {activeTab === "wishlist" && (
            <div>
              <h2 className="text-2xl font-serif text-brand-brown mb-6">My Wishlist</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="group bg-white border border-brand-brown/10 p-3">
                  <div className="relative h-60 overflow-hidden mb-3">
                    <img src="https://images.unsplash.com/photo-1595777457583-95e059d581b8?q=80&w=400" alt="" className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-110" />
                  </div>
                  <h3 className="font-serif text-brand-brown mb-1 truncate">Embroidered Georgette Kurti</h3>
                  <div className="font-bold text-brand-brown mb-3">₹1800</div>
                  <button className="w-full py-2 bg-brand-brown text-white text-sm uppercase tracking-wider hover:bg-brand-gold transition-colors">Move to Cart</button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
