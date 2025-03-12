const express = require("express");
const router = express.Router();
const { createDeliveryDetails } = require("../controller/delieveryDetails.controller"); // Corrected import path
const { verifyUser } = require("../middleware/auth.middleware");

// Route to create delivery details
router.post("/create", verifyUser, createDeliveryDetails); // Fixed function name
module.exports = router;
