const ApiError = require("../utils/apiError.js");
const ApiResponse = require("../utils/apiResponse.js");
const asyncHandler = require("../utils/asyncHandler.js");
const Restaurant = require("../models/restaurant.model.js");
const MenuItem = require("../models/menuItem.model.js");
const Order = require("../models/order.model.js");
const mongoose = require("mongoose");


const createRestaurant = asyncHandler(async (req,res)=>{
    const { name ,location,contact,cuisineType} = req.body
    const admin = req.admin
    if(!name || !location || !contact || !cuisineType){
        throw new ApiError(400,"All fields are requird.")
    }

    const createdobj = await Restaurant.create({
        name ,location,contactInfo:contact,cuisineType,admin:req.admin?._id
    })
    
    if(!createdobj){
        throw new ApiError(500,"Some internal error occured")
    }

    return res.status(201).json(new ApiResponse(201,createdobj,"Success!"))
})


// Get restaurant by ID
const getRestaurantById = async (req, res) => {
    try {
      const { id } = req.params;
  
      if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ error: "Invalid restaurant ID" });
      }
  
      // Convert string ID to ObjectId
      const restaurantObjectId = new mongoose.Types.ObjectId(id);
  
      // Get restaurant basic info
      const restaurant = await Restaurant.findById(restaurantObjectId);
      if (!restaurant) {
        return res.status(404).json({ error: "Restaurant not found" });
      }
      
      // Get menu items

      const menuItems = await MenuItem.find({ restaurantID: restaurantObjectId });
      
      // Get orders (last 30 days by default)
      const thirtyDaysAgo = new Date();
      thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
  
      const orders = await Order.find({ 
        restaurantID: restaurantObjectId,
        orderDateTime: { $gte: thirtyDaysAgo }
      }).sort({ orderDateTime: -1 }).populate('userID');
  
      // Calculate profits data
      const profits = await Order.aggregate([
        {
          $match: { 
            restaurantID: restaurantObjectId,
            paymentStatus: "Completed" 
          }
        },
        {
          $group: {
            _id: { $dateToString: { format: "%Y-%m-%d", date: "$orderDateTime" } },
            revenue: { $sum: "$totalAmount" },
            count: { $sum: 1 }
          }
        },
        { $sort: { _id: 1 } },
        { 
          $project: {
            date: "$_id",
            revenue: 1,
            ordersCount: "$count",
            _id: 0
          }
        }
      ]);
  
      // Construct the response object
      const responseData = {
        ...restaurant.toObject(),
        menuItems,
        orders,
        profits
      };
  
      res.status(200).json(responseData);
    } catch (error) {
      console.error("Error in getRestaurantById:", error);
      res.status(500).json({ error: error.message });
    }
  };

// Get all restaurants for an admin
const getAdminRestaurants = async (req, res) => {
  try {
    const adminId = req.admin._id; // Assuming admin ID comes from auth middleware

    const restaurants = await Restaurant.find({ admin: adminId });
    res.status(200).json({ restaurant: restaurants }); // Matching frontend expectation
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Create new restaurant

// Update restaurant
const updateRestaurant = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: "Invalid restaurant ID" });
    }

    const restaurant = await Restaurant.findByIdAndUpdate(id, updates, { new: true });
    if (!restaurant) {
      return res.status(404).json({ error: "Restaurant not found" });
    }

    res.status(200).json(restaurant);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Add menu item
const addMenuItem = async (req, res) => {
  try {
    const { id } = req.params; // restaurant ID
    const { name, description, price, category } = req.body;

    const menuItem = await MenuItem.create({
      restaurantID: id,
      name,
      description,
      price,
      category
    });

    res.status(201).json(menuItem);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
const getMenuItemsByRestaurant = async (req, res) => {
  try {
    const { restaurantID } = req.params;
    const menuItems = await MenuItem.find({ restaurantID }).populate("restaurantID", "name");
    if (!menuItems.length) {
      return res.status(404).json({ message: "No menu items found for this restaurant" });
    }
    res.status(200).json(menuItems);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Remove menu item
const removeMenuItem = async (req, res) => {
  try {
    const { itemId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(itemId)) {
      return res.status(400).json({ error: "Invalid menu item ID" });
    }

    const menuItem = await MenuItem.findByIdAndDelete(itemId);
    if (!menuItem) {
      return res.status(404).json({ error: "Menu item not found" });
    }

    res.status(200).json({ message: "Menu item deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get filtered orders (for orders tab)
const getFilteredOrders = async (req, res) => {
  try {
    const { id } = req.params; // restaurant ID
    const { startDate, endDate, status } = req.query;

    let filter = { restaurantID: id };

    // Date filter
    if (startDate || endDate) {
      filter.orderDateTime = {};
      if (startDate) filter.orderDateTime.$gte = new Date(startDate);
      if (endDate) filter.orderDateTime.$lte = new Date(endDate);
    }

    // Status filter
    if (status && status !== "all") {
      filter.orderStatus = status;
    }

    const orders = await Order.find(filter)
      .sort({ orderDateTime: -1 })
      .populate("userID", "name email"); // Add basic user info

    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
const getAllRestaurants = async (req, res) => {
  try {
    const restaurants = await Restaurant.find().populate("admin", "username");

    // Check if each restaurant has menu items
    const restaurantsWithMenuInfo = await Promise.all(
      restaurants.map(async (restaurant) => {
        const hasMenuItems = await MenuItem.exists({ restaurant: restaurant._id });
        return {
          ...restaurant.toObject(),
          hasMenuItems: !!hasMenuItems,
        };
      })
    );

    res.status(200).json(restaurantsWithMenuInfo);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

module.exports = {
  getRestaurantById,
  getAdminRestaurants,
  createRestaurant,
  updateRestaurant,
  addMenuItem,
  removeMenuItem,
  getFilteredOrders,getAllRestaurants
};
