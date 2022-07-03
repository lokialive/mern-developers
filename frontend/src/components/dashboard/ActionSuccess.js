import React from 'react'
import { Link, withRouter } from 'react-router-dom'

const ActionSuccess = () => {
  return (
    <div className="btn-group mb-4" role="group">
      <p>Action Success!</p>
      <Link to="/dashboard" className="btn btn-light">
        Click to back to retunr to dashboard!
      </Link>
    </div>
  )
}

export default withRouter(ActionSuccess)
