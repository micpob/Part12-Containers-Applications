const mongoose = require('mongoose')
const app = require('../app')
const supertest = require('supertest')
const api = supertest(app)
const helper = require('./test_helper')
const User = require('../models/user')

describe('when there are already some users in the database', () => {
  beforeEach(async () => {
    await User.deleteMany({})

    for (let user of helper.initialUsers) {
      let userObject = new User(user)
      await userObject.save()
    }
  })

  test('creation succeeds with a new username', async () => {
    const newUser = {
      username: 'userTestnameNew',
      name: 'test Name New',
      password: 'genericpass'
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd.length).toBe(helper.initialUsers.length + 1)
    const userNames = usersAtEnd.map(user => user.username)
    expect(userNames).toContain(newUser.username)
  })

  test('user with username length under 3 characters is not created', async () => {
    const newUser = {
      username: 'no',
      name: 'test',
      password:'genericpass'
    }

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    expect(result.body.error).toContain('`username` (`no`) is shorter than the minimum allowed length (3)')
    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd.length).toBe(helper.initialUsers.length)
  })

  test('user with password length under 3 characters is not created', async () => {
    const newUser = {
      username: 'test',
      name: 'test',
      password:'no'
    }

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    expect(result.body.error).toContain('password must be at least 3 characters long')
    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd.length).toBe(helper.initialUsers.length)
  })

  test('user with not unique username is not created', async () => {
    const newUser = {
      username: helper.initialUsers[0].username,
      name: 'test',
      password: 'test'
    }

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    expect(result.body.error).toContain('expected `username` to be unique')
    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd.length).toBe(helper.initialUsers.length)
  })

  afterAll(() => {
    mongoose.connection.close()
  })

})



