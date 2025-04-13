import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FaDownload, FaSignOutAlt, FaPlus } from "react-icons/fa";
import * as XLSX from "xlsx";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import Sidebar from "./Sidebar";
import OverviewTab from "../Tabs/OverviewTab";
import OrdersTab from "../Tabs/OrdersTab";
import MenuTab from "../Tabs/MenuTab";
import ProfitLossTab from "../Tabs/ProfitLossTab";
import DeliveriesTab from "../Tabs/DeliveriesTab";
import CustomerStatsTab from "../Tabs/CustomerStatsTab";
import SettingsTab from "../Tabs/SettingsTab";
import LoginPage from "../Auth/LoginPage";
import RestaurantSelectionModal from "../Modals/RestaurantSelectionModal";
import CreateRestaurantModal from "../Modals/CreateRestaurantModal";

const API_BASE_URL = "http://localhost:5000/api";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [restaurantId, setRestaurantId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("overview");
  const [searchQuery, setSearchQuery] = useState("");
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [statusFilter, setStatusFilter] = useState("all");
  const [menuItems, setMenuItems] = useState([]);
  const [calendarDate, setCalendarDate] = useState(new Date());
  const [restaurantData, setRestaurantData] = useState(null);
  const [error, setError] = useState(null);
  const [adminRestaurants, setAdminRestaurants] = useState([]);
  const [showRestaurantModal, setShowRestaurantModal] = useState(false);
  const [showCreateRestaurantModal, setShowCreateRestaurantModal] = useState(false);

  useEffect(() => {
    const token = Cookies.get("adminToken");
    
    if (token) {
      setIsLoggedIn(true);
      checkAdminRestaurants();
    } else {
      navigate("/admin/login");
    }
  }, [navigate]);

  const checkAdminRestaurants = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${API_BASE_URL}/admin/restaurants`, {
        credentials: 'include',
        headers: {
          'Authorization': `Bearer ${Cookies.get("adminToken")}`
        }
      });

      if (!response.ok) {
        throw new Error('Failed to fetch admin restaurants');
      }

      const data = await response.json();
      console.log(data,"---data")
      setAdminRestaurants(data.restaurant);

      // Check if there's a restaurantId in cookies that belongs to this admin
      const cookieRestaurantId = Cookies.get("restaurantId");
      if (cookieRestaurantId && data.restaurant.some(r => r.id === cookieRestaurantId)) {
        setRestaurantId(cookieRestaurantId);
        fetchRestaurantData(cookieRestaurantId);
      } else if (data.restaurant?.length > 0) {
        // Auto-select first restaurant if none is selected
        setRestaurantId(data.restaurant[0]._id);
        fetchRestaurantData(data.restaurant[0]._id);
      } else {
        // No restaurants available - show restaurant selection modal
        setShowRestaurantModal(true);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };
  // Inside AdminDashboard component (before the return statement)

// Function to add a new menu item
const addMenuItem = async (newItem) => {
  try {
    setLoading(true);
    const response = await fetch(`${API_BASE_URL}/restaurants/${restaurantId}/menu`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${Cookies.get("adminToken")}`
      },
      body: JSON.stringify(newItem),
    });

    if (!response.ok) {
      throw new Error('Failed to add menu item');
    }

    const data = await response.json();
    setMenuItems([...menuItems, data]); // Update state with new item
  } catch (err) {
    setError(err.message);
  } finally {
    setLoading(false);
  }
};

