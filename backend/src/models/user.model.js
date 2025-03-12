const mongoose = require("mongoose");
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const userSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  email: { type: String, required: true, unique: true, lowercase: true },
  phoneNo: { type: String, required: true, unique: true },
  address: { type: String, required: true },
  password: { type: String, required: true, minlength: 6 },
}, { timestamps: true });

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next()
  this.password = await bcrypt.hash(this.password, 10)
  next()
})

userSchema.methods.isPasswordCorrect = async function (password) {
  return await bcrypt.compare(password, this.password)
}

userSchema.methods.generateAccessToken = function () {
  return jwt.sign({
      _id: this._id,
      email: this.email,
      },
      process.env.JWT_SECTRET,
      {
          expiresIn: "1d"
      }
  )
}

module.exports = mongoose.model("User", userSchema);
