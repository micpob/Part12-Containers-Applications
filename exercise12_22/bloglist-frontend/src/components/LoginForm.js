import React from 'react'
import PropTypes from 'prop-types'
import { useField } from '../hooks'
import { connect } from 'react-redux'
import { Link, withRouter } from 'react-router-dom'
import { login } from '../reducers/loginReducer'
import { initializeUsers } from '../reducers/usersReducer'
import { setNotification } from '../reducers/notificationReducer'
import { Form, Button } from 'react-bootstrap'

const LoginFormNoHistory = (props) => {
  const username = useField('text')
  const password = useField('password')

  const handleLogin = async (e) => {
    e.preventDefault()
    const usernameLogin = username.value
    const passwordLogin = password.value
    const response = await props.login(usernameLogin, passwordLogin)
    if (response) {
      props.setNotification(response, 3, true)
    } else {
      props.initializeUsers()
      props.history.push('/')
    }
  }

  return (
    <div>
      <h2>Log in to application</h2>
      <Form onSubmit={ handleLogin } style={{ margin: '0 0 30px 0' }}>
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
        <Button id="login_button" variant="primary" type="submit">Log in</Button>
        <Button style={{ margin: '0 15px' }} variant="warning" onClick={ () => {
          username.onReset()
          password.onReset()
        } }>Reset</Button>
      </Form>
      <h3>Not registered yet?</h3>
      <Link to="/register">
        <Button variant="success">Register now!</Button>
      </Link>
    </div>
  )
}

LoginFormNoHistory.propTypes = {
  login: PropTypes.func.isRequired,
  setNotification: PropTypes.func.isRequired,
  initializeUsers: PropTypes.func,
  username: PropTypes.string,
  password: PropTypes.string,
  useField: PropTypes.func,
  onReset: PropTypes.func,
  onChange: PropTypes.func,
  history: PropTypes.object
}

const mapDispatchToProps = {
  login, setNotification, initializeUsers
}

const LoginForm = withRouter(LoginFormNoHistory)

export default connect(null, mapDispatchToProps)(LoginForm)
