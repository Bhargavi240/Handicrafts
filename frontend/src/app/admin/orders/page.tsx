"use client";

import { useState, useEffect } from "react";
import { Search, Filter, Eye, CheckCircle, Truck, XCircle, Loader2 } from "lucide-react";
import { getOrders, updateOrderStatus } from "@/lib/api";

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchOrders = async () => {
    setIsLoading(true);
    const data = await getOrders();
    setOrders(data);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const handleStatusUpdate = async (id: string, status: string) => {
    const success = await updateOrderStatus(id, status);
    if (success) {
      fetchOrders(); // Refresh list after update
    } else {
      alert("Failed to update status");
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'DELIVERED': return "bg-green-100 text-green-800";
      case 'SHIPPED': return "bg-blue-100 text-blue-800";
      case 'PROCESSING': return "bg-yellow-100 text-yellow-800";
      case 'CANCELLED': return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800"; // PENDING
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <Loader2 className="animate-spin text-brand-gold w-10 h-10" />
      </div>
    );
  }
  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Orders</h1>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-100 mb-6">
        <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center flex-wrap gap-4">
          <div className="relative">
            <input 
              type="text" 
              placeholder="Search by Order ID or Customer..." 
              className="pl-10 pr-4 py-2 border border-gray-200 rounded-sm focus:outline-none focus:border-brand-gold w-72 text-sm"
            />
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          </div>
          <div className="flex gap-4 items-center">
            <span className="text-sm font-medium text-gray-500 flex items-center gap-2">
              <Filter size={16} /> Filter by:
            </span>
            <select className="border border-gray-200 rounded-sm px-4 py-2 text-sm focus:outline-none focus:border-brand-gold">
              <option>All Status</option>
              <option>Pending</option>
              <option>Processing</option>
              <option>Shipped</option>
              <option>Delivered</option>
              <option>Cancelled</option>
            </select>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-gray-600">
            <thead className="bg-gray-50 text-gray-500 font-medium border-b border-gray-100">
              <tr>
                <th className="px-6 py-4">Order ID</th>
                <th className="px-6 py-4">Customer</th>
                <th className="px-6 py-4">Date</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4">Total</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {orders.map((order) => (
                <tr key={order.id} className="hover:bg-gray-50/50">
                  <td className="px-6 py-4 font-medium text-gray-900">#{order.id.slice(-6).toUpperCase()}</td>
                  <td className="px-6 py-4">
                    <p className="font-medium text-gray-900">{order.user?.name || "Guest"}</p>
                    <p className="text-xs text-gray-400">{order.user?.email}</p>
                  </td>
                  <td className="px-6 py-4">{new Date(order.createdAt).toLocaleDateString()}</td>
                  <td className="px-6 py-4">
                    <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                      {order.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 font-medium text-gray-900">₹{order.total.toFixed(2)}</td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex justify-end gap-2">
                      <button className="text-brand-brown hover:text-brand-gold p-2 transition-colors" title="View Details">
                        <Eye size={18} />
                      </button>
                      <button onClick={() => handleStatusUpdate(order.id, 'DELIVERED')} className="text-green-600 hover:text-green-800 p-2 transition-colors" title="Mark as Delivered">
                        <CheckCircle size={18} />
                      </button>
                      <button onClick={() => handleStatusUpdate(order.id, 'SHIPPED')} className="text-blue-600 hover:text-blue-800 p-2 transition-colors" title="Mark as Shipped">
                        <Truck size={18} />
                      </button>
                      <button onClick={() => handleStatusUpdate(order.id, 'CANCELLED')} className="text-red-500 hover:text-red-700 p-2 transition-colors" title="Cancel Order">
                        <XCircle size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {orders.length === 0 && (
                <tr>
                  <td colSpan={6} className="px-6 py-8 text-center text-gray-500">
                    No orders found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        
        <div className="px-6 py-4 border-t border-gray-100 flex justify-between items-center text-sm text-gray-500">
          <span>Showing 1 to 5 of 156 orders</span>
          <div className="flex gap-1">
            <button className="px-3 py-1 border border-gray-200 rounded-sm hover:bg-gray-50">Prev</button>
            <button className="px-3 py-1 border border-gray-200 rounded-sm bg-brand-gold text-white font-medium border-brand-gold">1</button>
            <button className="px-3 py-1 border border-gray-200 rounded-sm hover:bg-gray-50">2</button>
            <button className="px-3 py-1 border border-gray-200 rounded-sm hover:bg-gray-50">3</button>
            <button className="px-3 py-1 border border-gray-200 rounded-sm hover:bg-gray-50">Next</button>
          </div>
        </div>
      </div>
    </div>
  );
}
