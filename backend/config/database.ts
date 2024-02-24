const mongoose = require("mongoose");
require("dotenv").config();

const connect = () => {
  console.log("Connected to MongoDB");
  return mongoose.connect(process.env.MONGODB_URL);
};

module.exports = connect;
