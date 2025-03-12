const MenuItem = require("../models/menuItem.model.js");
const ApiError = require("../utils/apiError.js");
const ApiResponse = require("../utils/apiResponse.js");
const asyncHandler = require("../utils/asyncHandler.js");


const createMenu = asyncHandler(async (req,res)=>{
    
    const { name ,description,price,category,availability} = req.body
    const admin = req.admin
    if(!name || !description || !price || !category || !availability){
        throw new ApiError(400,"All fields are requird.")
    }

    const createdobj = await MenuItem.create({
        name ,description,price,category,availability,admin:admin?._id
    })

    if(!createdobj){
        throw new ApiError(500,"Some internal error occured")
    }

    return res.status(201).json(new ApiResponse(201,createdobj,"Success!"))
})

module.exports = {createMenu};