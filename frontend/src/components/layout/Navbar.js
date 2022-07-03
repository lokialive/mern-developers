// rcc: react class compnent
import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { logoutUser } from '../../actions/authActions'
import PropTypes from 'prop-types'
import { clearCurrentProfile } from '../../actions/profileActions'

class Navbar extends Component {
  onLogoutClick(e) {
    e.preventDefault()
    this.props.clearCurrentProfile()
    this.props.logoutUser()
  }

  render() {
    const { isAuthenticated, user } = this.props.auth

    const guestHead = (
      <div>
        <a className="navbar-brand" href="/">
          Homepage
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#mobile-nav"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
      </div>
    )
    const authHead = (
      <div>
        <a className="navbar-brand" href="/dashboard">
          Dashboard
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#mobile-nav"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
      </div>
    )
    //check isAuthenticated and return different link
    const guestLink = (
      <ul className="navbar-nav ml-auto">
        <li className="nav-item">
          <Link className="nav-link" to="/register">
            Register
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/login">
            Login
          </Link>
        </li>
      </ul>
    )

    const authLink = (
      <ul className="navbar-nav ml-auto">
        <li className="nav-item">
          <Link className="nav-link" to="/feed">
            Post
          </Link>
        </li>

        <li className="nav-item">
          <a
            className="nav-link"
            href=""
            onClick={this.onLogoutClick.bind(this)}
          >
            <img
              style={{ width: '30px', marginRight: '5px' }}
              className="rounded-circle"
              src={user.avatar}
              alt={user.name}
            />
            {'    '}
            Logout
          </a>
        </li>
      </ul>
    )

    return (
      <div>
        <nav className="navbar navbar-expand-sm navbar-dark bg-dark mb-4">
          <div className="container">
            {isAuthenticated ? authHead : guestHead}
            <div className="collapse navbar-collapse" id="mobile-nav">
              <ul className="navbar-nav mr-auto">
                <li className="nav-item">
                  <Link className="nav-link" to="/profiles">
                    Developers
                  </Link>
                </li>
              </ul>

              {isAuthenticated ? authLink : guestLink}
            </div>
          </div>
        </nav>
      </div>
    )
  }
}

Navbar.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
}

const mapStateToProps = (state) => ({
  auth: state.auth,
})

export default connect(mapStateToProps, { logoutUser, clearCurrentProfile })(
  Navbar,
)
