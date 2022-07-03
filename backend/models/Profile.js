const mongoose = require('mongoose')
const Schema = mongoose.Schema

// instantiate the profile model
const ProfileSchema = new Schema({
  user: {
    // relate data table: profiles and users
    type: String,
    required: true,
    ref: 'users',
  },
  handle: {
    type: String,
    required: true,
    max: 40,
  },
  company: String,
  website: String,
  location: String,
  status: {
    type: String,
    required: true,
  },
  skills: {
    type: [String],
    required: true,
  },
  bio: String,
  github: String,
  experience: [
    {
      current: { type: Boolean, default: true },
      title: { type: String, required: true },
      company: { type: String, required: true },
      location: { type: String },
      from: { type: String, required: true },
      to: String,
      description: String,
    },
  ],
  education: [
    {
      current: { type: Boolean, default: true },
      school: { type: String, required: true },
      degree: { type: String, required: true },
      filedOfStudy: { type: String, required: true },
      from: { type: String, required: true },
      to: String,
      description: String,
    },
  ],
  social: {
    wechat: String,
    instagram: String,
    twitter: String,
    facebook: String,
  },
  date: { type: Date, default: Date.now },
})

module.exports = Profile = mongoose.model('profiles', ProfileSchema)
