import blogService from '../services/blogs'

export const initializeBlogs = () => {
  return async dispatch => {
    const blogs = await blogService.getAll()
    dispatch({
      type: 'INIT_BLOGS',
      data: blogs
    })
  }
}

export const createBlog = (content) => {
  const newBlogData = content
  return async dispatch => {
    const newBlog = await blogService.create(newBlogData)
    dispatch({
      type: 'NEW_BLOG',
      data: newBlog
    })
  }
}

export const addComment = (comment, id) => {
  const content = { comment }
  return async dispatch => {
    const updatedBlog = await blogService.addComment(content, id)
    dispatch({
      type: 'NEW_COMMENT',
      data: updatedBlog
    })
  }
}

export const like = (blog) => {
  const newBlog = { ...blog, likes: blog.likes + 1 }
  return async dispatch => {
    const liked = await blogService.addLike(newBlog)
    dispatch({
      type: 'LIKE',
      data: liked
    })
  }
}

export const remove = (id) => {
  return async dispatch => {
    const deletedStatus = await blogService.remove(id)
    if (deletedStatus === 204) {
      dispatch({
        type: 'DELETE',
        removedBlogId: id
      })
    }
  }
}

const blogReducer = (state = [], action) => {
  /*   console.log('state now: ', state)
  console.log('action', action)*/
  switch (action.type) {
  case 'LIKE': {
    const id = action.data.id
    const likedBlog = state.find(n => n.id === id)
    const changedBlog = { ...likedBlog, likes: likedBlog.likes + 1 }
    return state.map(blog =>
      blog.id !== id ? blog : changedBlog
    )
  }
  case 'DELETE': {
    const removedId = action.removedBlogId
    return state.filter(blog => blog.id !== removedId)
  }
  case 'NEW_BLOG': {
    const content = action.data
    return state.concat(content)
  }
  case 'NEW_COMMENT': {
    const commentedBlog = state.find(n => n.id === action.data.id)
    const updatedBlog = { ...commentedBlog, comments: action.data.comments }
    return state.map(blog =>
      blog.id !== action.data.id ? blog : updatedBlog
    )
  }
  case 'INIT_BLOGS':
    return action.data
  default:
    return state
  }
}

export default blogReducer