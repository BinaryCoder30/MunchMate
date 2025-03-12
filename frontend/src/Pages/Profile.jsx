import React from "react";
import { FaUser, FaEnvelope, FaMapMarkerAlt, FaPhone, FaHistory, FaUtensils, FaSignOutAlt } from "react-icons/fa";
import "@fontsource/poppins";

const Profile = () => {
  const user = {
    name: "John Doe",
    email: "johndoe@example.com",
    address: "123 Main Street, City, Country",
    phone: "+123 456 7890",
    history: [
      { id: 1, item: "Pizza", date: "2025-03-01", amount: "$12.99" },
      { id: 2, item: "Burger", date: "2025-03-03", amount: "$8.99" },
      { id: 3, item: "Pasta", date: "2025-03-05", amount: "$15.99" },
    ],
  };

  return (
    <div className="min-h-screen bg-white text-black flex flex-col items-center py-10 px-5 sm:px-20 font-poppins">
      <div className="bg-white p-10 rounded-xl shadow-lg w-full max-w-3xl text-center border border-blue-400 relative">
        <div className="flex justify-center mb-6">
          <div className="w-32 h-32 rounded-full bg-blue-200 flex items-center justify-center shadow-md">
            <FaUser className="text-6xl text-blue-600" />
          </div>
        </div>
        <h2 className="text-3xl font-semibold text-gray-900 mb-2">{user.name}</h2>
        <p className="text-gray-600 text-lg flex items-center justify-center">
          <FaEnvelope className="text-blue-500 mr-2" />{user.email}
        </p>
        <div className="my-6 border-t border-gray-300"></div>
        <div className="flex flex-col items-center text-lg space-y-3">
          <p className="text-gray-700 flex items-center">
            <FaMapMarkerAlt className="text-blue-500 mr-3" /> {user.address}
          </p>
          <p className="text-gray-700 flex items-center">
            <FaPhone className="text-blue-500 mr-3" /> {user.phone}
          </p>
        </div>
        <button className="absolute top-5 right-5 bg-red-600 text-white py-2 px-4 rounded-lg flex items-center hover:bg-red-700 transition duration-300">
          <FaSignOutAlt className="mr-2" /> Logout
        </button>
      </div>

      <div className="mt-12 w-full max-w-4xl">
        <h3 className="text-3xl font-bold text-gray-900 mb-6 border-b-4 pb-3 border-blue-500 flex items-center">
          <FaHistory className="mr-3 text-blue-500" /> Order History
        </h3>
        <div className="bg-white shadow-lg rounded-xl p-6 border border-blue-300 w-full">
          {user.history.map((order) => (
            <div key={order.id} className="flex justify-between items-center py-4 border-b border-gray-200 last:border-none px-4">
              <span className="font-medium text-gray-800 flex items-center text-lg">
                <FaUtensils className="text-blue-500 mr-3 text-xl" />{order.item}
              </span>
              <span className="text-gray-600 text-md flex items-center">
                <FaHistory className="text-blue-500 mr-3 text-xl" />{order.date}
              </span>
              <span className="font-bold text-blue-700 text-lg">{order.amount}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Profile;