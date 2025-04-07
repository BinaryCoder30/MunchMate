const express = require("express");
const router = express.Router();
const { verifyAdmin } = require("../middleware/auth.middleware.js");
const { createAdmin, loginAdmin, updateAdmin, getRestraurants } = require("../controller/admin.controller.js");

router.post("/create", createAdmin);
router.post("/login", loginAdmin);
router.put("/update", verifyAdmin, updateAdmin); // Protected route for admin updates
router.get  ("/restaurants", verifyAdmin, getRestraurants); // Protected route for admin updates

module.exports = router;
