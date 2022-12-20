const config = require('./utils/config')
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')
const blogsRouter = require('./controllers/blogs')
const usersRouter = require('./controllers/users')
const mongoose = require('mongoose')
const middleware = require('./utils/middleware')
const logger = require('./utils/logger')
const loginRouter = require('./controllers/login')
const registrationRouter = require('./controllers/registration')
//const { MONGO_URL } = require('../util/config')


//logger.info('connecting to', config.MONGODB_URI)

const mongoUrl = config.MONGO_URL
mongoose.connect(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => logger.info('connected to MongoDB'))
  .catch(error => logger.error('Error connecting to MongoDB', error.message))

app.use(middleware.tokenExtractor)
app.use(cors())
app.use(express.static('build'))
app.use(bodyParser.json())
app.use(middleware.requestLogger)
app.use('/api/blogs', blogsRouter)
app.use('/api/users', usersRouter)
app.use('/api/login', loginRouter)
app.use('/api/registration', registrationRouter)
if (process.env.NODE_ENV === 'test') {
  const testRouter = require('./controllers/tests')
  app.use('/api/testing', testRouter)
}
app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app