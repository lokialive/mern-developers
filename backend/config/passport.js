const JwtStrategy = require('passport-jwt').Strategy
const ExtractJwt = require('passport-jwt').ExtractJwt
const keys = require('../config/keys')
const opts = {}
//get token
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken()
opts.secretOrKey = keys.secretKey
//get user model
const mongoose = require('mongoose')
const User = mongoose.model('users')

module.exports = (passport) => {
  // console.log(passport)
  passport.use(
    new JwtStrategy(opts, async (jwt_payload, done) => {
      const user = await User.findById(jwt_payload.id)
      if (user) {
        return done(null, user)
      } else {
        return done(null, false)
      }
    }),
  )
}
