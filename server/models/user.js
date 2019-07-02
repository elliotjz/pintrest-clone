const mongoose = require("mongoose");

// define the User model schema
const UserSchema = new mongoose.Schema({
  id: String,
  name: String,
  img: String
});

module.exports = mongoose.model("User", UserSchema);
