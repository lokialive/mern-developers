import axios from 'axios'
import {
  GET_PROFILE,
  GET_PROFILES,
  PROFILE_LOADING,
  CLEAR_CURRENT_PROFILE,
  GET_ERRORS,
  SET_CURRENT_USER,
} from './types'

export const getCurrentProfile = () => (dispatch) => {
  // loading pics
  dispatch(setProfileLoading())

  // request data
  axios('/api/profiles')
    .then((res) =>
      dispatch({
        type: GET_PROFILE,
        payload: res.data,
      }),
    )
    .catch((err) =>
      dispatch({
        type: GET_PROFILE,
        payload: {},
      }),
    )
}

//Create profile post data
export const createProfile = (profileData, history) => (dispatch) => {
  axios
    .post(
      'https://developers-backend-mern.herokuapp.com/api/profiles',
      profileData,
    )
    .then((res) => history.push('/dashboard'))
    .catch((err) =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      }),
    )
}

//delete current account
export const deleteAccount = () => (dispatch) => {
  axios
    .delete('https://developers-backend-mern.herokuapp.com/api/profiles')
    .then((res) =>
      dispatch({
        type: SET_CURRENT_USER,
        payload: {},
      }),
    )
    .catch((err) =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      }),
    )
}

// add experience action
export const addExperience = (data, history) => (dispatch) => {
  axios
    .post(
      'https://developers-backend-mern.herokuapp.com/api/profiles/experience',
      data,
    )
    .then((res) => history.push('/dashboard'))
    .catch((err) =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      }),
    )
}

// delete experience
export const deleteExperience = (id, history) => (dispatch) => {
  axios
    .delete(
      `https://developers-backend-mern.herokuapp.com/api/profiles/experience?id=${id}`,
    )
    .then((res) => window.location.reload())
    .catch((err) =>
      dispatch({
        type: GET_ERRORS,
        payload: { errors: err },
      }),
    )
}

//add education
export const addEducation = (expData, history) => (dispatch) => {
  axios
    .post(
      'https://developers-backend-mern.herokuapp.com/api/profiles/education',
      expData,
    )
    .then((res) => history.push('/dashboard'))
    .catch((err) =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      }),
    )
}

// delete education
export const deleteEducation = (id, history) => (dispatch) => {
  axios
    .delete(
      `https://developers-backend-mern.herokuapp.com/api/profiles/education?edu_id=${id}`,
    )
    .then((res) => window.location.reload())
    .catch((err) =>
      dispatch({
        type: GET_ERRORS,
        payload: { errors: err },
      }),
    )
}

// Get all profiles
export const getProfiles = () => (dispatch) => {
  dispatch(setProfileLoading())

  axios
    .get('https://developers-backend-mern.herokuapp.com/api/profiles/all')
    .then((res) =>
      dispatch({
        type: GET_PROFILES,
        payload: res.data,
      }),
    )
    .catch((err) =>
      dispatch({
        type: GET_PROFILES,
        payload: null,
      }),
    )
}

export const getProfileByHandle = (handle) => (dispatch) => {
  dispatch(setProfileLoading())
  axios(
    `https://developers-backend-mern.herokuapp.com/api/profiles/handle?handle=${handle}`,
  )
    .then((res) =>
      dispatch({
        type: GET_PROFILE,
        payload: res.data,
      }),
    )
    .catch((err) =>
      dispatch({
        type: GET_PROFILE,
        payload: null,
      }),
    )
}

export const setProfileLoading = () => {
  return {
    type: PROFILE_LOADING,
  }
}

export const clearCurrentProfile = () => {
  return {
    type: CLEAR_CURRENT_PROFILE,
  }
}
