import React from 'react'
import PropTypes from 'prop-types'
import { useField } from '../hooks'
import { connect } from 'react-redux'
import { createBlog } from '../reducers/blogReducer'
import { setNotification } from '../reducers/notificationReducer'
import { Button, Form } from 'react-bootstrap'

const BlogForm = (props) => {

  const newTitle = useField('text')
  const newAuthor = useField('text')
  const newURL = useField('text')

  const addBlog = async (e) => {
    e.preventDefault()

    const title = newTitle.value.trim()
    const author = newAuthor.value.trim()
    const url = newURL.value.trim()

    if (title.length < 5 || author.length < 5 || url.length < 5) {
      props.setNotification('Please add a title and author and url longer than 4 characters', 3, true)
      return
    }
    if (props.blogs.some(x => x.url === url)) {
      props.setNotification(`${ url } is already added to the blogs list`, 3, true)
      return
    }
    const newBlog = {
      title, author, url
    }
    props.createBlog(newBlog)
    props.setNotification(`You created '${newBlog.title}'`, 3)
    newTitle.onReset()
    newAuthor.onReset()
    newURL.onReset()
    props.blogFormRef.current.toggleVisibility()
  }

  return (
    <div style={{ margin: '20px 0 40px 0' }}>
      <h2>Add new Blog</h2>
      <Form onSubmit={ addBlog } >
        <Form.Group name="title" >
          <Form.Label>Title:</Form.Label>
          <Form.Control id="title" type="text" placeholder="blog title" value={ newTitle.value } onChange={ newTitle.onChange }/>
        </Form.Group>
        <Form.Group name="author" >
          <Form.Label>Author:</Form.Label>
          <Form.Control id="author" type="text" placeholder="blog author" value={ newAuthor.value } onChange={ newAuthor.onChange }/>
        </Form.Group>
        <Form.Group name="url" >
          <Form.Label>URL:</Form.Label>
          <Form.Control id="url" type="text" placeholder="blog URL" value={ newURL.value } onChange={ newURL.onChange } />
        </Form.Group>
        <Button variant="outline-success" type="submit">
          Add blog
        </Button>
        <Button style={{ margin: '0 15px' }} variant="outline-warning" onClick={ () => {
          newTitle.onReset()
          newAuthor.onReset()
          newURL.onReset()
        } }>
          Reset
        </Button>
      </Form>
    </div>
  )
}

BlogForm.propTypes = {
  blogs:  PropTypes.array.isRequired,
  createBlog: PropTypes.func.isRequired,
  setNotification: PropTypes.func.isRequired,
  addBlog: PropTypes.func,
  blogFormRef: PropTypes.object.isRequired,
  newAuthor: PropTypes.string,
  newTitle: PropTypes.string,
  newURL: PropTypes.string,
  useField: PropTypes.func,
  onReset: PropTypes.func,
  onChange: PropTypes.func
}

const mapStateToProps = (state) => {
  return {
    blogs: state.blogs
  }
}

const mapDispatchToProps = {
  createBlog, setNotification
}

export default connect(mapStateToProps, mapDispatchToProps)(BlogForm)
