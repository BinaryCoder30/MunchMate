import React, { useState } from "react";
import { motion } from "framer-motion";

const SettingsTab = () => {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Password update:", { oldPassword, newPassword });
    // Add actual password update logic here
  };

  return (
    <motion.div className="bg-white p-8 rounded-2xl shadow-xl" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <h3 className="text-2xl font-semibold text-indigo-900 mb-6">Admin Settings</h3>
      <div className="space-y-6">
        <div className="flex items-center bg-gradient-to-r from-indigo-600 to-purple-600 p-6 rounded-xl text-white">
          <img 
            src="https://via.placeholder.com/80" 
            alt="Admin" 
            className="w-20 h-20 rounded-full mr-6" 
          />
          <div>
            <h4 className="text-xl font-bold">MunchMate <span className="text-indigo-200">Admin</span></h4>
            <p className="text-sm">EMP-174106161210</p>
            <p className="text-sm">munchmate@gmail.com</p>
            <p className="text-sm">+91 7777777777</p>
          </div>
        </div>
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-indigo-700 font-medium mb-2">Name</label>
              <input 
                type="text" 
                value="MunchMate" 
                readOnly 
                className="w-full p-3 border border-indigo-200 rounded-lg bg-indigo-50 text-indigo-900" 
              />
            </div>
            <div>
              <label className="block text-indigo-700 font-medium mb-2">Email</label>
              <input 
                type="email" 
                value="munchmate@gmail.com" 
                readOnly 
                className="w-full p-3 border border-indigo-200 rounded-lg bg-indigo-50 text-indigo-900" 
              />
            </div>
            <div>
              <label className="block text-indigo-700 font-medium mb-2">Phone</label>
              <input 
                type="text" 
                value="+91 7777777777" 
                readOnly 
                className="w-full p-3 border border-indigo-200 rounded-lg bg-indigo-50 text-indigo-900" 
              />
            </div>
            <div>
              <label className="block text-indigo-700 font-medium mb-2">Designation</label>
              <input 
                type="text" 
                value="Admin" 
                readOnly 
                className="w-full p-3 border border-indigo-200 rounded-lg bg-indigo-50 text-indigo-900" 
              />
            </div>
            <div>
              <label className="block text-indigo-700 font-medium mb-2">Old Password</label>
              <input 
                type="password" 
                value={oldPassword}
                onChange={(e) => setOldPassword(e.target.value)}
                className="w-full p-3 border border-indigo-200 rounded-lg bg-white text-indigo-900 focus:outline-none focus:ring-2 focus:ring-indigo-500" 
              />
            </div>
            <div>
              <label className="block text-indigo-700 font-medium mb-2">New Password</label>
              <input 
                type="password" 
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="w-full p-3 border border-indigo-200 rounded-lg bg-white text-indigo-900 focus:outline-none focus:ring-2 focus:ring-indigo-500" 
              />
            </div>
          </div>
          <motion.button
            type="submit"
            className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white p-3 rounded-lg font-semibold hover:from-indigo-700 hover:to-purple-700 transition-all duration-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Save Changes
          </motion.button>
        </form>
      </div>
    </motion.div>
  );
};

export default SettingsTab;