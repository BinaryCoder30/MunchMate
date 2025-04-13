const express = require("express");
const router = express.Router();
const orderController = require("../controller/order.controller");
const {verifyUser, verifyAdmin} = require("../middleware/auth.middleware");
// Route to create an order
router.post("/",orderController.createOrder);
router.get("/user/:userID", orderController.getUserOrders);
router.get("/restaurant/:restaurantID", orderController.getRestaurantOrders);
router.put("/:id/status", orderController.updateOrderStatus);
router.put("/:id/payment", orderController.processPayment);
router.get("/admin", verifyAdmin, orderController.getAllOrders);
router.put("/admin/:id/status", verifyAdmin, orderController.updateOrderStatus);
module.exports = router;
