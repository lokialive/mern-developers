const Router = require('koa-router')
const router = new Router()

const passport = require('koa-passport')
const Profile = require('../../models/Profile')
const User = require('../../models/User')

// import validation
const validateProfileInput = require('../../validation/profile')
const validateExperienceInput = require('../../validation/experience')
const validateEducationInput = require('../../validation/education')
const profile = require('../../validation/profile')

/**
 * @route GET api/profiles/test
 * @description test api address
 * @access public port
 */
router.get('/test', async (ctx) => {
  ctx.status = 200
  ctx.body = {
    msg: 'profiles works...',
  }
})

/**
 * @route GET api/profiles
 * @description personal profile API
 * @access private port
 */
router.get(
  '/',
  passport.authenticate('jwt', { session: false }),
  async (ctx) => {
    //console.log(ctx.state.user)
    // Find name and avatar in user by id
    const profile = await Profile.find({
      user: ctx.state.user.id,
    }).populate('user', ['name', 'avatar'])
    if (profile.length > 0) {
      ctx.status = 200
      ctx.body = profile
    } else {
      ctx.status = 404
      ctx.body = { noprofile: 'This user has no related profile!' }
      return
    }
  },
)

/**
 * @route POST api/profiles
 * @description add and edit personal profile API
 * @access private port
 */
router.post(
  '/',
  passport.authenticate('jwt', { session: false }),
  async (ctx) => {
    //check input validation
    const { errors, isValid } = validateProfileInput(ctx.request.body)
    if (!isValid) {
      ctx.status = 400
      ctx.body = errors
      return
    }

    const profileFields = {}

    profileFields.user = ctx.state.user.id
    if (ctx.request.body.handle) {
      profileFields.handle = ctx.request.body.handle
    }
    if (ctx.request.body.company) {
      profileFields.company = ctx.request.body.company
    }
    if (ctx.request.body.website) {
      profileFields.website = ctx.request.body.website
    }
    if (ctx.request.body.location) {
      profileFields.location = ctx.request.body.location
    }
    if (ctx.request.body.status) {
      profileFields.status = ctx.request.body.status
    }

    //skills: transfer to array(front end: String)
    if (typeof ctx.request.body.skills !== undefined) {
      profileFields.skills = ctx.request.body.skills.split(',')
    }

    if (ctx.request.body.bio) {
      profileFields.bio = ctx.request.body.bio
    }
    if (ctx.request.body.github) {
      profileFields.github = ctx.request.body.github
    }
    //social part
    profileFields.social = {}
    if (ctx.request.body.wechat) {
      profileFields.social.wechat = ctx.request.body.wechat
    }
    if (ctx.request.body.twitter) {
      profileFields.social.twitter = ctx.request.body.twitter
    }
    if (ctx.request.body.facebook) {
      profileFields.social.facebook = ctx.request.body.facebook
    }
    if (ctx.request.body.instagram) {
      profileFields.social.instagram = ctx.request.body.instagram
    }

    //check database
    const profile = await Profile.find({ user: ctx.state.user.id })
    if (profile.length > 0) {
      // Update / edit teh information
      const profileUpdate = await Profile.findOneAndUpdate(
        { user: ctx.state.user.id },
        { $set: profileFields },
        { new: true },
      )
      ctx.body = profileUpdate
    } else {
      //Add the information
      await new Profile(profileFields).save().then((profile) => {
        ctx.status = 200
        ctx.body = profile
      })
    }
  },
)

/**
 * @route GET api/profiles/handle?handle=test
 * @description get profile through "handle"
 * @access public port
 */
router.get('/handle', async (ctx) => {
  const handle = ctx.query.handle
  const profile = await Profile.find({ handle: handle }).populate('user', [
    'name',
    'avatar',
  ])

  const errors = {}
  // check if find:
  if (profile.length < 1) {
    errors.profile = 'Cannot find the user profile'
    ctx.status = 404
    ctx.body = errors
  } else {
    ctx.body = profile[0]
  }
})

// $route  GET api/profiles/handle/:handle
// @desc   get profile through handle
// @access public
router.get('/handle/:handle', (req, res) => {
  const errors = {}
  Profile.findOne({ handle: req.params.handle })
    .populate('user', ['name', 'avatar'])
    .then((profile) => {
      if (!profile) {
        errors.noprofile = 'Cannot find the user'
        res.status(404).json(errors)
      }

      res.json(profile)
    })
    .catch((err) => res.status(404).json(err))
})

/**
 * @route GET api/profiles/user?user_id=***
 * @description get profile through "user_id"
 * @access public port
 */
router.get('/user', async (ctx) => {
  const user_id = ctx.query.user_id
  const profile = await Profile.find({ user: user_id }).populate('user', [
    'name',
    'avatar',
  ])

  const errors = {}
  // check if find:
  if (profile.length < 1) {
    errors.profile = 'Cannot find the user profile'
    ctx.status = 404
    ctx.body = errors
  } else {
    ctx.body = profile[0]
  }
})

/**
 * @route GET api/profiles/all
 * @description get all users' profile
 * @access public port
 */
router.get('/all', async (ctx) => {
  const profiles = await Profile.find().populate('user', ['name', 'avatar'])

  const errors = {}
  // check if find:
  if (profiles.length < 1) {
    errors.profile = 'No user profile!'
    ctx.status = 404
    ctx.body = errors
  } else {
    ctx.body = profiles
  }
})

/**
 * @route POST api/profiles/experience
 * @description add experience API address
 * @access private port
 */
