import loginService from '../services/login'
import blogService from '../services/blogs'

export const initializeUser = () => {
  return async dispatch => {
    const loggedUserJSON = window.localStorage.getItem('loggedUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      blogService.setToken(user.token)
      dispatch({
        type: 'LOGGED_IN',
        data: user
      })
    }
  }
}

export const login = (username, password) => {
  return async dispatch => {
    const user = await loginService.login({
      username, password
    })
    if (user.token) {
      blogService.setToken(user.token)
      window.localStorage.setItem('loggedUser', JSON.stringify(user))
      dispatch({
        type: 'LOGIN',
        data: user
      })
    } else {
      return 'Wrong credentials'
    }
  }
}

export const logout = () => {
  return async dispatch => {
    window.localStorage.clear('loggedUser')
    dispatch({
      type: 'LOGOUT'
    })
  }
}

const loginReducer = (state = null, action) => {
  switch (action.type) {
  case 'LOGIN':
    return action.data
  case 'LOGOUT':
    return null
  case 'LOGGED_IN':
    return action.data
  default:
    return state
  }
}

export default loginReducer