import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import BlogList from './components/BlogList'
import BlogForm from './components/BlogForm'
import Blog from './components/Blog'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import { connect } from 'react-redux'
import { initializeBlogs } from './reducers/blogReducer'
import { initializeUsers } from './reducers/usersReducer'
import { initializeUser, logout } from './reducers/loginReducer'
import LoginForm from './components/LoginForm'
import RegistrationForm from './components/RegistrationForm'
import UserList from './components/UserList'
import User from './components/User'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import { Button, Nav, Navbar } from 'react-bootstrap'
import Footer from './components/Footer'

const App = (props) => {
  const blogFormRef = React.createRef()

  useEffect(() => {
    props.initializeBlogs()
  }, [])

  useEffect(() => {
    props.initializeUser()
  }, [])

  useEffect(() => {
    props.initializeUsers()
  }, [props.blogs])

  const navigationStyle = { background: 'lightgray', padding: '15px', margin: '0 0 30px 0', borderRadius: '6px' }
  const navLinkStyle = { margin: '0 15px 0 0', fontSize: '20px' }

  return (
    <div className="container">
      <Router basename={process.env.PUBLIC_URL}>
        <Navbar collapseOnSelect expand="lg" style={ navigationStyle }>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="mr-auto">
              <Nav.Link href="#" as="span">
                <Link style={ navLinkStyle } to="/">Home</Link>
              </Nav.Link>
              <Nav.Link href="#" as="span">
                <Link style={ navLinkStyle } to="/users">Users</Link>
              </Nav.Link>
            </Nav>
            { props.user ? (
              <Nav>
                <em>{ props.user.name } logged in <Button variant="secondary" size="sm" onClick={() => { props.logout() }}>Log out</Button></em>
              </Nav>
            ) : (
              <Nav>
                <Link to="/login">
                  <Button variant="secondary" size="sm">Log in / Register</Button>
                </Link>
              </Nav>
            )
            }
          </Navbar.Collapse>
        </Navbar>
        <Notification />
        <Route exact path="/login" render={() => <LoginForm /> } />
        <Route exact path="/register" render={() => <RegistrationForm /> } />
        <Route exact path="/users" render={() => <UserList />} />
        <Route exact path="/users/:id" render={ ({ match }) =>
          <User user={ props.users.find(user => user.id === match.params.id) } /> }
        />
        <Route exact path="/blogs/:id" render={ ({ match }) =>
          <Blog blog={ props.blogs.find(blog => blog.id === match.params.id) } /> }
        />
        <Route exact path="/" render={() =>
          <div>
            <h1>Programming blogs</h1>
            <Togglable ref={ blogFormRef } >
              <BlogForm blogFormRef={ blogFormRef } />
            </Togglable>
            <BlogList />
          </div>
        } />
      </Router>
      <Footer />
    </div>
  )
}

App.propTypes = {
  user: PropTypes.object,
  users: PropTypes.array,
  blogs: PropTypes.array.isRequired,
  initializeUser: PropTypes.func.isRequired,
  initializeUsers: PropTypes.func.isRequired,
  initializeBlogs: PropTypes.func.isRequired,
  logout: PropTypes.func.isRequired
}

const mapStateToProps = (state) => {
  return {
    user: state.user,
    users: state.users,
    blogs: state.blogs
  }
}

export default connect(mapStateToProps, { initializeBlogs, initializeUser, initializeUsers, logout })(App)