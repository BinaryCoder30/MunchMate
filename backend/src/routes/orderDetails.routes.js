const express = require("express");
const router = express.Router();
const { createOrderDetails } = require("../controller/orderDetails.controller");
const {verifyUser} = require("../middleware/auth.middleware");
// Route to create an orderdetails

router.post("/create",verifyUser,createOrderDetails);
module.exports = router;
