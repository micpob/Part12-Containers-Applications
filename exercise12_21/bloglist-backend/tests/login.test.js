const mongoose = require('mongoose')
const app = require('../app')
const supertest = require('supertest')
const api = supertest(app)

const loginData = {
  username: 'Lisa2',
  password: 'pass2'
}

test('user can login', async () => {

  await api
    .post('/api/login')
    .send(loginData)
    .expect(200)

})


afterAll(() => {
  mongoose.connection.close()
})