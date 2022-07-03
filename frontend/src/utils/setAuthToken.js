import axios from 'axios'

const setAuthToken = (token) => {
  if (token) {
    // header, every request needs
    axios.defaults.headers.common['Authorization'] = token
  } else {
    delete axios.defaults.headers.common['Authorization']
  }
}

export default setAuthToken
