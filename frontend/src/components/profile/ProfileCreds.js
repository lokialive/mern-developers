import React, { Component } from 'react'
import isEmpty from '../../validation/isEmpty'

class ProfileCreds extends Component {
  render() {
    // Get data transfer in

    let experience = []
    let education = []
    if (!isEmpty(this.props.experience)) {
      experience = this.props.experience
    }

    if (!isEmpty(this.props.education)) {
      education = this.props.education
    }

    const expItems = experience.map((exp) => (
      <li key={exp._id} className="list-group-item">
        <h4>{exp.company}</h4>
        <p>
          {exp.from} to {exp.to === '' ? 'Till now' : exp.to}
        </p>
        <p>
          <strong>Title:</strong>
          {exp.title}
        </p>
        <p>
          {exp.location === '' ? null : (
            <span>
              <strong>Location:</strong>
              {exp.location}
            </span>
          )}
        </p>
        <p>
          {exp.description === '' ? null : (
            <span>
              <strong>Title Description:</strong>
              {exp.description}
            </span>
          )}
        </p>
      </li>
    ))

    const eduItems = education.map((edu) => (
      <li key={edu._id} className="list-group-item">
        <h4>{edu.school}</h4>
        <p>
          {edu.from} to {edu.to === '' ? 'Till now' : edu.to}
        </p>
        <p>
          <strong>Diploma:</strong>
          {edu.degree}
        </p>
        <p>
          <strong>Major:</strong>
          {edu.filedOfStudy}
        </p>
        <p>
          {edu.description === '' ? null : (
            <span>
              <strong>Performance:</strong>
              {edu.description}
            </span>
          )}
        </p>
      </li>
    ))

    return (
      <div className="row">
        <div className="col-md-6">
          <h3 className="text-center text-info">Experience</h3>
          {expItems.length > 0 ? (
            <ul className="list-group">{expItems}</ul>
          ) : (
            <p className="text-center">No experience record.</p>
          )}
        </div>

        <div className="col-md-6">
          <h3 className="text-center text-info">Education</h3>
          {eduItems.length > 0 ? (
            <ul className="list-group">{eduItems}</ul>
          ) : (
            <p className="text-center">No education record.</p>
          )}
        </div>
      </div>
    )
  }
}

export default ProfileCreds
