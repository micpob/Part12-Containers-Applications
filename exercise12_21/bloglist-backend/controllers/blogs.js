const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')

blogsRouter.get('/', async (request, response, next) => {
  try {
    const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 })
    response.json(blogs.map(blog => blog.toJSON()))
  } catch (exception) {
    next(exception)
  }
})

blogsRouter.post('/', async (request, response, next) => {
  const body = request.body

  try {
    const decodedToken = jwt.verify(request.token, process.env.SECRET)
    if (!request.token || !decodedToken.id) {
      return response.status(401).json({ error: 'Token missing or invalid' })
    }

    const user = await User.findOne({ username: decodedToken.username })

    const blog = new Blog({
      title: body.title,
      author: body.author,
      url: body.url,
      likes: !body.likes ? 0 : body.likes,
      user: user._id,
      comments: []
    })

    const savedBlog = await blog.save()
    user.blogs = user.blogs.concat(savedBlog._id)
    await user.save()
    const populatedBlog = await Blog.findOne({ _id: savedBlog._id }).populate('user', { username: 1, name: 1 })
    response.status(201).json(populatedBlog.toJSON())
  } catch (exception) {
    next(exception)
  }
})

blogsRouter.delete('/:id', async (request, response, next) => {
  try {

    const decodedToken = jwt.verify(request.token, process.env.SECRET)
    if (!request.token || !decodedToken.id) {
      return response.status(401).json({ error: 'Token missing or invalid' })
    }

    const user = await User.findOne({ username: decodedToken.username })
    const blog = await Blog.findById(request.params.id)
    const blogOwner = blog.user

    if (user._id.toString() !== blogOwner.toString()) {
      return response.status(401).json({ error: 'Unauthorized user' })
    }

    await Blog.findByIdAndRemove(request.params.id)
    response.status(204).end()
  } catch (exception) {
    next(exception)
  }
})

blogsRouter.put('/:id', async (request, response, next) => {
  const newNumberOfLikes = { likes: request.body.likes }
  try {
    const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, newNumberOfLikes, { new: true })
    if (updatedBlog) {
      const populatedBlog = await Blog.findOne({ _id: updatedBlog._id }).populate('user', { username: 1, name: 1 })
      response.status(200).json(populatedBlog.toJSON())
      console.log(`Updated ${updatedBlog.title} likes to ${updatedBlog.likes}`)
    } else {
      response.status(404).end()
    }
  } catch (exception) {
    next(exception)
  }
})

blogsRouter.put('/:id/comments', async (request, response, next) => {
  const newComment = request.body.comment
  try {
    const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, { $push: { comments: newComment } }, { new: true })
    if (updatedBlog) {
      const populatedBlog = await Blog.findOne({ _id: updatedBlog._id }).populate('user', { username: 1, name: 1 })
      response.status(200).json(populatedBlog.toJSON())
      console.log(`Added comment "${newComment}" to ${updatedBlog.title}`)
    } else {
      response.status(404).end()
    }
  } catch (exception) {
    next(exception)
  }
})

module.exports = blogsRouter