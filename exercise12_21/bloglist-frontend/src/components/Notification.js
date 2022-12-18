import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Alert } from 'react-bootstrap'

const Notification = (props) => {

  const notificationStyle = {
    display: `${ props.notification.display }`,
    fontSize: '18px'
  }

  let alertType = 'success'
  if (props.notification.isError) {
    alertType = 'danger'
  }

  return (
    <div className="container" style={ notificationStyle }>
      <Alert variant={ alertType }>
        { props.notification.message }
      </Alert>
    </div>
  )

}

Notification.propTypes = {
  notification: PropTypes.object.isRequired,
  message: PropTypes.string,
  isError: PropTypes.bool,
  alertType: PropTypes.string
}

const mapStateToProps = (state) => {
  return {
    notification: state.notification
  }
}

export default connect(mapStateToProps)(Notification)