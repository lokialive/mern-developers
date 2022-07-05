import axios from 'axios'

import {
  DELETE_POST,
  GET_ERRORS,
  GET_POSTS,
  GET_POST,
  POST_LOADING,
} from './types'

// Add post
export const addPost = (postdata) => (dispatch) => {
  axios
    .post('https://developers-backend-mern.herokuapp.com/api/posts', postdata)
    .then((res) => {
      window.location.reload()
    })
    .catch((err) =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      }),
    )
}

export const getPosts = () => (dispatch) => {
  dispatch(setPostLoading)
  axios
    .get('https://developers-backend-mern.herokuapp.com/api/posts/all')
    .then((res) =>
      dispatch({
        type: GET_POSTS,
        payload: res.data,
      }),
    )
    .catch((err) =>
      dispatch({
        type: GET_POSTS,
        payload: null,
      }),
    )
}

// get one post
export const getPost = (id) => (dispatch) => {
  dispatch(setPostLoading)
  axios
    .get(`https://developers-backend-mern.herokuapp.com/api/posts?id=${id}`)
    .then((res) =>
      dispatch({
        type: GET_POST,
        payload: res.data,
      }),
    )
    .catch((err) =>
      dispatch({
        type: GET_POST,
        payload: null,
      }),
    )
}

// delete a post
export const deletePost = (id) => (dispatch) => {
  axios
    .delete(`https://developers-backend-mern.herokuapp.com/api/posts?id=${id}`)
    .then((res) =>
      dispatch({
        type: DELETE_POST,
        payload: id,
      }),
    )
    .catch((err) =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      }),
    )
}

// like a post
export const addLike = (id) => (dispatch) => {
  axios
    .post(
      `https://developers-backend-mern.herokuapp.com/api/posts/like?id=${id}`,
    )
    .then((res) => window.location.reload())
    .catch((err) =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      }),
    )
}

// unlike a post
export const removeLike = (id) => (dispatch) => {
  axios
    .post(
      `https://developers-backend-mern.herokuapp.com/api/posts/unlike?id=${id}`,
    )
    .then((res) => window.location.reload())
    .catch((err) =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      }),
    )
}

// add comment
export const addComment = (postId, commentData) => (dispatch) => {
  axios
    .post(
      `https://developers-backend-mern.herokuapp.com/api/posts/comment?id=${postId}`,
      commentData,
    )
    .then((res) => window.location.reload())
    .catch((err) =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      }),
    )
}

// delete comment
export const deleteComment = (postId, commentId) => (dispatch) => {
  axios
    .delete(
      `https://developers-backend-mern.herokuapp.com/api/posts/comment?id=${postId}&comment_id=${commentId}`,
    )
    .then((res) =>
      dispatch({
        type: GET_POST,
        payload: res.data,
      }),
    )
    .catch((err) =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      }),
    )
}

// loading
export const setPostLoading = () => {
  return {
    type: POST_LOADING,
  }
}
