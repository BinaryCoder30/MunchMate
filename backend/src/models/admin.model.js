const mongoose = require("mongoose")
const adminSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true, minlength: 6 },
    restaurantID: { type: mongoose.Schema.Types.ObjectId, ref: "Restaurant" }, 
  }, { timestamps: true });
  adminSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next()
    this.password = await bcrypt.hash(this.password, 10)
    next()
  })

  adminSchema.methods.isPasswordCorrect = async function (password) {
    return await bcrypt.compare(password, this.password)
  }
  
  adminSchema.methods.generateAccessToken = function () {
    return jwt.sign({
        _id: this._id,
        email: this.email,
        restaurant_admin:true
        },
        process.env.JWT_SECTRET,
        {
            expiresIn: "1d"
        }
    )
  }
  
  module.exports = mongoose.model("Admin", adminSchema);
  