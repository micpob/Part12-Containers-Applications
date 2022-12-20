import React from 'react'
import PropTypes from 'prop-types'
import { useField } from '../hooks'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { register } from '../reducers/usersReducer'
import { initializeUser } from '../reducers/loginReducer'
import { setNotification } from '../reducers/notificationReducer'
import { Form, Button } from 'react-bootstrap'

const RegistrationFormNoHistory = (props) => {
  const name = useField('text')
  const username = useField('text')
  const password = useField('password')

  const handleRegistration = async (e) => {
    e.preventDefault()
    const nameRegistration = name.value
    const usernameRegistration = username.value
    const passwordRegistration = password.value
    const response = await props.register(nameRegistration, usernameRegistration, passwordRegistration)
    if (response) {
      props.setNotification(response, 3, true)
    } else {
      props.initializeUser()
      props.history.push('/')
      props.setNotification(`Welcome, ${usernameRegistration}!`, 3)
    }
  }

  return (
    <div>
      <h2>New account registration</h2>
      <Form onSubmit={ handleRegistration } style={{ margin: '0 0 30px 0' }}>
        <Form.Group name="name">
          <Form.Label>Name:</Form.Label>
          <Form.Control
            id="name"
            type="text"
            value={ name.value } onChange={ name.onChange }
          />
        </Form.Group>
        <Form.Group name="username">
          <Form.Label>Username:</Form.Label>
          <Form.Control
            id="username"
            type="text"
            value={ username.value } onChange={ username.onChange }
          />
        </Form.Group>
        <Form.Group name="password">
          <Form.Label>Password:</Form.Label>
          <Form.Control
            id="password"
            type="password"
            value={ password.value } onChange={ password.onChange }
          />
        </Form.Group>
        <Button id="registration_button" variant="primary" type="submit">Register</Button>
        <Button style={{ margin: '0 15px' }} variant="warning" onClick={ () => {
          name.onReset()
          username.onReset()
          password.onReset()
        } }>Reset</Button>
      </Form>
    </div>
  )
}

RegistrationFormNoHistory.propTypes = {
  register: PropTypes.func.isRequired,
  setNotification: PropTypes.func.isRequired,
  initializeUser: PropTypes.func.isRequired,
  name: PropTypes.string,
  username: PropTypes.string,
  password: PropTypes.string,
  useField: PropTypes.func,
  onReset: PropTypes.func,
  onChange: PropTypes.func,
  history: PropTypes.object
}

const mapDispatchToProps = {
  register, setNotification, initializeUser
}

const RegistrationForm = withRouter(RegistrationFormNoHistory)

export default connect(null, mapDispatchToProps)(RegistrationForm)
