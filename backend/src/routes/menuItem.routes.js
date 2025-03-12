const express = require("express");
const router = express.Router();
const { createMenu } = require("../controller/menuItem.controller");
const {verifyAdmin} = require("../middleware/auth.middleware")
// Route to create an menuItem

router.post("/create",verifyAdmin,createMenu);
module.exports = router;
