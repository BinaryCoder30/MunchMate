const Admin = require("../models/admin.model");
const ApiError = require("../utils/apiError")
const ApiResponse = require("../utils/apiResponse")
const asyncHandler = require("../utils/asyncHandler")


const generateTokens = async (userId) => {
    try {
        const user = await Admin.findById(userId)
        const accessToken = user.generateAccessToken()
      
        await user.save({ validateBeforeSave: false })
        return accessToken
    } catch (error) {
        throw new ApiError(500, "Something went wrong while generating refresh and access tokens")
    }
}

const createAdmin = asyncHandler(async (req,res)=>{
    console.log(req.body);
    
    const { name ,email,password} = req.body
    if(!name || !email || !password){
        throw new ApiError(400,"All fields are requird.")
    }

    const createdAdmin = await Admin.create({
        name,email:email,password:password
    })

    if(!createdAdmin){
        throw new ApiError(500,"Some internal error occured")
    }

    return res.status(201).json(new ApiResponse(201,createdAdmin,"Success!"))
})
const updateAdmin = asyncHandler(async (req,res)=>{
    const { name ,email,password,adminId} = req.body
    if(!name || !email || !password){
        throw new ApiError(400,"All fields are requird.")
    }

    const existedAdmin = await Admin.findById(adminId)

    if(!existedAdmin){
        throw new ApiError(404,"Admin not found")
    }

    existedAdmin.name = name
    existedAdmin.email = email
    existedAdmin.password = password
    await existedAdmin.save()

    return res.status(200).json(new ApiResponse(200,existedAdmin,"Updated!"))
})

const loginAdmin = asyncHandler(async (req, res) => {
    const { email, username, password } = req.body
    console.log(req.body);

    if (!username && !email) {
        throw new ApiError(400, "Username or password is required")
    }

    const user = await Admin.findOne({ $or: [{ email }, { username }] })

    if (!user) {
        throw new ApiError(404, "User doesn't exist")
    }

    const checkPassword = await user.isPasswordCorrect(password)

    if (!checkPassword) {
        throw new ApiError(401, "Invalid user credentials")
    }
    const token = await generateTokens(user._id)

    const loggedInUser = await Admin.findById(user._id).select("-password")

    
    return res.status(200)
        .json(new ApiResponse(200, { user: loggedInUser, token}, "User Logged in successfully"))

})



module.exports = {
    createAdmin,
    updateAdmin,
    loginAdmin};