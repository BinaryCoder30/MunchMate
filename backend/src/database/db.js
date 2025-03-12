const mongoose = require("mongoose");
require("dotenv").config();

const MAX_RETRIES = 5; // Maximum retry attempts
let retries = 0;

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 15000, // Increase timeout to 15 seconds
    });

    console.log("✅ MongoDB Connected Successfully!");
  } catch (error) {
    console.error(`❌ MongoDB Connection Error: ${error.message}`);

    // Retry connection if retries are left
    if (retries < MAX_RETRIES) {
      retries++;
      console.log(`🔄 Retrying connection (${retries}/${MAX_RETRIES}) in 5 seconds...`);
      setTimeout(connectDB, 5000);
    } else {
      console.error("🚨 Max retries reached. Could not connect to MongoDB.");
      process.exit(1); // Exit the process if connection fails after retries
    }
  }
};

// Listen for MongoDB disconnection
mongoose.connection.on("disconnected", () => {
  console.warn("⚠️ MongoDB Disconnected! Retrying...");
  connectDB();
});

module.exports = connectDB;