router.post(
  '/experience',
  passport.authenticate('jwt', { session: false }),
  async (ctx) => {
    // check input validation
    const { errors, isValid } = validateExperienceInput(ctx.request.body)
    if (!isValid) {
      ctx.status = 400
      ctx.body = errors
      return
    }

    const profileFields = {}
    profileFields.experience = []
    // check current user's profile
    const profile = await Profile.find({ user: ctx.state.user.id })
    if (profile.length > 0) {
      // profile exist
      const newExp = {
        title: ctx.request.body.title,
        current: ctx.request.body.current,
        company: ctx.request.body.company,
        location: ctx.request.body.location,
        from: ctx.request.body.from,
        to: ctx.request.body.to,
        description: ctx.request.body.description,
      }

      profileFields.experience.unshift(newExp)
      //Update the profile
      const profileUpdate = await Profile.updateOne(
        { user: ctx.state.user.id },
        { $push: { experience: profileFields.experience } },
        { $sort: 1 },
      )
      console.log(profileUpdate)
      if (profileUpdate.acknowledged == true) {
        const profile = await Profile.find({
          user: ctx.state.user.id,
        }).populate('user', ['name', 'avatar'])
        if (profile) {
          ctx.body = profile
          ctx.status = 200
        }
      }
    } else {
      errors.noprofile = "Cannot find the user's profile!"
      ctx.status = 404
      ctx.body = errors
    }
  },
)

/**
 * @route POST api/profiles/education
 * @description add education API address
 * @access private port
 */
router.post(
  '/education',
  passport.authenticate('jwt', { session: false }),
  async (ctx) => {
    // check input validation
    const { errors, isValid } = validateEducationInput(ctx.request.body)
    if (!isValid) {
      ctx.status = 400
      ctx.body = errors
      return
    }

    const profileFields = {}
    profileFields.education = []
    // check current user's profile
    const profile = await Profile.find({ user: ctx.state.user.id })
    if (profile.length > 0) {
      // profile exist
      const newEdu = {
        school: ctx.request.body.school,
        current: ctx.request.body.current,
        degree: ctx.request.body.degree,
        filedOfStudy: ctx.request.body.filedOfStudy,
        from: ctx.request.body.from,
        to: ctx.request.body.to,
        description: ctx.request.body.description,
      }
      profileFields.education.unshift(newEdu)
      //Update the profile
      const profileUpdate = await Profile.updateOne(
        { user: ctx.state.user.id },
        { $push: { education: profileFields.education } },
        { $sort: 1 },
      )
      console.log(profileUpdate)
      if (profileUpdate.acknowledged == true) {
        const profile = await Profile.find({
          user: ctx.state.user.id,
        }).populate('user', ['name', 'avatar'])
        if (profile) {
          ctx.body = profile
          ctx.status = 200
        }
      }
    } else {
      errors.noprofile = "Cannot find the user's profile!"
      ctx.status = 404
      ctx.body = errors
    }
  },
)

/**
 * @route DELETE api/profiles/experience?id=***
 * @description delete experience API address
 * @access private port
 */

router.delete(
  '/experience',
  passport.authenticate('jwt', { session: false }),
  async (ctx) => {
    // get delete id
    const id = ctx.query.id
    // check datatbase
    const profile = await Profile.find({ user: ctx.state.user.id })
    if (profile[0].experience.length > 0) {
      // find delete id
      const removeIndex = profile[0].experience
        .map((item) => item.id)
        .indexOf(id)
      //delete experience
      profile[0].experience.splice(removeIndex, 1)
      //update database
      const profileUpdate = await Profile.findOneAndUpdate(
        { user: ctx.state.user.id },
        { $set: profile[0] },
        { new: true },
      )

      ctx.body = profileUpdate
    } else {
      // no experience record
      ctx.status = 404
      ctx.body = { errors: 'No record!' }
    }
  },
)

// $route  DELETE api/profile/experience/:epx_id
// @desc  delete experience
// @access Private
// router.delete(
//   '/experience/:epx_id',
//   passport.authenticate('jwt', { session: false }),
//   (req, res) => {
//     Profile.findOne({ user: req.user.id })
//       .then((profile) => {
//         const removeIndex = profile.experience
//           .map((item) => item.id)
//           .indexOf(req.params.epx_id)

//         profile.experience.splice(removeIndex, 1)

//         profile.save().then((profile) => res.json(profile))
//       })
//       .catch((err) => res.status(404).json(err))
//   },
// )

/**
 * @route DELETE api/profiles/education?edu_id=***
 * @description delete education API address
 * @access private port
 */

router.delete(
  '/education',
  passport.authenticate('jwt', { session: false }),
  async (ctx) => {
    // get delete id
    const edu_id = ctx.query.edu_id
    // check datatbase
    const profile = await Profile.find({ user: ctx.state.user.id })
    if (profile[0].education.length > 0) {
      // find delete id
      const removeIndex = profile[0].education
        .map((item) => item.id)
        .indexOf(edu_id)
      //delete experience
      profile[0].education.splice(removeIndex, 1)
      //update database
      const profileUpdate = await Profile.findOneAndUpdate(
        { user: ctx.state.user.id },
        { $set: profile[0] },
        { new: true },
      )

      ctx.body = profileUpdate
    } else {
      // no experience record
      ctx.status = 404
      ctx.body = { errors: 'No record!' }
    }
  },
)

/**
 * @route DELETE api/profiles/
 * @description delete whole user API address
 * @access private port
 */
router.delete(
  '/',
  passport.authenticate('jwt', { session: false }),
  async (ctx) => {
    // check exist data
    const profile = await Profile.deleteOne({ user: ctx.state.user.id })
    if (profile.acknowledged == true) {
      const user = await User.deleteOne({ _id: ctx.state.user.id })
      if (user.acknowledged == true) {
        ctx.status = 200
        ctx.body = { success: true }
      }
    } else {
      ctx.status = 404
      ctx.body = { error: 'Profile not exist!' }
    }
  },
)

module.exports = router.routes()
