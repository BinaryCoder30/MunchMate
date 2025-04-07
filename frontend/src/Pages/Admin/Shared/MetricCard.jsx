import React from "react";
import { motion } from "framer-motion";

const MetricCard = ({ title, value, icon }) => (
  <motion.div
    className="bg-white p-6 rounded-2xl shadow-xl flex items-center space-x-4 hover:bg-indigo-50 transition-colors"
    whileHover={{ scale: 1.03 }}
  >
    <div className="text-indigo-600 text-3xl">{icon}</div>
    <div>
      <h4 className="text-lg font-semibold text-indigo-900">{title}</h4>
      <p className="text-2xl font-bold text-indigo-800">{value}</p>
    </div>
  </motion.div>
);

export default MetricCard;