// Function to remove a menu item
const removeMenuItem = async (itemId) => {
  try {
    setLoading(true);
    const response = await fetch(`${API_BASE_URL}/restaurants/${restaurantId}/menu/${itemId}`, {
      method: 'DELETE',
      credentials: 'include',
      headers: {
        'Authorization': `Bearer ${Cookies.get("adminToken")}`
      },
    });

    if (!response.ok) {
      throw new Error('Failed to delete menu item');
    }

    setMenuItems(menuItems.filter(item => item._id !== itemId)); // Update state
  } catch (err) {
    setError(err.message);
  } finally {
    setLoading(false);
  }
};

  const fetchRestaurantData = async (id) => {
    try {
      setLoading(true);
      const response = await fetch(`${API_BASE_URL}/restaurants/${id}`, {
        credentials: 'include',
        headers: {
          'Authorization': `Bearer ${Cookies.get("adminToken")}`
        }
      });

      if (!response.ok) {
        throw new Error('Failed to fetch restaurant data');
      }

      const data = await response.json();
      setRestaurantData(data);
      setMenuItems(data.menuItems || []);
      Cookies.set("restaurantId", id, { 
        expires: 7, 
        secure: true,
        sameSite: 'strict'
      });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = async (credentials) => {
    try {
      setLoading(true);
      const response = await fetch(`${API_BASE_URL}/admin/login`, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
      });

      if (!response.ok) {
        throw new Error('Login failed');
      }

      const data = await response.json();
      Cookies.set("adminToken", data.token, { 
        expires: 7, 
        secure: true,
        sameSite: 'strict'
      });

      setIsLoggedIn(true);
      await checkAdminRestaurants();
      navigate("/admin/dashboard");
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await fetch(`${API_BASE_URL}/admin/logout`, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Authorization': `Bearer ${Cookies.get("adminToken")}`
        }
      });
    } finally {
      Cookies.remove("adminToken");
      Cookies.remove("restaurantId");
      setIsLoggedIn(false);
      setRestaurantId(null);
      setRestaurantData(null);
      navigate("/admin/login");
    }
  };

  const handleRestaurantSelect = (id) => {
    setRestaurantId(id);
    fetchRestaurantData(id);
    setShowRestaurantModal(false);
  };

  const handleCreateRestaurant = async (restaurantData) => {
    try {
      setLoading(true);
      const response = await fetch(`${API_BASE_URL}/restaurants/create`, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${Cookies.get("adminToken")}`
        },
        body: JSON.stringify(restaurantData),
      });

      if (!response.ok) {
        throw new Error('Failed to create restaurant');
      }

      const data = await response.json();
      await checkAdminRestaurants(); // Refresh the restaurant list
      setShowCreateRestaurantModal(false);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const filteredOrders = restaurantData?.orders?.filter((order) => {
    const orderDate = new Date(order.orderDate);
    return (
      order.user?.toLowerCase().includes(searchQuery.toLowerCase()) &&
      (!startDate || orderDate >= startDate) &&
      (!endDate || orderDate <= endDate) &&
      (statusFilter === "all" || order.orderStatus === statusFilter)
    );
  }) || [];

  if (loading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  if (error) {
    return <div className="flex justify-center items-center h-screen text-red-500">{error}</div>;
  }

  if (!isLoggedIn) {
    return <LoginPage onLogin={handleLogin} />;
  }

  if (!restaurantId) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-100 to-indigo-50 flex flex-col items-center justify-center p-4">
        <div className="bg-white rounded-lg shadow-xl p-8 max-w-md w-full">
          <h2 className="text-2xl font-bold text-indigo-900 mb-6 text-center">
            No Restaurant Assigned
          </h2>
          <p className="text-gray-600 mb-8 text-center">
            You don't have any restaurants assigned to your account yet.
          </p>
          <div className="flex flex-col space-y-4">
            <button
              onClick={() => setShowRestaurantModal(true)}
              className="bg-indigo-600 text-white py-3 px-4 rounded-lg hover:bg-indigo-700 transition flex items-center justify-center"
            >
              <FaPlus className="mr-2" />
              Select Existing Restaurant
            </button>
            <button
              onClick={() => setShowCreateRestaurantModal(true)}
              className="bg-green-600 text-white py-3 px-4 rounded-lg hover:bg-green-700 transition flex items-center justify-center"
            >
              <FaPlus className="mr-2" />
              Create New Restaurant
            </button>
            <button
              onClick={handleLogout}
              className="bg-gray-200 text-gray-800 py-3 px-4 rounded-lg hover:bg-gray-300 transition flex items-center justify-center"
            >
              <FaSignOutAlt className="mr-2" />
              Logout
            </button>
          </div>
        </div>

        {/* Restaurant Selection Modal */}
        {showRestaurantModal && (
          <RestaurantSelectionModal
            restaurants={adminRestaurants}
            onSelect={handleRestaurantSelect}
            onClose={() => setShowRestaurantModal(false)}
          />
        )}

        {/* Create Restaurant Modal */}
        {showCreateRestaurantModal && (
          <CreateRestaurantModal
            onCreate={handleCreateRestaurant}
            onClose={() => setShowCreateRestaurantModal(false)}
          />
        )}
      </div>
    );
  }

  if (!restaurantData) {
    return <div className="flex justify-center items-center h-screen">Loading restaurant data...</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-indigo-50 text-indigo-900 flex">
      <Sidebar 
        restaurantData={restaurantData} 
        activeTab={activeTab} 
        setActiveTab={setActiveTab}
        handleLogout={handleLogout}
        downloadReport={() => downloadReport(restaurantData, filteredOrders)}
        onRestaurantChange={() => setShowRestaurantModal(true)}
      />

      <div className="flex-1 p-10 ml-64">
        <h1 className="text-4xl font-extrabold text-indigo-900 mb-8">
          {activeTab.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
        </h1>

        {activeTab === "overview" && <OverviewTab data={restaurantData} menuItems={menuItems} />}
        {activeTab === "orders" && (
          <OrdersTab 
            orders={filteredOrders} 
            searchQuery={searchQuery} 
            setSearchQuery={setSearchQuery} 
            startDate={startDate} 
            setStartDate={setStartDate} 
            endDate={endDate} 
            setEndDate={setEndDate} 
            statusFilter={statusFilter} 
            setStatusFilter={setStatusFilter} 
          />
        )}
        {activeTab === "menu" && (
          <MenuTab 
            menuItems={menuItems} 
            addMenuItem={addMenuItem} 
            removeMenuItem={removeMenuItem} 
          />
        )}
        {activeTab === "profit-loss" && <ProfitLossTab profits={restaurantData.profits || []} />}
        {activeTab === "deliveries" && <DeliveriesTab orders={filteredOrders} />}
        {activeTab === "customer-stats" && (
          <CustomerStatsTab 
            calendarDate={calendarDate} 
            setCalendarDate={setCalendarDate} 
          />
        )}
        {activeTab === "settings" && <SettingsTab />}
      </div>

      {/* Restaurant Selection Modal */}
      {showRestaurantModal && (
        <RestaurantSelectionModal
          restaurants={adminRestaurants}
          onSelect={handleRestaurantSelect}
          onClose={() => setShowRestaurantModal(false)}
        />
      )}

      {/* Create Restaurant Modal */}
      {showCreateRestaurantModal && (
        <CreateRestaurantModal
          onCreate={handleCreateRestaurant}
          onClose={() => setShowCreateRestaurantModal(false)}
        />
      )}
    </div>
  );
};

export default AdminDashboard;