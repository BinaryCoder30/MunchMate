import React from 'react';
import { motion } from 'framer-motion';

const RestaurantSelectionModal = ({ restaurants, onSelect, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        className="bg-white rounded-lg shadow-xl max-w-md w-full max-h-[80vh] overflow-y-auto"
      >
        <div className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-bold text-gray-900">Select a Restaurant</h3>
            <button 
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {restaurants?.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-gray-600 mb-4">No restaurants available</p>
              <button
                onClick={onClose}
                className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
              >
                Close
              </button>
            </div>
          ) : (
            <div className="space-y-3">
              {restaurants?.map((restaurant) => (
                <div 
                  key={restaurant.id}
                  onClick={() => onSelect(restaurant.id)}
                  className="p-4 border border-gray-200 rounded-lg cursor-pointer hover:bg-indigo-50 hover:border-indigo-200 transition"
                >
                  <h4 className="font-medium text-gray-900">{restaurant.name}</h4>
                  <p className="text-sm text-gray-600">{restaurant.location}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default RestaurantSelectionModal;