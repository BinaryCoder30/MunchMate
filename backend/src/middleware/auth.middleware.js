const ApiError = require("../utils/apiError.js");
const asyncHandler = require("../utils/asyncHandler.js");
const jwt = require("jsonwebtoken");
const User = require("../models/user.model.js");
const Admin = require("../models/admin.model.js");

const verifyUser = asyncHandler(async (req, res, next) => {
    try {
        const token = req.cookies?.token || req.header("Authorization")?.replace("Bearer ", "");

        if (!token) {
            throw new ApiError(401, "Unauthorized request - No token provided");
        }

        const decodedInfo = jwt.verify(token, process.env.JWT_SECRET);

        const user = await User.findById(decodedInfo?._id).select("-password");

        if (!user) {
            throw new ApiError(403, "Invalid Access Token");
        }

        req.user = user;
        next();
    } catch (error) {
        if (error.name === "TokenExpiredError") {
            throw new ApiError(401, "Token Expired");
        } else if (error.name === "JsonWebTokenError") {
            throw new ApiError(403, "Invalid Token");
        } else {
            throw new ApiError(500, "Authentication error");
        }
    }
});

const verifyAdmin = asyncHandler(async (req, res, next) => {
    try {
        const token = req.cookies?.token || req.header("Authorization")?.replace("Bearer ", "");
        if (!token) {
            throw new ApiError(401, "Unauthorized request - No token provided");
        }

        const decodedInfo = jwt.verify(token, process.env.JWT_SECTRET);

        const admin = await Admin.findById(decodedInfo?._id).select("-password");

        if (!admin) {
            throw new ApiError(403, "Invalid Admin Access Token");
        }

        req.admin = admin; // Attach admin to request object
        next();
    } catch (error) {
        if (error.name === "TokenExpiredError") {
            throw new ApiError(401, "Token Expired");
        } else if (error.name === "JsonWebTokenError") {
            throw new ApiError(403, "Invalid Token");
        } else {
            throw new ApiError(500, "Authentication error");
        }
    }
});

module.exports = { verifyAdmin, verifyUser };
