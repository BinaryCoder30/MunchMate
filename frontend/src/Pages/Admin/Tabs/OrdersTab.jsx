import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FaSearch, FaCalendarAlt, FaFilter } from "react-icons/fa";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';

const API_BASE_URL = "http://localhost:5000/api";

const OrdersTab = () => {
  const [orders, setOrders] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [statusFilter, setStatusFilter] = useState("all");
  const [paymentFilter, setPaymentFilter] = useState("all");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const token = Cookies.get('adminToken');
    if (!token) {
      navigate('/login');
      return;
    }

    const fetchOrders = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${API_BASE_URL}/orders/admin`, {
          credentials: 'include',
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });

        if (!response.ok) throw new Error('Failed to fetch orders');
        const orderData = await response.json();
        setOrders(orderData);
      } catch (error) {
        console.error('Error fetching orders:', error);
        setOrders([]);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [navigate]);

  const handleStatusUpdate = async (orderId, newStatus) => {
    const token = Cookies.get('adminToken');
    if (!token) {
      navigate('/login');
      return;
    }

    try {
      const response = await fetch(`${API_BASE_URL}/orders/admin/${orderId}/status`,{
        method: 'PUT',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ orderStatus: newStatus }),
      });

      if (!response.ok) throw new Error('Failed to update order status');

      const updatedOrder = await response.json();
      setOrders(orders.map(order => 
        order._id === orderId ? { ...order, orderStatus: updatedOrder.orderStatus } : order
      ));
    } catch (error) {
      console.error('Error updating order status:', error);
    }
  };

  const filteredOrders = orders.filter((order) => {
    const matchesSearch = order.userID?.username?.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          order._id.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesDate = (!startDate || new Date(order.orderDateTime) >= startDate) && 
                        (!endDate || new Date(order.orderDateTime) <= endDate);
    const matchesStatus = statusFilter === "all" || order.orderStatus === statusFilter;
    const matchesPayment = paymentFilter === "all" || order.paymentStatus === paymentFilter;

    return matchesSearch && matchesDate && matchesStatus && matchesPayment;
  });

  if (loading) {
    return (
      <div className="min-h-screen bg-indigo-50 flex items-center justify-center">
        <div className="text-2xl font-semibold text-indigo-900">Loading...</div>
      </div>
    );
  }

  return (
    <motion.div 
      className="bg-white p-8 rounded-2xl shadow-xl" 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }}
    >
      <h3 className="text-2xl font-semibold text-indigo-900 mb-6">Recent Orders</h3>
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="relative w-full md:w-1/3">
          <FaSearch className="absolute left-3 top-3 text-indigo-400" />
          <input 
            type="text" 
            placeholder="Search by customer or order ID..." 
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
            <option value="Pending">Pending</option>
            <option value="Preparing">Preparing</option>
            <option value="Out for Delivery">Out for Delivery</option>
            <option value="Delivered">Delivered</option>
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
            <option value="Pending">Pending</option>
            <option value="Completed">Completed</option>
            <option value="Failed">Failed</option>
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
            <th className="px-6 py-4 text-left text-sm font-medium text-indigo-900 uppercase">Payment Status</th>
            <th className="px-6 py-4 text-left text-sm font-medium text-indigo-900 uppercase">Delivery Status</th>
            <th className="px-6 py-4 text-left text-sm font-medium text-indigo-900 uppercase">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-indigo-200">
          {filteredOrders.map((order) => (
            <tr key={order._id} className="hover:bg-indigo-50 transition-colors">
              <td className="px-6 py-4 whitespace-nowrap text-sm text-indigo-800">{order._id.slice(-6)}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-indigo-800">{order.userID?.username || 'N/A'}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-indigo-800">₹{order.totalAmount.toFixed(2)}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-indigo-800">
                {new Date(order.orderDateTime).toLocaleString()}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-indigo-800">{order.paymentStatus}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-indigo-800">{order.orderStatus}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-indigo-800">
                <select
                  value={order.orderStatus}
                  onChange={(e) => handleStatusUpdate(order._id, e.target.value)}
                  className="p-2 border border-indigo-200 rounded-lg bg-indigo-50 text-indigo-900 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  <option value="Pending">Pending</option>
                  <option value="Preparing">Preparing</option>
                  <option value="Out for Delivery">Out for Delivery</option>
                  <option value="Delivered">Delivered</option>
                </select>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </motion.div>
  );
};

export default OrdersTab;