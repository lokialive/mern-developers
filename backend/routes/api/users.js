const Router = require('koa-router')
const router = new Router()
const gravatar = require('gravatar')
const tools = require('../../config/tools')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
//reference user model
const User = require('../../models/User')
const keys = require('../../config/keys')
const passport = require('koa-passport')

// import input validation
const validateRegisterInput = require('../../validation/register')
const validateLoginInput = require('../../validation/login')

/**
 * @route GET api/users/test
 * @description test api address
 * @access public port
 */
router.get('/test', async (ctx) => {
  ctx.status = 200
  ctx.body = {
    msg: 'users works...',
  }
})

/**
 * @route POST api/users/register
 * @description register api address
 * @access public port
 */
router.post('/register', async (ctx) => {
  //check input validation
  const { errors, isValid } = validateRegisterInput(ctx.request.body)
  if (!isValid) {
    ctx.status = 400
    ctx.body = errors
    return
  }

  // Save the info to database
  // 1.check exist
  const findResult = await User.find({ email: ctx.request.body.email })
  //   console.log(findResult)

  if (findResult.length > 0) {
    ctx.status = 500
    ctx.body = { email: 'The email has been used!' }
  } else {
    //if not exist in database: create new model with the info

    const avatar = gravatar.url(ctx.request.body.email, {
      s: '200',
      r: 'pg',
      d: 'mm',
    })

    const newUser = new User({
      name: ctx.request.body.name,
      email: ctx.request.body.email,
      avatar,
      // Change password to secret
      password: tools.enbcrypt(ctx.request.body.password),
    })

    // save to database
    await newUser
      .save()
      .then((user) => {
        ctx.body = user
      })
      .catch((err) => {
        console.log(err)
      })
  }
})

/**
 * @route POST api/users/login
 * @description login API address, return token
 * @access public port
 */

router.post('/login', async (ctx) => {
  //check input validation
  const { errors, isValid } = validateLoginInput(ctx.request.body)
  if (!isValid) {
    ctx.status = 400
    ctx.body = errors
    return
  }

  // find whether the email is exist
  const findResult = await User.find({ email: ctx.request.body.email })
  const inputPassword = ctx.request.body.password
  //Decide
  if (findResult.length == 0) {
    ctx.status = 404
    ctx.body = {
      email: 'User not exists',
    }
  } else {
    const user = findResult[0]
    //check the password:
    var result = await bcrypt.compareSync(inputPassword, user.password)
    if (result) {
      //return token
      const payload = { id: user.id, name: user.name, avatar: user.avatar }
      const token = jwt.sign(payload, keys.secretKey, { expiresIn: 3600 })

      ctx.status = 200
      ctx.body = { success: true, token: 'Bearer ' + token }
      //return token
    } else {
      ctx.status = 400
      ctx.body = { password: 'Password is not correct!' }
    }
  }
})

/**
 * @routes GET api/users/current
 * @description user information API address, return user information
 * @access private port
 */
router.get(
  '/current',
  passport.authenticate('jwt', { session: false }),
  async (ctx) => {
    ctx.body = {
      id: ctx.state.user.id,
      name: ctx.state.user.name,
      email: ctx.state.user.email,
      avatar: ctx.state.user.avatar,
    }
  },
)

module.exports = router.routes()
