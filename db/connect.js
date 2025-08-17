const mongoose = require("mongoose");

const connectDB = (uri) => {
  return mongoose.connect(uri); // no need for extra options in new versions
};

module.exports = connectDB;
