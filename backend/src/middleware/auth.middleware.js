const ApiError = require("../utils/apiError.js");
const asyncHandler = require("../utils/asyncHandler.js");
const jwt = require("jsonwebtoken");
const User = require("../models/user.model.js");
const Admin = require("../models/admin.model.js");


 const verifyUser = asyncHandler(async (req, res, next) => {
    try {
        const token = req.cookies?.token || req.header("Authorization")?.replace("Bearer ", "")

        if (!token) {
            throw new ApiError(401, "Unauthorized request")
        }

        const decodedinfo = await jwt.verify(token, process.env.JWT_SECTRET)
        // console.log(decodedinfo, "<-decodecd");

        const user = await User.findById(decodedinfo?._id).select(" -password")

        if (!user) {
            throw new ApiError(404, "Invalid Access Token")
        }
        req.user = user
        next()
    } catch (error) {
        if (error.name === 'TokenExpiredError') {
            throw new ApiError(401, 'Token Expired');
        }

        throw new ApiError(404, error?.message)
    }
})

const verifyAdmin = asyncHandler(async (req,res,next)=>{
    try {
        const token = req.cookies?.token || req.header("Authorization")?.replace("Bearer ", "")

        if (!token) {
            throw new ApiError(401, "Unauthorized request")
        }

        const decodedinfo = await jwt.verify(token, process.env.JWT_SECTRET)
        // console.log(decodedinfo, "<-decodecd");

        const user = await Admin.findById(decodedinfo?._id).select(" -password")

        if (!user) {
            throw new ApiError(404, "Invalid Access Token")
        }
        req.admin = user
        next()
    } catch (error) {
        if (error.name === 'TokenExpiredError') {
            throw new ApiError(401, 'Token Expired');
        }

        throw new ApiError(404, error?.message)
    }
})

module.exports = { verifyAdmin,verifyUser}