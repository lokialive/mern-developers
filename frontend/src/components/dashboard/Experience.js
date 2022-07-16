import React, { Component } from 'react'
import { connect } from 'react-redux'
import { PropTypes } from 'prop-types'
import { deleteExperience } from '../../actions/profileActions'

import { withRouter } from 'react-router-dom'
import isEmpty from '../../validation/isEmpty'
class Experience extends Component {
  onDeleteClick(id) {
    this.props.deleteExperience(id, this.props.history)
  }
  render() {
    let experience = (
      <div>
        <p> No experience record</p>
      </div>
    )
    if (!isEmpty(this.props.experience)) {
      //Get encapsulated experience
      experience = this.props.experience.map((exp) => (
        <tr className="lead text-muted" key={exp._id}>
          <td>{exp.company}</td>
          <td>{exp.title}</td>
          <td>
            {exp.from} 至 {exp.to === '' ? 'Till now' : exp.to}
          </td>
          <td>
            <button
              onClick={this.onDeleteClick.bind(this, exp._id)}
              className="btn btn-danger"
            >
              Delete
            </button>
          </td>
        </tr>
      ))
    }

    return (
      <div>
        <h4 className="mb-4">Personal Experience</h4>
        <table className="table">
          <thead>
            <tr className="lead">
              <th>Company</th>
              <th>Status</th>
              <th>Year</th>
              <th />
            </tr>
            {experience}
          </thead>
        </table>
      </div>
    )
  }
}

Experience.propTypes = {
  deleteExperience: PropTypes.func.isRequired,
}

const mapStateToProps = (state) => ({
  auth: state.auth,
  profile: state.profile,
})

export default connect(mapStateToProps, { deleteExperience })(
  withRouter(Experience),
)
