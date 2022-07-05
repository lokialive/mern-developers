/**
 * userData: data created by user, which has been submitted
 */
import axios from 'axios'
import { GET_ERRORS, SET_CURRENT_USER } from './types'
import setAuthToken from '../utils/setAuthToken'
import jwt_decode from 'jwt-decode'

export const registerUser = (userData, history) => (dispatch) => {
  //Give to reducer
  // return {
  //   type: TEST_DISPATCH,
  //   payload: userdata,
  // }

  //request by axios:
  axios
    .post(
      'https://developers-backend-mern.herokuapp.com/api/users/register',
      userData,
    )
    .then((res) => history.push('/login'))
    .catch((err) =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      }),
    )
}

// Login part
export const loginUser = (userData) => (dispatch) => {
  axios
    .post(
      'https://developers-backend-mern.herokuapp.com/api/users/login',
      userData,
    )
    .then((res) => {
      const { token } = res.data
      // // save token to LS
      localStorage.setItem('jwtToken', token)
      // // set up axios headers token
      setAuthToken(token)

      // decode token
      const decoded = jwt_decode(token)
      // console.log(decoded)

      // give user information to reducer
      dispatch(setCurrentUser(decoded))
    })
    .catch((err) =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      }),
    )
}

export const setCurrentUser = (decoded) => {
  return {
    type: SET_CURRENT_USER,
    payload: decoded,
  }
}

//logout action
export const logoutUser = () => (dispath) => {
  //delete local storage
  localStorage.removeItem('jwtToken')
  //delete request header
  setAuthToken(false)

  //dispatch to reducer, return a null user
  dispath(setCurrentUser({}))
}
