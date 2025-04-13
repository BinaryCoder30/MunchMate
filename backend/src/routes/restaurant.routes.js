const express = require("express");
const router = express.Router();
const restaurantController = require("../controller/restaurant.controller");
const {verifyAdmin} = require("../middleware/auth.middleware");
// Route to create an restaurant

router.post("/create",verifyAdmin,restaurantController.createRestaurant);
router.get("/admin", verifyAdmin, restaurantController.getAdminRestaurants);
router.get("/all", restaurantController.getAllRestaurants);
// Restaurant CRUD operations
router.post("/", verifyAdmin, restaurantController.createRestaurant);
router.get("/:id", verifyAdmin, restaurantController.getRestaurantById);
router.patch("/:id", verifyAdmin, restaurantController.updateRestaurant);

// Menu Items operations
router.post("/:id/menu", verifyAdmin, restaurantController.addMenuItem);
router.delete("/:id/menu-items/:itemId", verifyAdmin, restaurantController.removeMenuItem);

// Orders operations
router.get("/:id/orders/filter", verifyAdmin, restaurantController.getFilteredOrders);

module.exports = router;
