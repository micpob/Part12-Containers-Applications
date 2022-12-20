import userService from '../services/users'
import registrationService from '../services/registration'

export const initializeUsers = () => {
  return async dispatch => {
    const users = await userService.getAll()
    dispatch({
      type: 'INIT_USERS',
      data: users
    })
  }
}

export const register = (name, username, password) => {
  return async dispatch => {
    const user = await registrationService.register({
      name, username, password
    })
    dispatch({
      type: 'NEW_USER',
      data: user
    })
    window.localStorage.setItem('loggedUser', JSON.stringify(user))
  }
}

const userReducer = (state = [], action) => {
  /* console.log('state now: ', state)
  console.log('action', action) */
  switch (action.type) {
  case 'INIT_USERS':
    return action.data
  case 'NEW_USER': {
    const newUser = action.data
    return state.concat(newUser)
  }
  default:
    return state
  }
}

export default userReducer