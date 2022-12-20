import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { Table } from 'react-bootstrap'
import PropTypes from 'prop-types'

const UserList = (props) => {

  return (
    <div>
      <h1>Users</h1>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Name</th>
            <th>Blogs created</th>
          </tr>
        </thead>
        <tbody>
          {
            props.users.sort( (a, b) => {
              return b.blogs.length - a.blogs.length
            }).map(user =>
              <tr key={ user.id }>
                <td><Link to={`/users/${user.id}`}>{ user.name }</Link></td>
                <td>{ user.blogs.length }</td>
              </tr>
            )
          }
        </tbody>
      </Table>
    </div>
  )
}

UserList.propTypes = {
  users: PropTypes.array.isRequired
}

const mapStateToProps = (state) => {
  return {
    users: state.users
  }
}

export default connect(mapStateToProps)(UserList)
