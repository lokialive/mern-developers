import React, { Component } from 'react'
import { loginUser } from '../../actions/authActions'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import TextFieldGroup from '../../common/TextFieldGroup'

class Login extends Component {
  constructor() {
    //super()  MUST BE
    super()
    //INITIALIZE
    this.state = {
      email: '',
      password: '',
      errors: {},
    }
    this.onChange = this.onChange.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value })
  }

  onSubmit(e) {
    e.preventDefault()
    const newUser = {
      password: this.state.password,
      email: this.state.email,
    }
    // console.log(newUser)
    this.props.loginUser(newUser)
  }

  //if authenticated, jump from register/login to dashboard
  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push('/dashboard')
    }
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    //Check whether is authenticated
    if (nextProps.auth.isAuthenticated) {
      this.props.history.push('/dashboard')
    }

    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors })
    }
  }

  render() {
    const { errors } = this.state

    return (
      <div className="login">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <h1 className="display-4 text-center">Login</h1>
              <p className="lead text-center">Use exist account to login</p>
              <form onSubmit={this.onSubmit}>
                <div className="text-center pb-4"></div>
                <div className="form-group">
                  <label htmlFor="Email">Email</label>
                  <TextFieldGroup
                    type="email"
                    placeholder="your email address"
                    name="email"
                    value={this.state.email}
                    onChange={this.onChange}
                    error={errors.email}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="Password">Password</label>
                  <TextFieldGroup
                    type="password"
                    placeholder="password"
                    name="password"
                    value={this.state.password}
                    onChange={this.onChange}
                    error={errors.password}
                  />
                </div>

                <hr />
                <input
                  type="submit"
                  className="bg-gradient-theme-left border-0 btn btn-secondary btn-lg  btn-info btn-block mt-4"
                />
              </form>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

Login.propTypes = {
  loginUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
}

const mapStateToProps = (state) => ({
  auth: state.auth,
  errors: state.errors,
})

export default connect(mapStateToProps, { loginUser })(Login)
