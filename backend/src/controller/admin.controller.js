const Admin = require("../models/admin.model.js");
const asyncHandler = require("../utils/asyncHandler.js");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const Reataurant = require("../models/restaurant.model.js");

const createAdmin = asyncHandler(async (req, res) => {
    const { name, email, password } = req.body;
    console.log("🔹 Create Admin Request:", req.body);

    const existingAdmin = await Admin.findOne({ email });
    if (existingAdmin) {
        return res.status(400).json({ message: "Admin already exists" });
    }

    try {
        // Trim password to avoid spaces and ensure consistent hashing
        const hashedPassword = await bcrypt.hash(password.trim(), 10);
        console.log("🔐 Hashed Password (Before Storing):", hashedPassword);

        const newAdmin = await Admin.create({ name, email, password: hashedPassword });

        // Fetch stored admin to verify
        const storedAdmin = await Admin.findOne({ email });
        console.log("🗄 Stored Hashed Password:", storedAdmin.password);

        res.status(201).json({
            message: "✅ Admin created successfully",
            admin: { id: newAdmin._id, name: newAdmin.name, email: newAdmin.email },
        });
    } catch (error) {
        console.error("❌ Error creating admin:", error);
        res.status(500).json({ message: "Server error, try again" });
    }
});



const loginAdmin = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    console.log("🔹 Login Attempt:", req.body);

    const admin = await Admin.findOne({ email });

    if (!admin) {
        return res.status(401).json({ message: "Invalid credentials" });
    }

    console.log("🔐 Stored Hashed Password:", admin.password);

    const isPasswordValid = await bcrypt.compare(password, admin.password);

    console.log("🔍 Password Match:", isPasswordValid);

    if (!isPasswordValid) {
        return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign({ _id: admin._id }, process.env.JWT_SECTRET, { expiresIn: "1d" });

    res.cookie("token", token, { httpOnly: true, secure: process.env.NODE_ENV === "production" });

    res.status(200).json({ message: "Login successful",admin:admin,token: token });
});

const updateAdmin = asyncHandler(async (req, res) => {
    const { name, email } = req.body;

    const updatedAdmin = await Admin.findByIdAndUpdate(
        req.admin._id, // Ensure `req.admin` is set by `verifyAdmin`
        { name, email },
        { new: true }
    );

    if (!updatedAdmin) {
        return res.status(404).json({ message: "Admin not found" });
    }

    res.status(200).json({ message: "Admin updated successfully", admin: updatedAdmin });
});
const getRestraurants = async(req,res)=>{
    const admin = req.admin
    console.log(req.admin._id)
    const restraunats = await Reataurant.find({admin:req.admin._id})
    // console.log(restraunats)
    return res.status(200).json({message:"restraunats are fetched successfully",restaurant:restraunats})
    
}
module.exports = { createAdmin, loginAdmin, updateAdmin ,getRestraurants};
