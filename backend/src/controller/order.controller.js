const Order = require("../models/order.model.js");
const ApiError = require("../utils/apiError.js");
const ApiResponse = require("../utils/apiResponse.js");
const asyncHandler = require("../utils/asyncHandler.js");
const Restaurant = require("../models/restaurant.model.js")
// Create a new order
exports.createOrder = async (req, res) => {
  try {
    const { userID, restaurantID, totalAmount, items } = req.body; // Assume items is an array of { menuItemID, quantity }

    // Validate required fields
    if (!userID || !restaurantID || !totalAmount || !items) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const order = new Order({
      userID,
      restaurantID,
      totalAmount,
      orderStatus: "Pending",
      paymentStatus: "Pending",
    });

    const savedOrder = await order.save();
    res.status(201).json(savedOrder);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Get all orders for a user
exports.getUserOrders = async (req, res) => {
  try {
    const { userID } = req.params;
    const orders = await Order.find({ userID })
      .populate("restaurantID", "name")
      .populate("userID", "username");
    if (!orders.length) {
      return res.status(404).json({ message: "No orders found for this user" });
    }
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Update order status (Admin or Restaurant only)
exports.updateOrderStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { orderStatus } = req.body;

    const order = await Order.findByIdAndUpdate(
      id,
      { orderStatus },
      { new: true }
    );
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }
    res.status(200).json(order);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Process payment for an order
exports.processPayment = async (req, res) => {
  try {
    const { id } = req.params;
    const { paymentStatus } = req.body; // Assume paymentStatus comes from payment gateway callback

    const order = await Order.findByIdAndUpdate(
      id,
      { paymentStatus },
      { new: true }
    );
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    if (paymentStatus === "Completed") {
      order.orderStatus = "Preparing"; // Move to next stage if payment is successful
      await order.save();
    }

    res.status(200).json(order);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Get all orders for a restaurant (Admin or Restaurant only)
exports.getRestaurantOrders = async (req, res) => {
  try {
    console.log(restaurantID,"res...");
    
    const { restaurantID } = req.params;
    const orders = await Order.find({ restaurantID }).populate("userID");
    if (!orders.length) {
      return res.status(404).json({ message: "No orders found for this restaurant" });
    }
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

exports.getAllOrders = async (req, res) => {
  try {
    const adminId = req.admin._id;

    // Find restaurants managed by the admin
    const restaurants = await Restaurant.find({ admin: adminId });
    const restaurantIDs = restaurants.map(r => r._id);

    // Find orders for those restaurants
    const orders = await Order.find({ restaurantID: { $in: restaurantIDs } })
      .populate("userID", "username")
      .populate("restaurantID", "name");

    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Update order status (Admin or Restaurant only)
exports.updateOrderStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { orderStatus } = req.body;

    // Validate orderStatus
    const validStatuses = ["Pending", "Preparing", "Out for Delivery", "Delivered"];
    if (!validStatuses.includes(orderStatus)) {
      return res.status(400).json({ message: "Invalid order status" });
    }

    const order = await Order.findByIdAndUpdate(
      id,
      { orderStatus },
      { new: true }
    ).populate("userID", "username")
     .populate("restaurantID", "name")

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    res.status(200).json(order);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

