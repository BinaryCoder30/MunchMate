import React, { useState } from "react";
import { motion } from "framer-motion";
import { FaSearch, FaCalendarAlt, FaFilter } from "react-icons/fa";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const OrdersTab = ({ 
  orders, 
  searchQuery, 
  setSearchQuery, 
  startDate, 
  setStartDate, 
  endDate, 
  setEndDate, 
  statusFilter, 
  setStatusFilter 
}) => {
  const [paymentFilter, setPaymentFilter] = useState("all");
  const filteredOrders = orders.filter((order) => paymentFilter === "all" || order.payment.paymentMethod === paymentFilter);

  return (
    <motion.div className="bg-white p-8 rounded-2xl shadow-xl" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <h3 className="text-2xl font-semibold text-indigo-900 mb-6">Recent Orders</h3>
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="relative w-full md:w-1/3">
          <FaSearch className="absolute left-3 top-3 text-indigo-400" />
          <input 
            type="text" 
            placeholder="Search by customer..." 
            value={searchQuery} 
            onChange={(e) => setSearchQuery(e.target.value)} 
            className="pl-10 p-3 border border-indigo-200 rounded-lg w-full bg-indigo-50 text-indigo-900 placeholder-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-500" 
          />
        </div>
        <div className="relative w-full md:w-1/3">
          <FaCalendarAlt className="absolute left-3 top-3 text-indigo-400" />
          <DatePicker 
            selected={startDate} 
            onChange={(date) => setStartDate(date)} 
            placeholderText="Start Date" 
            className="pl-10 p-3 border border-indigo-200 rounded-lg w-full bg-indigo-50 text-indigo-900 placeholder-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-500" 
          />
        </div>
        <div className="relative w-full md:w-1/3">
          <FaCalendarAlt className="absolute left-3 top-3 text-indigo-400" />
          <DatePicker 
            selected={endDate} 
            onChange={(date) => setEndDate(date)} 
            placeholderText="End Date" 
            className="pl-10 p-3 border border-indigo-200 rounded-lg w-full bg-indigo-50 text-indigo-900 placeholder-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-500" 
          />
        </div>
        <div className="relative w-full md:w-1/3">
          <FaFilter className="absolute left-3 top-3 text-indigo-400" />
          <select 
            value={statusFilter} 
            onChange={(e) => setStatusFilter(e.target.value)} 
            className="pl-10 p-3 border border-indigo-200 rounded-lg w-full bg-indigo-50 text-indigo-900 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <option value="all">All Statuses</option>
            <option value="Delivered">Delivered</option>
            <option value="Processing">Processing</option>
          </select>
        </div>
        <div className="relative w-full md:w-1/3">
          <FaFilter className="absolute left-3 top-3 text-indigo-400" />
          <select 
            value={paymentFilter} 
            onChange={(e) => setPaymentFilter(e.target.value)} 
            className="pl-10 p-3 border border-indigo-200 rounded-lg w-full bg-indigo-50 text-indigo-900 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <option value="all">All Payments</option>
            <option value="Credit Card">Credit Card</option>
            <option value="Cash on Delivery">Cash on Delivery</option>
          </select>
        </div>
      </div>
      <table className="min-w-full">
        <thead>
          <tr className="bg-indigo-100">
            <th className="px-6 py-4 text-left text-sm font-medium text-indigo-900 uppercase">Order ID</th>
            <th className="px-6 py-4 text-left text-sm font-medium text-indigo-900 uppercase">User</th>
            <th className="px-6 py-4 text-left text-sm font-medium text-indigo-900 uppercase">Total</th>
            <th className="px-6 py-4 text-left text-sm font-medium text-indigo-900 uppercase">Date</th>
            <th className="px-6 py-4 text-left text-sm font-medium text-indigo-900 uppercase">Payment Method</th>
            <th className="px-6 py-4 text-left text-sm font-medium text-indigo-900 uppercase">Payment Status</th>
            <th className="px-6 py-4 text-left text-sm font-medium text-indigo-900 uppercase">Delivery Status</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-indigo-200">
          {filteredOrders.map((order) => (
            <tr key={order.orderID} className="hover:bg-indigo-50 transition-colors">
              <td className="px-6 py-4 whitespace-nowrap text-sm text-indigo-800">{order.orderID}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-indigo-800">{order.user}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-indigo-800">₹{order.totalAmount}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-indigo-800">{order.orderDate}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-indigo-800">{order.payment.paymentMethod}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-indigo-800">{order.payment.paymentStatus}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-indigo-800">{order.delivery.deliveryStatus}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </motion.div>
  );
};

export default OrdersTab;