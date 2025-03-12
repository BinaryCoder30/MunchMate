const express = require("express");
const router = express.Router();
const { createOrder } = require("../controller/order.controller");
const {verifyUser} = require("../middleware/auth.middleware");
// Route to create an order

router.post("/create",verifyUser,createOrder);
module.exports = router;
