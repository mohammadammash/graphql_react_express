const mongoose = require("mongoose");
mongoose.set("strictQuery", true);

const connectDB = () => {
  try {
    const conn = mongoose.connect(process.env.MONGODB_URL);

    console.log("==========================================");
    console.log(`MongoDB connected Successfully...`);
    console.log("==========================================");
  } catch (e) {
    console.log("==========================================");
    console.log(`MongoDB connection Failed...`);
    console.log(e.message);
    console.log("==========================================");
  }
};

module.exports = connectDB;
