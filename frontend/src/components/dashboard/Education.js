import React, { Component } from 'react'
import { connect } from 'react-redux'
import { PropTypes } from 'prop-types'
import { deleteEducation } from '../../actions/profileActions'
import { withRouter } from 'react-router-dom'

class Education extends Component {
  onDeleteClick(id) {
    this.props.deleteEducation(id, this.props.history)
  }
  render() {
    const education = this.props.education.map((exp) => (
      <tr className="lead text-muted" key={exp._id}>
        <td>{exp.school}</td>
        <td>{exp.degree}</td>
        <td>
          {exp.from} to {exp.to === '' ? 'Till now' : exp.to}
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

    return (
      <div>
        <h4 className="mb-4">Education Experience</h4>
        <table className="table">
          <thead>
            <tr className="lead">
              <th>School</th>
              <th>Diploma</th>
              <th>Year</th>
              <th />
            </tr>
            {education}
          </thead>
        </table>
      </div>
    )
  }
}

Education.propTypes = {
  deleteEducation: PropTypes.func.isRequired,
}

const mapStateToProps = (state) => ({
  auth: state.auth,
  profile: state.profile,
})

export default connect(mapStateToProps, { deleteEducation })(
  withRouter(Education),
)
