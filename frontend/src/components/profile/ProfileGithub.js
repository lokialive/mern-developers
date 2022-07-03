import React, { Component } from 'react'
import PropTypes from 'prop-types'

class ProfileGithub extends Component {
  constructor(props) {
    super(props)
    this.state = {
      clientId: '7761f83fb6302bc07504',
      clientSecret: '2d9b2a226cc2005070d8bf47e3b0bf6a46b66322',
      count: 0,
      sort: 'created:desc',
      repos: [],
    }
  }
  //before page rendering
  componentDidMount() {
    const { username } = this.props
    const { count, sort, clientId, clientSecret } = this.state
    fetch(
      `https://api.github.com/users/${username}/repos?per_page=${count}&sort=${sort}&client_id=${clientId}&client_secret=${clientSecret}`,
    )
      .then((res) => res.json())
      .then((data) => {
        if (this.refs.myRef) {
          this.setState({
            repos: data,
          })
        }
      })
      .catch((err) => console.log(err))
  }

  render() {
    const { repos } = this.state
    let repoItems = <div></div>
    if (repos.length > 0) {
      repoItems = repos.map((repo) => (
        <div key={repo.id} className="card card-body mb-2">
          <div className="row">
            <div className="col-md-6">
              <h4>
                <a href={repo.html_url} className="text-info" target="_blank">
                  {repo.name}
                </a>
              </h4>
              <p>{repo.desciption}</p>
            </div>
            <div className="col-md-6">
              <span className="badge badge-info mr-1">
                Stars: {repo.stargazers_count}
              </span>
              <span className="badge badge-secondary mr-1">
                Watchers: {repo.watchers_count}
              </span>
              <span className="badge badge-success">
                Forks: {repo.forks_count}
              </span>
            </div>
          </div>
        </div>
      ))
    }
    return (
      <div ref="myRef">
        <hr />
        <h3 className="mb-4">Github Repository</h3>
        {repoItems}
      </div>
    )
  }
}

ProfileGithub.propTypes = {
  username: PropTypes.string.isRequired,
}
export default ProfileGithub
