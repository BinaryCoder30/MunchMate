const express = require("express");
const router = express.Router();
const { createMenuItem,getMenuItemsByRestaurant } = require("../controller/menuItem.controller");
const {verifyAdmin} = require("../middleware/auth.middleware")
// Route to create an menuItem

router.post("/create",verifyAdmin,createMenuItem);
router.get("/:restaurantID", getMenuItemsByRestaurant);
module.exports = router;
