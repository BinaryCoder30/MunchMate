const express = require("express");
const router = express.Router();

// Import user controller functions
const { registerUser, loginUser, changeCurrentPassword } = require("../controller/user.controller");
const { verifyUser } = require("../middleware/auth.middleware");

// Log a warning if any function is undefined
if (!registerUser || !loginUser || !changeCurrentPassword) {
    console.warn("⚠️ Warning: One or more controller functions are missing.");
}

// Define user-related routes
router.post("/signup", registerUser);

router.post("/login", async (req, res, next) => {
    try {
        await loginUser(req, res);
    } catch (error) {
        next(error);
    }
});

router.post("/change-password", verifyUser, async (req, res, next) => {
    try {
        await changeCurrentPassword(req, res);
    } catch (error) {
        next(error);
    }
});

module.exports = router;
