import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { useField } from '../hooks'
import { like } from '../reducers/blogReducer'
import { remove } from '../reducers/blogReducer'
import { setNotification } from '../reducers/notificationReducer'
import { withRouter } from 'react-router-dom'
import { addComment } from '../reducers/blogReducer'
import { Button, Form, ListGroup } from 'react-bootstrap'

const BlogNoHistory = (props) => {

  const newComment = useField('text')

  if ( props.blog === undefined) {
    return null
  }

  const addLike = (blog) => {
    props.like(blog)
    props.setNotification(`You liked '${blog.title}'`, 3)
  }

  const removeBlog = (blog) => {
    const confirmation = window.confirm(`Remove blog ${blog.title} by ${blog.author}?`)
    if (confirmation) {
      props.remove(blog.id)
      props.history.push('/')
    }
  }

  const sendComment = async (e) => {
    e.preventDefault()
    const comment = newComment.value.trim()

    if (comment.length < 5) {
      props.setNotification('Please add a comment longer than 4 characters', 3, true)
      return
    }

    props.addComment(comment, props.blog.id)
    props.setNotification('You added a new comment', 3)
    newComment.onReset()
  }

  const additionalInfoStyles = {
    maxWidth: '500px',
    margin: '40px 0 0 0',
    display: 'flex',
    justifyContent: 'space-between'
  }

  return (
    <div className="blogsContainer">
      <h1>{ props.blog.title }</h1>
      <p>by { props.blog.author }</p>
      <a href={ props.blog.url } target="_blank" rel="noopener noreferrer">{ props.blog.url }</a>
      <div id="additional_info" style={ additionalInfoStyles }>
        <p>Added by { props.blog.user.username }
          {
            props.user && props.blog.user.username === props.user.username &&
            <Button style={{ marginLeft: '10px' }} size="sm" variant="danger" onClick={ () => removeBlog(props.blog) }>Remove</Button>
          }
        </p>
        <p>{ props.blog.likes } likes <Button size="sm" variant="success" onClick={ () => addLike(props.blog) }>Like</Button></p>
      </div>
      <ListGroup variant="flush">
        { props.blog.comments.length > 0 &&
          <div style={{ marginTop: '30px' }}>
            <h3>Comments:</h3>
            {props.blog.comments.map((comment, index) =>
              <ListGroup.Item key={ index }>{ comment }</ListGroup.Item>
            )}
          </div>
        }
      </ListGroup>
      <Form style={{ maxWidth: '300px', marginTop: '30px' }} onSubmit={ sendComment } >
        <Form.Group name="comment" >
          <Form.Control id="comment" type="text" placeholder="write new comment here" value={ newComment.value } onChange={ newComment.onChange } />
        </Form.Group>
        <Button variant="outline-success" type="submit">Add comment</Button>
      </Form>
    </div>
  )
}

const Blog = withRouter(BlogNoHistory)

BlogNoHistory.propTypes = {
  blog: PropTypes.object,
  newComment: PropTypes.string,
  history: PropTypes.object.isRequired,
  like: PropTypes.func.isRequired,
  remove: PropTypes.func.isRequired,
  addComment: PropTypes.func.isRequired,
  setNotification: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired
}

const mapStateToProps = (state) => {
  return {
    user: state.user
  }
}

const mapDispatchToProps = {
  like, remove, addComment, setNotification
}

export default connect(mapStateToProps, mapDispatchToProps)(Blog)