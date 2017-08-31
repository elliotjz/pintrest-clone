const mongoose = require('mongoose')

// define the User model schema
const UserSchema = new mongoose.Schema({
  id: String,
  name: String,
  pins: Array
})

module.exports = mongoose.model('User', UserSchema)


