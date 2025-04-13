// menuItemController.js
const MenuItem = require("../models/menuItem.model");

// Get all menu items for a specific restaurant
exports.getMenuItemsByRestaurant = async (req, res) => {
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

// Create a new menu item (Admin only)
exports.createMenuItem = async (req, res) => {
  try {
    const { restaurantID, name, description, price, category, rating, availability } = req.body;

    // Validate required fields
    if (!restaurantID || !name || !price || !category) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const menuItem = new MenuItem({
      restaurantID,
      name,
      description,
      price,
      category,
      rating,
      availability,
    });

    const savedMenuItem = await menuItem.save();
    res.status(201).json(savedMenuItem);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Update a menu item (Admin only)
exports.updateMenuItem = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    const menuItem = await MenuItem.findByIdAndUpdate(id, updates, { new: true });
    if (!menuItem) {
      return res.status(404).json({ message: "Menu item not found" });
    }
    res.status(200).json(menuItem);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Delete a menu item (Admin only)
exports.deleteMenuItem = async (req, res) => {
  try {
    const { id } = req.params;
    const menuItem = await MenuItem.findByIdAndDelete(id);
    if (!menuItem) {
      return res.status(404).json({ message: "Menu item not found" });
    }
    res.status(200).json({ message: "Menu item deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};