const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const registrationRouter = require('express').Router()
const User = require('../models/user')

registrationRouter.post('/', async (request, response) => {
  try {
    const body = request.body

    const saltRounds = 10
    const passwordHash = await bcrypt.hash(body.password, saltRounds)

    const user = new User({
      username: body.username,
      name: body.name,
      blogs: [],
      passwordHash,
    })

    const savedUser = await user.save()

    const userForToken = {
      username: savedUser.username,
      id: savedUser._id,
    }

    const token = jwt.sign(userForToken, process.env.SECRET)

    response
      .status(201)
      .send({ token, username: savedUser.username, name: savedUser.name, blogs: savedUser.blogs, id: savedUser.id })

    //response.json(savedUser)
  } catch (exception) {
    //next(exception)
    console.log('EXCEPTION ON USER CREATION: ', exception)

  }


})

module.exports = registrationRouter