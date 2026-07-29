"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";
import { LayoutDashboard, ShoppingBag, Package, Users, Settings, LogOut, Loader2 } from "lucide-react";
import { useAuth } from "@/context/AuthContext";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const { user, isAdmin, isLoading, logout } = useAuth();

  useEffect(() => {
    if (!isLoading && !isAdmin && pathname !== "/admin/login") {
      router.push("/admin/login");
    }
  }, [isLoading, isAdmin, pathname, router]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900">
        <Loader2 className="animate-spin text-brand-gold w-12 h-12" />
      </div>
    );
  }

  // Allow login page to render without sidebar
  if (pathname === "/admin/login") {
    return <>{children}</>;
  }

  // Prevent flash of content before redirect
  if (!isAdmin) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Admin Sidebar */}
      <aside className="w-64 bg-brand-brown text-white flex-shrink-0 flex flex-col">
        <div className="p-6 border-b border-white/10">
          <Link href="/admin" className="text-2xl font-serif font-bold text-white tracking-wide">
            Aangi <span className="text-brand-gold">Admin</span>
          </Link>
        </div>
        <nav className="flex-1 py-6 px-4 space-y-2">
          <Link href="/admin" className={`flex items-center gap-3 px-4 py-3 rounded-sm transition-colors ${pathname === '/admin' ? 'bg-white/10 text-brand-gold' : 'text-white/70 hover:bg-white/5 hover:text-white'}`}>
            <LayoutDashboard size={20} /> Dashboard
          </Link>
          <Link href="/admin/products" className={`flex items-center gap-3 px-4 py-3 rounded-sm transition-colors ${pathname.includes('/admin/products') ? 'bg-white/10 text-brand-gold' : 'text-white/70 hover:bg-white/5 hover:text-white'}`}>
            <Package size={20} /> Products
          </Link>
          <Link href="/admin/orders" className={`flex items-center gap-3 px-4 py-3 rounded-sm transition-colors ${pathname.includes('/admin/orders') ? 'bg-white/10 text-brand-gold' : 'text-white/70 hover:bg-white/5 hover:text-white'}`}>
            <ShoppingBag size={20} /> Orders
          </Link>
        </nav>
        <div className="p-4 border-t border-white/10">
          <button onClick={logout} className="flex items-center gap-3 px-4 py-3 w-full text-left text-white/70 hover:bg-white/5 hover:text-white rounded-sm transition-colors">
            <LogOut size={20} /> Logout
          </button>
        </div>
      </aside>

      {/* Admin Main Content */}
      <main className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Admin Header */}
        <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-end px-8">
          <div className="flex items-center gap-4">
            <div className="text-sm font-medium text-gray-700">{user?.name || "Admin"}</div>
            <div className="w-8 h-8 rounded-full bg-brand-gold flex items-center justify-center text-white font-serif uppercase">
              {user?.name?.charAt(0) || "A"}
            </div>
          </div>
        </header>
        {/* Page Content */}
        <div className="flex-1 overflow-auto p-8">
          {children}
        </div>
      </main>
    </div>
  );
}
