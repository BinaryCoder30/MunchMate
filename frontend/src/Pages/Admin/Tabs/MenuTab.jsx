import React, { useState } from "react";
import { motion } from "framer-motion";
import { FaPlus, FaEdit, FaTrash } from "react-icons/fa";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

const MenuTab = ({ menuItems, addMenuItem, removeMenuItem, editMenuItem }) => {
  const [showAddForm, setShowAddForm] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);
  const [newItem, setNewItem] = useState({ 
    name: "", 
    description: "", 
    price: "", 
    availability: true, 
    category: "" 
  });
  const [editingItem, setEditingItem] = useState(null);
  const [categoryFilter, setCategoryFilter] = useState("all");

  const handleAddItem = (e) => {
    e.preventDefault();
    addMenuItem(newItem);
    setNewItem({ name: "", description: "", price: "", availability: true, category: "" });
    setShowAddForm(false);
  };

  const handleEditItem = (e) => {
    e.preventDefault();
    editMenuItem(editingItem.itemID, editingItem);
    setEditingItem(null);
    setShowEditForm(false);
  };

  const filteredMenuItems = menuItems.filter((item) => 
    categoryFilter === "all" || item.category === categoryFilter
  );
  
  const menuData = filteredMenuItems.map((item) => ({ 
    name: item.name, 
    price: item.price 
  }));

  const categories = [
    "South Indian", "Italian", "Chinese", "Mughlai", 
    "Seafood", "Vegetarian", "Tandoori", "Continental", 
    "Rajasthani", "Cafe", "Dessert"
  ];

  return (
    <motion.div className="space-y-8" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <div className="bg-white p-8 rounded-2xl shadow-xl">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-2xl font-semibold text-indigo-900">Menu Items</h3>
          <motion.button 
            onClick={() => setShowAddForm(!showAddForm)} 
            className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2 hover:from-indigo-700 hover:to-purple-700 transition-all duration-300" 
            whileHover={{ scale: 1.05 }} 
            whileTap={{ scale: 0.95 }}
          >
            <FaPlus />
            <span>{showAddForm ? "Cancel" : "Add Item"}</span>
          </motion.button>
        </div>

        {showAddForm && (
          <form onSubmit={handleAddItem} className="space-y-4 mb-6 p-6 bg-indigo-50 rounded-lg">
            <input 
              type="text" 
              placeholder="Item Name" 
              value={newItem.name} 
              onChange={(e) => setNewItem({ ...newItem, name: e.target.value })} 
              className="w-full p-3 border border-indigo-200 rounded-lg bg-white text-indigo-900 placeholder-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-500" 
              required 
            />
            <input 
              type="text" 
              placeholder="Description" 
              value={newItem.description} 
              onChange={(e) => setNewItem({ ...newItem, description: e.target.value })} 
              className="w-full p-3 border border-indigo-200 rounded-lg bg-white text-indigo-900 placeholder-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-500" 
              required 
            />
            <input 
              type="number" 
              placeholder="Price" 
              value={newItem.price} 
              onChange={(e) => setNewItem({ ...newItem, price: Number(e.target.value) })} 
              className="w-full p-3 border border-indigo-200 rounded-lg bg-white text-indigo-900 placeholder-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-500" 
              required 
            />
            <select 
              value={newItem.availability} 
              onChange={(e) => setNewItem({ ...newItem, availability: e.target.value === "true" })} 
              className="w-full p-3 border border-indigo-200 rounded-lg bg-white text-indigo-900 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value="true">Available</option>
              <option value="false">Not Available</option>
            </select>
            <select 
              value={newItem.category} 
              onChange={(e) => setNewItem({ ...newItem, category: e.target.value })} 
              className="w-full p-3 border border-indigo-200 rounded-lg bg-white text-indigo-900 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value="">Select Category</option>
              {categories.map((category) => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
            <button 
              type="submit" 
              className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white p-3 rounded-lg hover:from-indigo-700 hover:to-purple-700 transition-all duration-300"
            >
              Add Item
            </button>
          </form>
        )}

        {showEditForm && editingItem && (
          <form onSubmit={handleEditItem} className="space-y-4 mb-6 p-6 bg-indigo-50 rounded-lg">
            <input 
              type="text" 
              placeholder="Item Name" 
              value={editingItem.name} 
              onChange={(e) => setEditingItem({ ...editingItem, name: e.target.value })} 
              className="w-full p-3 border border-indigo-200 rounded-lg bg-white text-indigo-900 placeholder-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-500" 
              required 
            />
            <input 
              type="text" 
              placeholder="Description" 
              value={editingItem.description} 
              onChange={(e) => setEditingItem({ ...editingItem, description: e.target.value })} 
              className="w-full p-3 border border-indigo-200 rounded-lg bg-white text-indigo-900 placeholder-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-500" 
              required 
            />
            <input 
              type="number" 
              placeholder="Price" 
              value={editingItem.price} 
              onChange={(e) => setEditingItem({ ...editingItem, price: Number(e.target.value) })} 
              className="w-full p-3 border border-indigo-200 rounded-lg bg-white text-indigo-900 placeholder-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-500" 
              required 
            />
            <select 
              value={editingItem.availability} 
              onChange={(e) => setEditingItem({ ...editingItem, availability: e.target.value === "true" })} 
              className="w-full p-3 border border-indigo-200 rounded-lg bg-white text-indigo-900 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value="true">Available</option>
              <option value="false">Not Available</option>
            </select>
            <select 
              value={editingItem.category} 
              onChange={(e) => setEditingItem({ ...editingItem, category: e.target.value })} 
              className="w-full p-3 border border-indigo-200 rounded-lg bg-white text-indigo-900 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value="">Select Category</option>
              {categories.map((category) => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
            <button 
              type="submit" 
              className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white p-3 rounded-lg hover:from-indigo-700 hover:to-purple-700 transition-all duration-300"
            >
              Update Item
            </button>
          </form>
        )}

        <div className="mb-6">
          <select 
            value={categoryFilter} 
            onChange={(e) => setCategoryFilter(e.target.value)} 
            className="p-3 border border-indigo-200 rounded-lg bg-indigo-50 text-indigo-900 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <option value="all">All Categories</option>
            {categories.map((category) => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>
        </div>

        <table className="min-w-full">
          <thead>
            <tr className="bg-indigo-100">
              <th className="px-6 py-4 text-left text-sm font-medium text-indigo-900 uppercase">Item ID</th>
              <th className="px-6 py-4 text-left text-sm font-medium text-indigo-900 uppercase">Name</th>
              <th className="px-6 py-4 text-left text-sm font-medium text-indigo-900 uppercase">Description</th>
              <th className="px-6 py-4 text-left text-sm font-medium text-indigo-900 uppercase">Price</th>
              <th className="px-6 py-4 text-left text-sm font-medium text-indigo-900 uppercase">Availability</th>
              <th className="px-6 py-4 text-left text-sm font-medium text-indigo-900 uppercase">Category</th>
              <th className="px-6 py-4 text-left text-sm font-medium text-indigo-900 uppercase">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-indigo-200">
            {filteredMenuItems.map((item) => (
              <tr key={item.itemID} className="hover:bg-indigo-50 transition-colors">
                <td className="px-6 py-4 whitespace-nowrap text-sm text-indigo-800">{item.itemID}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-indigo-800">{item.name}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-indigo-800">{item.description}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-indigo-800">₹{item.price}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-indigo-800">
                  {item.availability ? "Available" : "Not Available"}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-indigo-800">{item.category}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-indigo-800">
                  <motion.button 
                    onClick={() => { 
                      setEditingItem(item); 
                      setShowEditForm(true); 
                    }} 
                    className="text-indigo-500 hover:text-indigo-700 mr-2" 
                    whileHover={{ scale: 1.1 }} 
                    whileTap={{ scale: 0.9 }}
                  >
                    <FaEdit />
                  </motion.button>
                  <motion.button 
                    onClick={() => removeMenuItem(item.itemID)} 
                    className="text-red-500 hover:text-red-700" 
                    whileHover={{ scale: 1.1 }} 
                    whileTap={{ scale: 0.9 }}
                  >
                    <FaTrash />
                  </motion.button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="bg-white p-8 rounded-2xl shadow-xl">
        <h3 className="text-2xl font-semibold text-indigo-900 mb-6">Menu Item Prices</h3>
        <ResponsiveContainer width="100%" height={400}>
          <BarChart data={menuData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#C7D2FE" />
            <XAxis dataKey="name" stroke="#4F46E5" />
            <YAxis stroke="#4F46E5" />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: "#E0E7FF", 
                border: "none", 
                color: "#4F46E5" 
              }} 
            />
            <Legend />
            <Bar dataKey="price" fill="#6366F1" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  );
};

export default MenuTab;