import React from "react";
import { motion } from "framer-motion";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

const ProfitLossTab = ({ profits }) => (
  <motion.div className="bg-white p-8 rounded-2xl shadow-xl" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
    <h3 className="text-2xl font-semibold text-indigo-900 mb-6">Monthly Profit & Loss</h3>
    <ResponsiveContainer width="100%" height={400}>
      <LineChart data={profits}>
        <CartesianGrid strokeDasharray="3 3" stroke="#C7D2FE" />
        <XAxis dataKey="month" stroke="#4F46E5" />
        <YAxis stroke="#4F46E5" />
        <Tooltip 
          contentStyle={{ 
            backgroundColor: "#E0E7FF", 
            border: "none", 
            color: "#4F46E5" 
          }} 
        />
        <Legend />
        <Line 
          type="monotone" 
          dataKey="profit" 
          stroke="#6366F1" 
          strokeWidth={2} 
          name="Profit" 
        />
        <Line 
          type="monotone" 
          dataKey="loss" 
          stroke="#EF4444" 
          strokeWidth={2} 
          name="Loss" 
        />
      </LineChart>
    </ResponsiveContainer>
  </motion.div>
);

export default ProfitLossTab;