import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { Table } from 'react-bootstrap'
import PropTypes from 'prop-types'

const BlogList = (props) => {

  /* const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  } */

  return (
    <div>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Title</th>
            <th>Author</th>
          </tr>
        </thead>
        <tbody>
          { props.blogs.sort( (a, b) => {
            return b.likes - a.likes
          }).map(blog =>
            <tr key={ blog.id }>
              <td><Link to={`/blogs/${blog.id}`}>{ blog.title }</Link></td>
              <td>{ blog.author }</td>
            </tr>
          ) }
        </tbody>
      </Table>
    </div>
  )
}

BlogList.propTypes = {
  blogs: PropTypes.array.isRequired
}

const mapStateToProps = (state) => {
  return {
    blogs: state.blogs
  }
}

export default connect(mapStateToProps)(BlogList)
