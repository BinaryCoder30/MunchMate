import React, { useState, useEffect } from "react";
import { FaClock, FaShoppingBag } from 'react-icons/fa';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';

const API_BASE_URL = "http://localhost:5000/api";

const OrderCard = ({ order }) => {
  const statusColors = {
    "Pending": "bg-yellow-500",
    "Preparing": "bg-blue-500",
    "Out for Delivery": "bg-orange-500",
    "Delivered": "bg-green-500",
  };

  return (
    <div className="bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-lg transition-all duration-300 p-6 w-full mb-6">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-semibold text-[#2C3E50]">Order #{order._id.slice(-6)}</h3>
        <span className={`text-white text-sm px-3 py-1 rounded-full ${statusColors[order.orderStatus]}`}>
          {order.orderStatus}
        </span>
      </div>
      <p className="text-gray-600 text-base mb-2">
        Restaurant: <span className="font-semibold">{order.restaurantID.name}</span>
      </p>
      <p className="text-gray-600 text-base mb-2">
        Total: <span className="font-semibold">₹{order.totalAmount.toFixed(2)}</span>
      </p>
      <p className="text-gray-600 text-base mb-4 flex items-center">
        <FaClock className="mr-2" /> 
        {new Date(order.orderDateTime).toLocaleString()}
      </p>
      <div className="border-t pt-4">
        <h4 className="text-lg font-semibold text-[#2C3E50] mb-2">Items</h4>
        <ul className="space-y-2">
          {order.items && order.items.map((item, index) => (
            <li key={index} className="text-gray-600 text-sm">
              {item.quantity} x {item.menuItemID.name} - ₹{(item.quantity * item.menuItemID.price).toFixed(2)}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

const OrderPage = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const token = Cookies.get('token');
    if (!token) {
      navigate('/login');
      return;
    }

    const fetchOrders = async () => {
      try {
        setLoading(true);
        const userID = Cookies.get('userID'); // Assume userID is stored in cookies
        const response = await fetch(`${API_BASE_URL}/orders/user/${userID}`, {
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

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F5F5F5] flex items-center justify-center">
        <div className="text-2xl font-semibold text-[#2C3E50]">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F5F5F5]">
      <div className="container mx-auto px-8 py-10">
        <h1 className="text-5xl font-extrabold text-center text-[#2C3E50] mb-10">
          Your Orders
        </h1>

        {orders.length === 0 ? (
          <div className="text-center py-20">
            <FaShoppingBag className="text-6xl text-gray-400 mx-auto mb-4" />
            <p className="text-xl text-gray-500">You haven't placed any orders yet.</p>
          </div>
        ) : (
          <div className="max-w-4xl mx-auto space-y-6">
            {orders.map((order) => (
              <OrderCard key={order._id} order={order} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default OrderPage;