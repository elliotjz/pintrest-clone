const mongoose = require("mongoose");

// Pin model schema
const pinSchema = new mongoose.Schema({
  userId: String,
  userImg: String,
  url: String,
  description: String,
  likes: Array,
  timeStamp: Date
});

module.exports = mongoose.model("Pin", pinSchema);
