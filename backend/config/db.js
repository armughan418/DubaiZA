const mongoose = require("mongoose");

const connectDB = async () => {
  if (!process.env.DB_URL) {
    throw new Error("DB_URL is required to connect to MongoDB.");
  }
  await mongoose.connect(process.env.DB_URL);
  console.log("DB connected successfully");
};

module.exports = connectDB;
