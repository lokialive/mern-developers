const mongoose = require('mongoose')
const Schema = mongoose.Schema

// instantiate User model
const UserSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  avatar: {
    type: String,
    required: false,
  },
  date: {
    type: Date,
    default: Date.now,
    required: false,
  },
})

const User = mongoose.model('users', UserSchema)

module.exports = User
