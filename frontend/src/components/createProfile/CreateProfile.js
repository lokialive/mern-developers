import React, { Component } from 'react'
import TextFieldGroup from '../../common/TextFieldGroup'
import TextAreaFieldGroup from '../../common/TextAreaFieldGroup'
import SelectListGroup from '../../common/SelectListGroup'
import InputGroup from '../../common/InputGroup'
import { createProfile } from '../../actions/profileActions'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'

class CreateProfile extends Component {
  constructor(props) {
    super(props)
    this.state = {
      displaySocialInputs: false,
      handle: '',
      company: '',
      website: '',
      location: '',
      status: '',
      skills: '',
      github: '',
      bio: '',
      wechat: '',
      instagram: '',
      twitter: '',
      facebook: '',
      errors: {},
    }

    this.onChange = this.onChange.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
  }

  onSubmit(e) {
    e.preventDefault()

    const profileData = {
      handle: this.state.handle,
      company: this.state.company,
      website: this.state.website,
      location: this.state.location,
      status: this.state.status,
      skills: this.state.skills,
      github: this.state.github,
      bio: this.state.bio,
      wechat: this.state.wechat,
      instagram: this.state.instagram,
      twitter: this.state.twitter,
      facebook: this.state.facebook,
    }

    console.log(profileData)
    this.props.createProfile(profileData, this.props.history)
  }
  UNSAFE_componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors })
    }
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value })
  }

  render() {
    const { errors, displaySocialInputs } = this.state

    let socialInputs

    const options = [
      {
        label: '* Please select your status',
        value: '* Please select your status',
      },
      {
        label: 'Junior Frontend Developer',
        value: 'Junior Frontend Developer',
      },
      { label: 'Junior Backend Developer', value: 'Junior Backend Developer' },
      {
        label: 'Junior Full-stack Developer',
        value: 'Junior Full-stack Developer',
      },
      {
        label: 'Senior Frontend Developer',
        value: 'Senior Frontend Developer',
      },
      { label: 'Senior Backend Developer', value: 'Senior Backend Developer' },
      {
        label: 'Senior Full-stack Developer',
        value: 'Senior Full-stack Developer',
      },
      {
        label: 'High Frontend Developer',
        value: 'High Frontend Developer',
      },
      { label: 'High Backend Developer', value: 'High Backend Developer' },
      {
        label: 'High Full-stack Developer',
        value: 'High Full-stack Developer',
      },
      { label: 'Manager', value: 'Manager' },
      { label: 'Python Machine Learning', value: 'Python Machine Learning' },
      { label: 'Data Scientist', value: 'Data Scientist' },
      { label: 'Bussiness Analyst', value: 'Bussiness Analyst' },
      { label: 'Other', value: 'Other' },
    ]

    if (displaySocialInputs) {
      socialInputs = (
        <div>
          <InputGroup
            placeholder="Wechat"
            name="wechat"
            icon="fab fa-weixin"
            value={this.state.wechat}
            onChange={this.onChange}
            error={errors.wechat}
          />

          <InputGroup
            placeholder="Instagram"
            name="instagram"
            icon="fab fa-instagram"
            value={this.state.instagram}
            onChange={this.onChange}
            error={errors.instagram}
          />

          <InputGroup
            placeholder="Twitter"
            name="twitter"
            icon="fab fa-twitter-square"
            value={this.state.twitter}
            onChange={this.onChange}
            error={errors.twitter}
          />

          <InputGroup
            placeholder="Facebook"
            name="facebook"
            icon="fab fa-facebook"
            value={this.state.facebook}
            onChange={this.onChange}
            error={errors.facebook}
          />
        </div>
      )
    }

    return (
      <div className="create-profile">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <h1 className="display-4 text-center">Create personal profile</h1>
              <p className="lead text-enter">
                Input your profile, we can know you more!
              </p>
              <small className="d-block pb-3">* must input</small>

              <form onSubmit={this.onSubmit}>
                <TextFieldGroup
                  placeholder="* Prfoile Handle"
                  name="handle"
                  value={this.state.handle}
                  onChange={this.onChange}
                  error={errors.handle}
                  info="Handle here is used to search data in backend port, usually input your email address"
                />

                <SelectListGroup
                  placeholder="Status"
                  name="status"
                  value={this.state.status}
                  onChange={this.onChange}
                  options={options}
                  error={errors.status}
                  info="Please tell us your current work status"
                />

                <TextFieldGroup
                  placeholder="Company"
                  name="company"
                  value={this.state.company}
                  onChange={this.onChange}
                  error={errors.company}
                  info="This is your current company"
                />
                <TextFieldGroup
                  placeholder="website"
                  name="website"
                  value={this.state.website}
                  onChange={this.onChange}
                  error={errors.website}
                  info="This is the webite of your company"
                />
                <TextFieldGroup
                  placeholder="location"
                  name="location"
                  value={this.state.location}
                  onChange={this.onChange}
                  error={errors.location}
                  info="Your location state and city"
                />
                <TextFieldGroup
                  placeholder="* Coding Language skills"
                  name="skills"
                  value={this.state.skills}
                  onChange={this.onChange}
                  error={errors.skills}
                  info="Please use comma to split your skills (For example: HTML,CSS,JavaScript,PHP)"
                />
                <TextFieldGroup
                  placeholder="Github Username"
                  name="github"
                  value={this.state.github}
                  onChange={this.onChange}
                  error={errors.github}
                  info="If you wantto share your project, you can input your github username"
                />
                <TextAreaFieldGroup
                  placeholder="Personal Introduction"
                  name="bio"
                  value={this.state.bio}
                  onChange={this.onChange}
                  error={errors.bio}
                  info="Briefly introduce yourself"
                />

                <div className="mb-3">
                  <button
                    className="btn btn-light"
                    type="button"
                    onClick={() => {
                      this.setState((prevState) => ({
                        displaySocialInputs: !prevState.displaySocialInputs,
                      }))
                    }}
                  >
                    Add social account
                  </button>
                  <span className="text-muted">Option</span>
                </div>
                {socialInputs}
                <input
                  type="submit"
                  value="submit"
                  className="btn btn-info btn-block mt-4"
                />
              </form>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

CreateProfile.propTypes = {
  profile: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
}

const mapStateToProps = (state) => ({
  profile: state.profile,
  errors: state.errors,
})

export default connect(mapStateToProps, { createProfile })(
  withRouter(CreateProfile),
)
