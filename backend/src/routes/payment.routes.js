const express = require("express");
const router = express.Router();
const { createPayment } = require("../controller/payment.controller");
const {verifyAdmin} = require("../middleware/auth.middleware")
// Route to create an restaurant

router.post("/create",verifyAdmin,createPayment);
module.exports = router;
