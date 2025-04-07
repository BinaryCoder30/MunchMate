import React from "react";
import { motion } from "framer-motion";
import { FaShoppingCart, FaChartLine, FaUtensils } from "react-icons/fa";
import MetricCard from "../Shared/MetricCard";

const OverviewTab = ({ data = {}, menuItems = [] }) => {
  // Safely access nested properties with defaults
  const orders = data.orders || [];
  const profits = data.profits || [];
  const recentOrders = orders.slice(-5);
  
  // Find top menu item with validation
  const topMenuItem = menuItems.length > 0 
    ? menuItems.reduce((max, item) => {
        const itemPrice = item?.price || 0;
        const maxPrice = max?.price || 0;
        return itemPrice > maxPrice ? item : max;
      }, { name: "N/A", price: 0 }) 
    : { name: "N/A", price: 0 };

  // Calculate total profit safely
  const totalProfit = profits.reduce((sum, p) => sum + (p?.profit || 0), 0);

  return (
    <motion.div className="space-y-8" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <MetricCard 
          title="Total Orders" 
          value={orders.length} 
          icon={<FaShoppingCart />} 
        />
        <MetricCard 
          title="Total Profit" 
          value={`₹${totalProfit}`} 
          icon={<FaChartLine />} 
        />
        <MetricCard 
          title="Menu Items" 
          value={menuItems.length} 
          icon={<FaUtensils />} 
        />
        <MetricCard 
          title="Top Menu Item" 
          value={`${topMenuItem.name || 'N/A'} (₹${topMenuItem.price || 0})`} 
          icon={<FaUtensils />} 
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-8 rounded-2xl shadow-xl">
          <h3 className="text-2xl font-semibold text-indigo-900 mb-6">Restaurant Details</h3>
          <div className="space-y-4 text-indigo-800">
            <p><span className="font-medium">Name:</span> {data.name || 'N/A'}</p>
            <p><span className="font-medium">Location:</span> {data.location || 'N/A'}</p>
            <p><span className="font-medium">Cuisine:</span> {data.cuisine || 'N/A'}</p>
            <p><span className="font-medium">Contact:</span> {data.contact || 'N/A'}</p>
            <p><span className="font-medium">Rating:</span> {data.rating ? `${data.rating} ⭐` : 'N/A'}</p>
          </div>
        </div>
        <div className="bg-white p-8 rounded-2xl shadow-xl">
          <h3 className="text-2xl font-semibold text-indigo-900 mb-6">Recent Orders</h3>
          {recentOrders.length > 0 ? (
            <table className="min-w-full">
              <thead>
                <tr className="bg-indigo-100">
                  <th className="px-4 py-2 text-left text-sm font-medium text-indigo-900 uppercase">Order ID</th>
                  <th className="px-4 py-2 text-left text-sm font-medium text-indigo-900 uppercase">User</th>
                  <th className="px-4 py-2 text-left text-sm font-medium text-indigo-900 uppercase">Total</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-indigo-200">
                {recentOrders.map((order) => (
                  <tr key={order.orderID || Math.random()} className="hover:bg-indigo-50 transition-colors">
                    <td className="px-4 py-2 whitespace-nowrap text-sm text-indigo-800">
                      {order.orderID || 'N/A'}
                    </td>
                    <td className="px-4 py-2 whitespace-nowrap text-sm text-indigo-800">
                      {order.user || 'N/A'}
                    </td>
                    <td className="px-4 py-2 whitespace-nowrap text-sm text-indigo-800">
                      ₹{order.totalAmount || 0}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p className="text-indigo-800">No recent orders found</p>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default OverviewTab;