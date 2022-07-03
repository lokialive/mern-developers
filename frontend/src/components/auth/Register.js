import React, { Component } from 'react'
//import axios from 'axios'
// Used to generate container components from UI components, connecting the two components
import { connect } from 'react-redux'
import { registerUser } from '../../actions/authActions'
import PropTypes from 'prop-types'

import TextFieldGroup from '../../common/TextFieldGroup'

import { withRouter } from 'react-router-dom'

class Register extends Component {
  //Initialize the state
  constructor() {
    super()
    this.state = {
      name: '',
      email: '',
      password: '',
      password2: '',
      errors: {},
    }

    //bind this
    this.onChange = this.onChange.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
  }
  // Function onChange: setState
  onChange(e) {
    this.setState({ [e.target.name]: e.target.value })
  }

  onSubmit(e) {
    e.preventDefault()
    const newUser = {
      name: this.state.name,
      email: this.state.email,
      password: this.state.password,
      password2: this.state.password2,
    }
    // request by axios:
    // axios
    //   .post('api/users/register', newUser)
    //   .then((res) => console.log(res.data))
    //   .catch((err) => {
    //     this.setState({ errors: err.response.data })
    //   })

    /**
     * request through redux
     */
    this.props.registerUser(newUser, this.props.history)
  }

  //if authenticated, jump from register/login to dashboard
  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push('/dashboard')
    }
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors })
    }
  }

  // static getDerivedStateFromProps(props, state) {
  //   if (props.errors) {
  //     return { errors: props.errors }
  //   }
  //   return null
  // }

  render() {
    const { errors } = this.state
    //const { user } = this.props.auth

    return (
      <div className="register">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <h1 className="display-4 text-center">Register</h1>
              <p className="lead text-center">Create new account</p>
              <form onSubmit={this.onSubmit}>
                <TextFieldGroup
                  type="text"
                  placeholder="username"
                  name="name"
                  value={this.state.name}
                  onChange={this.onChange}
                  error={errors.name}
                />
                {/* <div className="form-group">
                  <input
                    type="text"
                    className={classnames('form-control form-control-lg', {
                      'is-invalid': errors.name,
                    })}
                    //className="form-control form-control-lg"
                    placeholder="username"
                    name="name"
                    value={this.state.name}
                    onChange={this.onChange}
                  />
                  {errors.name && (
                    <div className="invalid-feedback">{errors.name}</div>
                  )}
                </div> */}
                <TextFieldGroup
                  type="email"
                  placeholder="email address"
                  name="email"
                  value={this.state.email}
                  onChange={this.onChange}
                  error={errors.email}
                  info="We use gravatar globally recognized avatars. If you need to
                    have an avatar displayed, Please use the email address
                    registered with gravatar"
                />
                {/* <div className="form-group">
                  <input
                    type="email"
                    className={classnames('form-control form-control-lg', {
                      'is-invalid': errors.email,
                    })}
                    //className="form-control form-control-lg"
                    placeholder="email address"
                    name="email"
                    value={this.state.email}
                    onChange={this.onChange}
                  />
                  {errors.email && (
                    <div className="invalid-feedback">{errors.email}</div>
                  )}

                  <small className="form-text text-muted">
                    We use gravatar globally recognized avatars. If you need to
                    have an avatar displayed, Please use the email address
                    registered with gravatar
                  </small>
                </div> */}
                <TextFieldGroup
                  type="password"
                  placeholder="password"
                  name="password"
                  value={this.state.password}
                  onChange={this.onChange}
                  error={errors.password}
                />
                {/* <div className="form-group">
                  <input
                    type="password"
                    className={classnames('form-control form-control-lg', {
                      'is-invalid': errors.password,
                    })}
                    //className="form-control form-control-lg"
                    placeholder="password"
                    name="password"
                    value={this.state.password}
                    onChange={this.onChange}
                  />
                  {errors.password && (
                    <div className="invalid-feedback">{errors.password}</div>
                  )}
                </div> */}
                <TextFieldGroup
                  type="password"
                  placeholder="confirm password"
                  name="password2"
                  value={this.state.password2}
                  onChange={this.onChange}
                  error={errors.password2}
                />
                {/* <div className="form-group">
                  <input
                    type="password"
                    className={classnames('form-control form-control-lg', {
                      'is-invalid': errors.password2,
                    })}
                    //className="form-control form-control-lg"
                    placeholder="confirm password"
                    name="password2"
                    value={this.state.password2}
                    onChange={this.onChange}
                  />
                  {errors.password2 && (
                    <div className="invalid-feedback">{errors.password2}</div>
                  )}
                </div> */}
                <input
                  type="submit"
                  className="bg-gradient-theme-left border-0 btn btn-secondary btn-lg  btn-info btn-block mt-4"
                />{' '}
              </form>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

Register.propTypes = {
  registerUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
}

// Transfer state to props:
// state.auth is name of authreducer
const mapStateToProps = (state) => ({
  auth: state.auth,
  errors: state.errors,
})

//export default Register
export default connect(mapStateToProps, { registerUser })(withRouter(Register))
