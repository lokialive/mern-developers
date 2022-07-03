const Router = require('koa-router')
const router = new Router()
const passport = require('koa-passport')
const Post = require('../../models/Post')
const Profile = require('../../models/Profile')
const validatePostInput = require('../../validation/post')
const validateCommentInput = require('../../validation/comment')
/**
 * @route GET api/posts/test
 * @description test post api address
 * @access public port
 */
router.get('/test', async (ctx) => {
  ctx.status = 200
  ctx.body = {
    msg: 'posts works...',
  }
})

/**
 * @route POST api/posts
 * @description create post api address
 * @access private port
 */
router.post(
  '/',
  passport.authenticate('jwt', { session: false }),
  async (ctx) => {
    //check validation
    const { errors, isValid } = validatePostInput(ctx.request.body)
    if (!isValid) {
      ctx.status = 400
      ctx.body = errors
      return
    }
    const newPost = new Post({
      text: ctx.request.body.text,
      name: ctx.state.user.name,
      avatar: ctx.state.user.avatar,
      user: ctx.state.user.id,
    })
    //save new post
    await newPost
      .save()
      .then((post) => (ctx.body = post))
      .catch((err) => {
        ctx.body = err
      })

    ctx.body = newPost
  },
)

/**
 * @route GET api/posts/all
 * @description get all posts api address
 * @access public port
 */
router.get('/all', async (ctx) => {
  await Post.find()
    .sort({ date: -1 })
    .then((posts) => {
      ctx.status = 200
      ctx.body = posts
    })
    .catch((err) => {
      ctx.status = 400
      ctx.body = { nopostfound: 'Cannot found posts record!' }
    })
})

/**
 * @route GET api/posts?id=***
 * @description get post by id api address
 * @access public port
 */
router.get('/', async (ctx) => {
  const id = ctx.query.id
  await Post.findById(id)
    .then((post) => {
      ctx.status = 200
      ctx.body = post
    })
    .catch((err) => {
      ctx.status = 400
      ctx.body = { nopostfound: 'No post record can be found!' }
    })
})

/**
 * @route DELETE api/posts?id=***
 * @description delete post api address
 * @access private port
 */
router.delete(
  '/',
  passport.authenticate('jwt', { session: false }),
  async (ctx) => {
    const id = ctx.query.id
    // check whether this user has profile
    const profile = await Profile.find({ user: ctx.state.user.id })
    if (profile.length > 0) {
      //find the user's post
      const post = await Post.findById(id)
      // check authentication: whether this post is belong to this user
      if (post.user.toString() !== ctx.state.user.id) {
        ctx.status = 401
        ctx.body = { noauthorized: 'User has no authentication' }
        return
      }
      //Delete the post
      await Post.remove({ _id: id }).then(() => {
        ctx.status = 200
        ctx.body = { success: true }
      })
    } else {
      ctx.status = 404
      ctx.body = { error: 'Cannot find the profile!' }
    }
  },
)

/**
 * @route POST api/posts/like?id=***
 * @description create like api address
 * @access private port
 */
router.post(
  '/like',
  passport.authenticate('jwt', { session: false }),
  async (ctx) => {
    const id = ctx.query.id
    //check whether the user has profile
    const profile = await Profile.find({ user: ctx.state.user.id })
    if (profile.length > 0) {
      const post = await Post.findById(id)
      //Check
      const isLike =
        post.likes.filter((like) => like.user.toString() === ctx.state.user.id)
          .length > 0
      if (isLike) {
        ctx.status = 400
        ctx.body = { alredyliked: 'The user has been liked this post!' }
        return
      }
      //Add this user to the likes of this post
      post.likes.unshift({ user: ctx.state.user.id })
      const postUpdate = await Post.findOneAndUpdate(
        { _id: id },
        { $set: post },
        { new: true },
      )
      ctx.body = postUpdate
    } else {
      ctx.status = 404
      ctx.body = { error: 'The user has no profile!' }
    }
  },
)

/**
 * @route POST api/posts/unlike?id=***
 * @description delete a like api address
 * @access private port
 */
router.post(
  '/unlike',
  passport.authenticate('jwt', { session: false }),
  async (ctx) => {
    const id = ctx.query.id
    //check whether the user has profile
    const profile = await Profile.find({ user: ctx.state.user.id })
    if (profile.length > 0) {
      const post = await Post.findById(id)
      //Check
      const isLike =
        post.likes.filter((like) => like.user.toString() === ctx.state.user.id)
          .length > 0
      if (!isLike) {
        ctx.status = 400
        ctx.body = { notliked: 'The user has not liked this post!' }
        return
      }
      //delete this user from the likes of this post
      const removeIndex = post.likes
        .map((item) => item.user.toString())
        .indexOf(ctx.state.user.id)
      post.likes.splice(removeIndex, 1)

      const postUpdate = await Post.findOneAndUpdate(
        { _id: id },
        { $set: post },
        { new: true },
      )
      ctx.body = postUpdate
    } else {
      ctx.status = 404
      ctx.body = { error: 'The user has no profile!' }
    }
  },
)

/**
 * @route POST api/posts/comment?id=***
 * @description create a comment api address
 * @access private port
 */
router.post(
  '/comment',
  passport.authenticate('jwt', { session: false }),
  async (ctx) => {
    //check validation
    const { errors, isValid } = validateCommentInput(ctx.request.body)
    if (!isValid) {
      ctx.status = 400
      ctx.body = errors
      return
    }

    const id = ctx.query.id
    const post = await Post.findById(id)
    // Create new comment
    const newComment = {
      text: ctx.request.body.text,
      name: ctx.state.user.name,
      avatar: ctx.state.user.avatar,
      user: ctx.state.user.id,
    }
    //Add the newCommnet to post.comment
    post.comments.unshift(newComment)
    const postUpdate = await Post.findOneAndUpdate(
      { _id: id },
      { $set: post },
      { new: true },
    )
    ctx.body = postUpdate
  },
)

/**
 * @route DELETE api/posts/comment?id=***&comment_id=***
 * @description delete a comment api address
 * @access private port
 */
router.delete(
  '/comment',
  passport.authenticate('jwt', { session: false }),
  async (ctx) => {
    const post_id = ctx.query.id
    const comment_id = ctx.query.comment_id
    const post = await Post.findById(post_id)
    // Check whether this comment exist by comment_id
    const isCommentExist =
      post.comments.filter((comment) => comment._id.toString() === comment_id)
        .length > 0
    if (!isCommentExist) {
      ctx.status = 400
      ctx.body = { commentnotexist: 'Cannot find this comment!' }
    }

    //Get the comment
    const removeIndex = post.comments
      .map((item) => item._id.toString())
      .indexOf(comment_id)
    //Check the user authorization
    const isAuthorized =
      post.comments.filter(
        (comment) => comment.user.toString() === ctx.state.user.id,
      ).length > 0
    if (!isAuthorized) {
      ctx.status = 400
      ctx.body = { noauthorized: 'The user does not have authorization' }
      return
    }
    //delete the comment
    post.comments.splice(removeIndex, 1)
    const postUpdate = await Post.findOneAndUpdate(
      { _id: post_id },
      { $set: post },
      { new: true },
    )
    ctx.body = postUpdate
  },
)

module.exports = router.routes()
