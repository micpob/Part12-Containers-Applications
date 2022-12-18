import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { ListGroup } from 'react-bootstrap'

const User = (props) => {
  if ( props.user === undefined) {
    return null
  }

  return (
    <div>
      <h1>{props.user.name}</h1>
      <h3 style={{ margin: '30px 0' }}>{ props.user.blogs.length > 0 ? 'Added blogs:': 'No blogs added' }</h3>
      <ListGroup variant="flush">
        { props.user.blogs.sort( (a, b) => {
          return b.likes - a.likes
        }).map(blog =>
          <ListGroup.Item key={ blog.id }><Link to={`/blogs/${blog.id}`}>{ blog.title }</Link></ListGroup.Item>
        )}
      </ListGroup>
    </div>
  )
}

User.propTypes = {
  user: PropTypes.object.isRequired
}

export default User
