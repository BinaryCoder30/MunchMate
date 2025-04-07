const asyncHandler = require("../utils/asyncHandler.js");
const ApiError = require("../utils/apiError.js");
const User = require("../models/user.model.js");
const ApiResponse = require("../utils/apiResponse.js");
const jwt = require("jsonwebtoken");

// Generate Access Token
const generateTokens = async (userId) => {
    try {
        const user = await User.findById(userId);
        if (!user) throw new ApiError(404, "User not found");

        const accessToken = user.generateAccessToken(); // Ensure this method exists in User model

        await user.save({ validateBeforeSave: false });
        return accessToken;
    } catch (error) {
        throw new ApiError(500, "Something went wrong while generating tokens");
    }
};

// Register User
const registerUser = asyncHandler(async (req, res) => {
    try {
        const { name, phone, email, address, password } = req.body;
    
    

    if ([name, phone, email, address, password].some((field) => !field?.trim())) {
        throw new ApiError(400, "All fields are required");
    }

    // Check if user already exists
    const existedUser = await User.findOne({ email });
    if (existedUser) {
        throw new ApiError(409, "User with this email already exists");
    }

    const user = await User.create({ name, email, password, phoneNo:phone, address });

    // const createdUser = await User.findById(user._id).select("-password");

    return res.status(201).json(new ApiResponse(201, user, "Registered successfully"));

    } catch (error) {
        return res.status(500).json(new ApiResponse(500, null, error));
    }
    
});

// Login User
const loginUser = asyncHandler(async (req, res) => {
    const { email, username, password } = req.body;

    if (!username && !email) {
        throw new ApiError(400, "Email or Username is required");
    }

    const user = await User.findOne({ $or: [{ email }, { username }] });
    if (!user) {
        throw new ApiError(404, "User doesn't exist");
    }

    // Check if password matches
    const checkPassword = await user.isPasswordCorrect(password);
    if (!checkPassword) {
        return res.status(401).json({message:"Invalid credentials",status:false});
    }

    const token = await generateTokens(user._id);
    const loggedInUser = await User.findById(user._id).select("-password");

    return res.status(200).json(new ApiResponse(200, { user: loggedInUser, token }, "Logged in successfully"));
});

// Change Current Password
const changeCurrentPassword = asyncHandler(async (req, res) => {
    const { oldPassword, newPassword } = req.body;

    const user = await User.findById(req.user?._id);
    if (!user) {
        throw new ApiError(404, "User not found");
    }

    const passwordCheck = await user.isPasswordCorrect(oldPassword);
    if (!passwordCheck) {
        throw new ApiError(400, "Invalid old password");
    }

    user.password = newPassword;
    await user.save({ validateBeforeSave: false });

    return res.status(200).json(new ApiResponse(200, {}, "Password updated successfully"));
});
module.exports = {
    registerUser,
    loginUser,
    changeCurrentPassword,
};

