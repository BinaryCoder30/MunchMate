const express = require("express");
const router = express.Router();
const { createRestaurant,getRestraurantData } = require("../controller/restaurant.controller");
const {verifyAdmin} = require("../middleware/auth.middleware");
// Route to create an restaurant

router.post("/create",verifyAdmin,createRestaurant);
router.get("/:id",verifyAdmin,getRestraurantData)
module.exports = router;
