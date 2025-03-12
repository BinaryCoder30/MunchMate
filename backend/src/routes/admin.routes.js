const express = require("express");
const router = express.Router();
const { createAdmin, updateAdmin, loginAdmin } = require("../controller/admin.controller");

// Route to create an admin
router.post("/create", createAdmin);
// Route to update an admin
router.post("/update", updateAdmin);
router.post("/login", loginAdmin);

module.exports = router;
