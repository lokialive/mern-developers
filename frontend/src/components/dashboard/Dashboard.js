import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { getCurrentProfile, deleteAccount } from '../../actions/profileActions'
import Spinner from '../../common/spinner'
import { Link, withRouter } from 'react-router-dom'
import ProfileActives from './ProfileActive'
import Experieince from './Experience'
import Education from './Education'

class Dashboard extends Component {
  componentDidMount() {
    // call action
    this.props.getCurrentProfile()
  }

  onDeleteClick(e) {
    // call action
    this.props.deleteAccount()
  }

  render() {
    const { user } = this.props.auth

    const { profile, loading } = this.props.profile
    let dashboardContent
    //check whether prfoile is null || loading is true
    if (profile === null || loading) {
      dashboardContent = <Spinner />
    } else {
      //check whether has profile
      if (Object.keys(profile).length > 0) {
        //has data
        dashboardContent = (
          <div>
            <p className="lead text-muted">
              Welcome{' '}
              <Link to={`/profiles/${profile[0].handle}`}>{user.name}</Link>
            </p>
            <ProfileActives />
            {/* Education & Experience*/}
            <Experieince experience={profile[0].experience} />
            <Education education={profile[0].education} />

            {/*Delete current account button */}
            <div style={{ marginBottom: '60px' }}>
              <button
                onClick={this.onDeleteClick.bind(this)}
                className="btn btn-danger"
              >
                Delete Current Account
              </button>
            </div>
          </div>
        )
      } else {
        // no profile data while loggig in
        dashboardContent = (
          <div>
            <p className="lead text-muted">Welcome, {user.name} !</p>
            <p className="lead text-muted">
              {' '}
              No personal profile. Please add your profile!{' '}
            </p>
            <Link className="btn btn-lg btn-info" to="/createProfile">
              Create personal profile
            </Link>
          </div>
        )
      }
    }

    return (
      <div className="dashboard">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <h1 className="display-4">
                Dashboard
                {dashboardContent}
              </h1>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

Dashboard.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  deleteAccount: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
}

const mapStateToProps = (state) => ({
  auth: state.auth,
  profile: state.profile,
})

export default connect(mapStateToProps, { getCurrentProfile, deleteAccount })(
  withRouter(Dashboard),
)
