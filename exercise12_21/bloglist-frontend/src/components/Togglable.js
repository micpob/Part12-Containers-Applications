import React, { useState, useImperativeHandle } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { setNotification } from '../reducers/notificationReducer'
import { Button } from 'react-bootstrap'

const Togglable = React.forwardRef((props, ref) => {
  const [visible, setVisible] = useState(false)
  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }
  const additionalStyles = { padding: '15px 0', textAlign: 'right' }

  const toggleVisibility = () => {
    if (props.user) {
      setVisible(!visible)
    } else {
      props.setNotification('Please log in or register to add a new blog', 3, true)
    }
  }

  useImperativeHandle(ref, () => {
    return {
      toggleVisibility
    }
  })

  return (
    <div>
      <div style={ hideWhenVisible, additionalStyles }>
        <Button onClick={ toggleVisibility } variant={ visible ? 'danger' : 'primary' }>{ visible ? 'Cancel' : 'New blog' }</Button>
      </div>
      <div style={ showWhenVisible }>
        { props.children }
      </div>
    </div>
  )
})

Togglable.propTypes = {
  children: PropTypes.node.isRequired,
  user: PropTypes.object,
  setNotification: PropTypes.func.isRequired
}

const mapStateToProps = (state) => {
  return {
    user: state.user
  }
}

const mapDispatchToProps = {
  setNotification
}

export default connect(mapStateToProps, mapDispatchToProps, null, { forwardRef: true })(Togglable)
