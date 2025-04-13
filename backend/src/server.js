const express = require("express");
const connectDB = require("./database/db");
const path = require("path");
const cors = require("cors"); // ✅ Import CORS
require("dotenv").config();

const app = express();

// ✅ Enable CORS for frontend requests
app.use(cors({
  origin: "http://localhost:5173", // Allow frontend requests from Vite
  methods: "GET,POST,PUT,DELETE",
  credentials: true, // Allow cookies & authentication headers
}));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

connectDB();

app.get("/", (req, res) => res.send("API Running...."));

const authRoutes = require("./routes/auth.routes"); // ✅ Add this
app.use("/api/auth", authRoutes); // ✅ Register route
//-------------------------admin-------------------------------
const adminRoutes = require("./routes/admin.routes");
app.use("/api/admin", adminRoutes);

//---------------------------user--------------------------------
const userRoutes = require("./routes/user.routes");
app.use("/api/user", userRoutes);

//----------------------------restaurant------------------------------
const restaurantRoutes = require("./routes/restaurant.routes.js");
app.use("/api/restaurants", restaurantRoutes);

//----------------------------menuItem------------------------------
const menuItemroutes = require("./routes/menuItem.routes.js");
app.use("/api/menuItem", menuItemroutes);

//----------------------------order------------------------------
const orderroutes = require("./routes/order.routes.js");
app.use("/api/orders", orderroutes);

//----------------------------orderdetails------------------------------
const orderDetailsroutes = require("./routes/orderDetails.routes.js");
app.use("/api/orderDetails", orderDetailsroutes);

//----------------------------deliverydetails------------------------------
const deliveryDetailsroutes = require("./routes/delieveryDetails.routes.js"); // ✅ Fixed Typo
app.use("/api/deliveryDetails", deliveryDetailsroutes);

//----------------------------deliveryPartner------------------------------
const deliveryPartnerroutes = require("./routes/delieveryPartner.routes.js"); // ✅ Fixed Typo
app.use("/api/deliveryPartner", deliveryPartnerroutes);

//----------------------------payment------------------------------
const paymentroutes = require("./routes/payment.routes.js");
app.use("/api/payment", paymentroutes);

//----------------------------404 Handler------------------------------
app.use((req, res) => {
  res.status(404).json({ message: "Route Not Found" });
});

//----------------------------Global Error Handler------------------------------
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Internal Server Error" });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
