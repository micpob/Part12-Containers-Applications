const Blog = require('../models/blog')
const User = require('../models/user')

const initialBlogs = [
  {
    _id: '5a422a851b54a676234d17f7',
    title: 'React patterns',
    author: 'Michael Chan',
    url: 'https://reactpatterns.com/',
    likes: 7,
    user: '5d52e3df64be8c1328f4cbaf',
    __v: 0
  },
  {
    _id: '5a422aa71b54a676234d17f8',
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5,
    user: '5d52e3df64be8c1328f4cbaf',
    __v: 0
  },
  {
    _id: '5a422b3a1b54a676234d17f9',
    title: 'Canonical string reduction',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
    likes: 12,
    user: '5d52e3df64be8c1328f4cbaf',
    __v: 0
  },
  {
    _id: '5a422b891b54a676234d17fa',
    title: 'First class tests',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll',
    likes: 10,
    user: '5d52e3fa64be8c1328f4cbb0',
    __v: 0
  },
  {
    _id: '5a422ba71b54a676234d17fb',
    title: 'TDD harms architecture',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html',
    likes: 0,
    user: '5d52e3fa64be8c1328f4cbb0',
    __v: 0
  },
  {
    _id: '5a422bc61b54a676234d17fc',
    title: 'Type wars',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
    likes: 2,
    user: '5d52e3fa64be8c1328f4cbb0',
    __v: 0
  }
]

const initialUsers = [
  {
    blogs: [ ],
    username: 'Lisa2',
    name: 'Lisa Simpson',
    _id: '5d4caf42c2f4450c24ad2cf6',
    passwordHash: '$2a$10$nim9wk44RLMq/h.gFRxK8Oo8tX3AsVssCYulsGrs3fsXO7BJNBfN2',
    __v: 0
  },
  {
    blogs: [ ],
    username: 'userTestname',
    name: 'test Name',
    _id: '5d48639c3d57d30fcc45614e',
    passwordHash: '$2a$10$anMf8GcH0racf9I00bGzLOCVjkAf66Jb08aS9Vat/7y/zgJdyC/XS',
    __v: 0
  },
  {
    blogs: [ ],
    username: 'userTestname2',
    name: 'test Name2',
    _id: '5d4863c515c03533347cbdcb',
    passwordHash: '$2a$10$MMn1ka.YLZ8ET5wklx7w8OABk968aJ6.wqOCc7vL74WiXgDJW8oRq',
    __v: 0
  },
  {
    blogs: [ ],
    username: 'userTestname3',
    name: 'test Name3',
    _id: '5d4866c01bfeda2ba8fc6855',
    passwordHash: '$2a$10$Y26mIH2mgQDmKH3.uOOfpeecBzDVewWLodSWUpo2dReDNzgGYd3O.',
    __v: 0
  }
]

const nonExistingId = async () => {
  const blog = new Blog({ content: 'willremovethissoon' })
  await blog.save()
  await blog.remove()

  return blog._id.toString()
}

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map(note => note.toJSON())
}

const usersInDb = async () => {
  const users = await User.find({})
  return users.map(user => user.toJSON())
}

module.exports = {
  initialBlogs,
  initialUsers,
  nonExistingId,
  blogsInDb,
  usersInDb
}