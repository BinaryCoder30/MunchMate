import React from "react";
import { motion } from "framer-motion";
import { FaChartLine, FaShoppingCart, FaUtensils, FaMoneyBillWave, FaTruck, FaUser, FaUserCircle, FaDownload, FaSignOutAlt } from "react-icons/fa";

const Sidebar = ({ restaurantData, activeTab, setActiveTab, handleLogout, downloadReport }) => {
  return (
    <div className="w-64 bg-gradient-to-b from-indigo-900 to-purple-900 shadow-2xl fixed h-screen">
      <div className="p-6">
        <h2 className="text-2xl font-bold text-white">{restaurantData?.name}</h2>
        <p className="text-sm text-indigo-200">{restaurantData?.location}</p>
      </div>
      <nav className="mt-4">
        {["overview", "orders", "menu", "profit-loss", "deliveries", "customer-stats", "settings"].map((tab) => (
          <motion.button 
            key={tab} 
            onClick={() => setActiveTab(tab)} 
            className={`w-full text-left px-6 py-4 ${activeTab === tab ? "bg-indigo-700" : "hover:bg-indigo-800"} transition-colors text-white flex items-center space-x-3 text-lg font-medium`}
            whileHover={{ scale: 1.05 }} 
            whileTap={{ scale: 0.95 }}
          >
            {tab === "overview" && <FaChartLine />}
            {tab === "orders" && <FaShoppingCart />}
            {tab === "menu" && <FaUtensils />}
            {tab === "profit-loss" && <FaMoneyBillWave />}
            {tab === "deliveries" && <FaTruck />}
            {tab === "customer-stats" && <FaUser />}
            {tab === "settings" && <FaUserCircle />}
            <span>{tab.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}</span>
          </motion.button>
        ))}
        <motion.button 
          onClick={downloadReport} 
          className="w-full text-left px-6 py-4 hover:bg-indigo-800 transition-colors text-white flex items-center space-x-3 text-lg font-medium" 
          whileHover={{ scale: 1.05 }} 
          whileTap={{ scale: 0.95 }}
        >
          <FaDownload />
          <span>Export Excel</span>
        </motion.button>
        <motion.button 
          onClick={handleLogout} 
          className="w-full text-left px-6 py-4 hover:bg-red-700 transition-colors text-white flex items-center space-x-3 text-lg font-medium" 
          whileHover={{ scale: 1.05 }} 
          whileTap={{ scale: 0.95 }}
        >
          <FaSignOutAlt />
          <span>Logout</span>
        </motion.button>
      </nav>
    </div>
  );
};

export default Sidebar;