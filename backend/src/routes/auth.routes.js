const express = require("express");
const router = express.Router();
const {registerUser} = require("../controller/user.controller")
router.post("/signup", registerUser);


module.exports = router;
