const mongoose = require('mongoose')
const app = require('../app')
const supertest = require('supertest')
const api = supertest(app)
const helper = require('./test_helper')
const Blog = require('../models/blog')

beforeEach(async () => {
  await Blog.deleteMany({})

  for (let blog of helper.initialBlogs) {
    let blogObject = new Blog(blog)
    await blogObject.save()
  }
})

test('total number of blogs is 6', async () => {
  const response = await api.get('/api/blogs')
  expect(response.body.length).toBe(helper.initialBlogs.length)
})

test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('making an HTTP POST request to the /api/blogs url successfully creates a new blog post', async () => {
  const newBlog = {
    title: 'Just a post test blog',
    author: 'Robert Mobert',
    url: 'http://example.com',
    likes: 0
  }

  await api
    .post('/api/blogs')
    .set('Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Ikxpc2EyIiwiaWQiOiI1ZDRjYWY0MmMyZjQ0NTBjMjRhZDJjZjYiLCJpYXQiOjE1NjUzMDY3MDV9.IluoEjGb9K8oW8dx_zP5Bubfmiogfwcl4yoICe-O4BU')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const blogsInDb = await helper.blogsInDb()
  expect(blogsInDb.length).toBe(helper.initialBlogs.length + 1)
  const titles = blogsInDb.map(blog => blog.title)
  expect(titles).toContain('Just a post test blog')
})

test('the unique identifier property of the blog posts is named "id"', async () => {
  const blogsInDb = await helper.blogsInDb()
  blogsInDb.map(blog => expect(blog.id).toBeDefined())
})

test('if the likes property is missing from the request it will default to the value 0', async () => {
  const newBlog = {
    title: 'Just a post test blog',
    author: 'Robert Mobert',
    url: 'http://example2.com'
  }

  await api
    .post('/api/blogs')
    .set('Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Ikxpc2EyIiwiaWQiOiI1ZDRjYWY0MmMyZjQ0NTBjMjRhZDJjZjYiLCJpYXQiOjE1NjUzMDY3MDV9.IluoEjGb9K8oW8dx_zP5Bubfmiogfwcl4yoICe-O4BU')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const blogsInDb = await helper.blogsInDb()
  expect(blogsInDb.length).toBe(helper.initialBlogs.length + 1)
  const lastBlogAdded = blogsInDb.find(blog => blog.url === 'http://example2.com')
  expect(lastBlogAdded.likes).toBe(0)
})

test('if the title and url properties are missing from the request data, the backend responds to the request with the status code 400 Bad Request', async () => {
  const newBlog = {
    title: '',
    author: 'Robert Mobert',
    url: '',
    likes: 7
  }

  await api
    .post('/api/blogs')
    .set('Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Ikxpc2EyIiwiaWQiOiI1ZDRjYWY0MmMyZjQ0NTBjMjRhZDJjZjYiLCJpYXQiOjE1NjUzMDY3MDV9.IluoEjGb9K8oW8dx_zP5Bubfmiogfwcl4yoICe-O4BU')
    .send(newBlog)
    .expect(400)

  const blogsInDb = await helper.blogsInDb()
  expect(blogsInDb.length).toBe(helper.initialBlogs.length)
})

test('a specific blog can be deleted from the database', async () => {
  const idOfBlogToDelete = helper.initialBlogs[0]._id

  await api
    .delete(`/api/blogs/${idOfBlogToDelete}`)
    .set('Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Ikxpc2EyIiwiaWQiOiI1ZDRjYWY0MmMyZjQ0NTBjMjRhZDJjZjYiLCJpYXQiOjE1NjUzMDY3MDV9.IluoEjGb9K8oW8dx_zP5Bubfmiogfwcl4yoICe-O4BU')
    .expect(204)

  const blogsInDb = await helper.blogsInDb()
  expect(blogsInDb.length).toBe(helper.initialBlogs.length - 1)
  expect(blogsInDb[0]).not.toContain(idOfBlogToDelete)

})

test('updating the amount of likes of an individual blog post works', async () => {
  const idOfBlogToUpdate = helper.initialBlogs[0]._id
  const newAmountOfLikes = { likes: helper.initialBlogs[0].likes + 1 }

  await api
    .put(`/api/blogs/${idOfBlogToUpdate}`)
    .send(newAmountOfLikes)
    .expect(200)

  const blogsInDb = await helper.blogsInDb()
  expect(blogsInDb.length).toBe(helper.initialBlogs.length)
  expect(blogsInDb[0].likes).toBe(newAmountOfLikes.likes)

})

afterAll(() => {
  mongoose.connection.close()
})

