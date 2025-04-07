import React, { useState } from "react";
import { motion } from "framer-motion";
import { FaSearch, FaFilter, FaCalendarAlt } from "react-icons/fa";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const DeliveriesTab = ({ orders }) => {
  const [deliveryStatusFilter, setDeliveryStatusFilter] = useState("all");
  const [partnerFilter, setPartnerFilter] = useState("");
  const [startDeliveryDate, setStartDeliveryDate] = useState(null);
  const [endDeliveryDate, setEndDeliveryDate] = useState(null);

  const filteredDeliveries = orders
    .filter((order) => {
      const deliveryDate = new Date(order.delivery.estimatedDeliveryTime);
      return (
        (deliveryStatusFilter === "all" || order.delivery.deliveryStatus === deliveryStatusFilter) &&
        (!partnerFilter || order.delivery.deliveryPartner.toLowerCase().includes(partnerFilter.toLowerCase())) &&
        (!startDeliveryDate || deliveryDate >= startDeliveryDate) &&
        (!endDeliveryDate || deliveryDate <= endDeliveryDate)
      );
    })
    .map(order => {
      const [date, time] = order.delivery.estimatedDeliveryTime.split(" ");
      const timeTaken = order.delivery.deliveryStatus === "Delivered" && order.delivery.actualDeliveryTime
        ? Math.round((new Date(order.delivery.actualDeliveryTime) - new Date(order.delivery.estimatedDeliveryTime)) / 60000) + " min"
        : "N/A";
      return { ...order, deliveryDate: date, timeTaken };
    });

  return (
    <motion.div className="bg-white p-8 rounded-2xl shadow-xl" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <h3 className="text-2xl font-semibold text-indigo-900 mb-6">Delivery Details</h3>
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="relative w-full md:w-1/4">
          <FaFilter className="absolute left-3 top-3 text-indigo-400" />
          <select 
            value={deliveryStatusFilter} 
            onChange={(e) => setDeliveryStatusFilter(e.target.value)} 
            className="pl-10 p-3 border border-indigo-200 rounded-lg w-full bg-indigo-50 text-indigo-900 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <option value="all">All Statuses</option>
            <option value="Delivered">Delivered</option>
            <option value="In Transit">In Transit</option>
          </select>
        </div>
        <div className="relative w-full md:w-1/4">
          <FaSearch className="absolute left-3 top-3 text-indigo-400" />
          <input 
            type="text" 
            placeholder="Search Partner..." 
            value={partnerFilter} 
            onChange={(e) => setPartnerFilter(e.target.value)} 
            className="pl-10 p-3 border border-indigo-200 rounded-lg w-full bg-indigo-50 text-indigo-900 placeholder-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-500" 
          />
        </div>
        <div className="relative w-full md:w-1/4">
          <FaCalendarAlt className="absolute left-3 top-3 text-indigo-400" />
          <DatePicker 
            selected={startDeliveryDate} 
            onChange={(date) => setStartDeliveryDate(date)} 
            placeholderText="Start Date" 
            className="pl-10 p-3 border border-indigo-200 rounded-lg w-full bg-indigo-50 text-indigo-900 placeholder-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-500" 
          />
        </div>
        <div className="relative w-full md:w-1/4">
          <FaCalendarAlt className="absolute left-3 top-3 text-indigo-400" />
          <DatePicker 
            selected={endDeliveryDate} 
            onChange={(date) => setEndDeliveryDate(date)} 
            placeholderText="End Date" 
            className="pl-10 p-3 border border-indigo-200 rounded-lg w-full bg-indigo-50 text-indigo-900 placeholder-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-500" 
          />
        </div>
      </div>
      <table className="min-w-full">
        <thead>
          <tr className="bg-indigo-100">
            <th className="px-6 py-4 text-left text-sm font-medium text-indigo-900 uppercase">Username</th>
            <th className="px-6 py-4 text-left text-sm font-medium text-indigo-900 uppercase">Order ID</th>
            <th className="px-6 py-4 text-left text-sm font-medium text-indigo-900 uppercase">Delivery ID</th>
            <th className="px-6 py-4 text-left text-sm font-medium text-indigo-900 uppercase">Partner</th>
            <th className="px-6 py-4 text-left text-sm font-medium text-indigo-900 uppercase">Contact</th>
            <th className="px-6 py-4 text-left text-sm font-medium text-indigo-900 uppercase">Vehicle</th>
            <th className="px-6 py-4 text-left text-sm font-medium text-indigo-900 uppercase">Status</th>
            <th className="px-6 py-4 text-left text-sm font-medium text-indigo-900 uppercase">Delivery Date</th>
            <th className="px-6 py-4 text-left text-sm font-medium text-indigo-900 uppercase">Time Taken</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-indigo-200">
          {filteredDeliveries.map((order) => (
            <tr key={order.orderID} className="hover:bg-indigo-50 transition-colors">
              <td className="px-6 py-4 whitespace-nowrap text-sm text-indigo-800">{order.user}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-indigo-800">{order.orderID}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-indigo-800">{order.delivery.deliveryID}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-indigo-800">{order.delivery.deliveryPartner}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-indigo-800">{order.delivery.contactNumber}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-indigo-800">{order.delivery.vehicleDetails}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-indigo-800">{order.delivery.deliveryStatus}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-indigo-800">{order.deliveryDate}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-indigo-800">{order.timeTaken}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </motion.div>
  );
};

export default DeliveriesTab;