export const setNotification = (message, time, isError = false) => {
  const timeInMilliseconds = time * 1000

  return async dispatch => {
    dispatch({
      type: 'SHOW_NOTIFICATION',
      message: message,
      display: 'block',
      isError: isError
    })
    await new Promise(resolve => setTimeout(resolve, timeInMilliseconds))
    dispatch({
      type: 'HIDE_NOTIFICATION',
      display: 'none'
    })
  }
}

const initialState = {
  message: '',
  display: 'none',
  isError: false
}

const notificationReducer = (state = initialState, action) => {
  switch (action.type) {
  case 'SHOW_NOTIFICATION':
    return { message: action.message, display: action.display, isError: action.isError }
  case 'HIDE_NOTIFICATION':
    return { message: '', display: action.display, isError: false }
  default:
    return state
  }
}

export default notificationReducer