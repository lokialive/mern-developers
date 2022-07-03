import React from 'react'
import { Link } from 'react-router-dom'

const ProfileActives = () => {
  return (
    <div className="btn-group mb-4" role="group">
      <a href="/editProfile" className="btn btn-light">
        <i className="fas fa-user-circle text-info mr-1" /> Edit Personal
        Profile
      </a>
      <Link to="/addExperience" className="btn btn-light">
        <i className="fab fa-black-tie text-info mr-1" />
        Add Personal Experience
      </Link>
      <Link to="/addEducation" className="btn btn-light">
        <i className="fas fa-graduation-cap text-info mr-1" />
        Add Educational Experience
      </Link>
    </div>
  )
}

export default ProfileActives
