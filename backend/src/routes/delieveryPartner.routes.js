const express = require("express");
const router = express.Router();
const { createDelieveryPartner } = require("../controller/delieveryPartner.controller");
const {verifyUser} = require("../middleware/auth.middleware");
// Route to create an delieverypartner

router.post("/create",verifyUser,createDelieveryPartner);
module.exports = router;
