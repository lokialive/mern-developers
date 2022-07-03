import './App.css'

import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import setAuthToken from './utils/setAuthToken'
import jwt_decode from 'jwt-decode'
import { logoutUser, setCurrentUser } from './actions/authActions'
import PrivateRoute from './common/PrivateRoute'
import Footer from './components/layout/Footer'
import Landing from './components/layout/Landing'
import Navbar from './components/layout/Navbar'
import Dashboard from './components/dashboard/Dashboard'
import Login from './components/auth/Login_1'
import Register from './components/auth/Register'
import CreateProfile from './components/createProfile/CreateProfile'
import EditProfile from './components/editProfile/EditProfile'
import AddExperience from './components/addCredentials/AddExperience'
import AddEducation from './components/addCredentials/AddEducation'
import ActionSuccess from './components/dashboard/ActionSuccess'
import Profiles from './components/profiles/Profiles'
import Profile from './components/profile/Profile'
import Posts from './components/posts/Posts'
import Post from './components/post/Post'

// redux setup
// import { legacy_createStore as createStore, applyMiddleware } from 'redux'
// Provider is used outside the root App. In this way, all modules of App can reach the state
import { Provider } from 'react-redux'
import store from './store'

//check and keep token while refreshing
if (localStorage.jwtToken) {
  setAuthToken(localStorage.jwtToken)

  //decode token
  const decoded = jwt_decode(localStorage.jwtToken)
  // dispatch too reducer
  store.dispatch(setCurrentUser(decoded))

  //check whether expired
  //get current time
  const currentTime = Date.now() / 1000
  //whether expired
  if (decoded.exp < currentTime) {
    store.dispatch(logoutUser())

    // tode: delete user

    // view jump
    window.location.href = '/login'
  }
}

const backup = console.warn

console.warn = function filterWarnings(warning) {
  // If the warning includes any of the following text, let's hide it.
  const supressedWarnings = [
    'Warning: componentWillMount has been renamed, and is not recommended for use.',
    'Warning: componentWillReceiveProps has been renamed, and is not recommended for use.',
    'Warning: componentWillUpdate has been renamed, and is not recommended for use.',
  ]

  if (
    warning.length &&
    !supressedWarnings.some((entry) => warning.includes(entry))
  ) {
    backup.apply(console, arguments)
  }
}

function App() {
  return (
    <Router>
      <Provider store={store}>
        <div className="App">
          <Navbar />
          <Route exact path="/" component={Landing} />
          <div className="contaier">
            <Route exact path="/register" component={Register} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/profiles" component={Profiles} />
            <Route path="/profiles/:handle" component={Profile} />
            <Switch>
              <PrivateRoute exact path="/dashboard" component={Dashboard} />
            </Switch>

            <Switch>
              <PrivateRoute
                exact
                path="/createProfile"
                component={CreateProfile}
              />
            </Switch>
            <Switch>
              <PrivateRoute exact path="/editProfile" component={EditProfile} />
            </Switch>

            <Switch>
              <PrivateRoute
                exact
                path="/addExperience"
                component={AddExperience}
              />
            </Switch>

            <Switch>
              <PrivateRoute
                exact
                path="/addEducation"
                component={AddEducation}
              />
            </Switch>

            <Switch>
              <PrivateRoute
                exact
                path="/actionSuccess"
                component={ActionSuccess}
              />
            </Switch>

            <Switch>
              <PrivateRoute exact path="/feed" component={Posts} />
            </Switch>

            <Switch>
              <PrivateRoute path="/posts/:id" component={Post} />
            </Switch>
          </div>
          <Footer />
        </div>
      </Provider>
    </Router>
  )
}
export default App
