const koa = require('koa')
const Router = require('koa-router')
const mongoose = require('mongoose')
const db = require('./config/keys').mongoURI

// instantiate koa
const app = new koa()
const router = new Router()
const bodyParser = require('koa-bodyparser')

//引入routers
const users = require('./routes/api/users')
const profiles = require('./routes/api/profiles')
const passport = require('koa-passport')
const posts = require('./routes/api/posts')

const path = require('path')

const cors = require('koa2-cors')

// Connect the database
mongoose
  .connect(db)
  .then(() => {
    console.log('Database Connected!')
  })
  .catch((err) => {
    console.log(err)
  })

app.use(cors())
// use passport module
app.use(passport.initialize())
app.use(passport.session())

//callback to config : passport.js
require('./config/passport')(passport)

app.use(bodyParser())
router.get('/', async (ctx) => {
  ctx.body = 'Hello, koa interface!'
})
//Configure router address  localhost:5000/api/users
router.use('/api/users', users)
router.use('/api/profiles', profiles)
router.use('/api/posts', posts)

//Configure router
app.use(router.routes()).use(router.allowedMethods())

// app.use((req, res, next) => {
//   // Website you wish to allow to connect
//   res.setHeader('Access-Control-Allow-Origin', '*')

//   // Request methods you wish to allow
//   res.setHeader('Access-Control-Allow-Methods', 'GET, POST, DELETE')

//   // Request headers you wish to allow
//   res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type')

//   // Pass to next layer of middleware
//   next()
// })

//-------- deployment----------

const port = process.env.PORT || 8080

app.listen(port, () => {
  console.log(`server started on ${port}`)
})
