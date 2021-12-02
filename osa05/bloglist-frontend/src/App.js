import React, { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
//import BlogForm from './components/BlogForm'
import LoginForm from './components/LoginForm'
import blogService from './services/blogs'
import loginService from './services/login'
import NotificationMessage from './components/NotificationMessage'
import Toggable from './components/Toggable'
import BlogForm from './components/BlogForm'


const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [errorMessage, setErrorMessage] = useState(null)
  const [successMessage, setSuccessMessage] = useState(null)

  const blogFromRef = useRef()

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )
  }, [])
  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      // console.log(user)
      blogService.setToken(user.token)
    }
  }, [])
  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({
        username, password
      })
      window.localStorage.setItem(
        'loggedUser', JSON.stringify(user)
      )
      //       console.log(user)
      setUser(user)

    } catch (exception) {
      setErrorMessage('wrong username / password')
      setTimeout(() => {
        setErrorMessage(null)
      }, 3000)
    }
    setUsername('')
    setPassword('')
  }
  const addBlog = (blogObject) => {
    blogFromRef.current.toggleVisibility()
    blogService.create(blogObject).then(b => {
      setBlogs(blogs.concat(b))
      setSuccessMessage(`Blog ${blogObject.title} by ${blogObject.author} was added!`)
      setTimeout(() => {
        setSuccessMessage(null)
      }, 3000)
    }).catch(e => {
      setErrorMessage(e.errorMessage)
      setTimeout(() => {
        setErrorMessage(null)
      }, 3000)
    })


  }

  const handleLogout = async () => {
    try {
      setSuccessMessage('logging out...')
      setTimeout(() => {
        setSuccessMessage(null)
      }, 200)
      window.localStorage.removeItem('loggedUser')
      setUser(null)
    } catch(e) {
      setErrorMessage('logout failed... try again')
      setTimeout(() => {
        setErrorMessage(null)
      }, 300)
    }
  }
  const handleLikeUpdate = async (blogId, likeCount) => {
    await blogService.update(blogId,
      {
        likes: likeCount + 1
      }
    )
  }

  const blogForm = () => (
    <Toggable buttonLabel="add blog" ref={blogFromRef}>
      <BlogForm
        createBlog={addBlog}
      />
    </Toggable>
  )
  const blogList = () => {
    return (
      <div>
        {blogs
          .sort((a, b) => b.likes - a.likes)
          .map(blog =>
            <Blog key={blog.id} blog={blog} user={user} handleLikes={handleLikeUpdate}/>
          )}
      </div>
    )
  }
  const loginForm = () => (
    <Toggable buttonLabel='login'>
      <LoginForm
        handleLogin={handleLogin}
        username={username}
        handlePasswordChange={({ target }) => setPassword(target.value)}
        password={password}
        handleUsernameChange={({ target }) => setUsername(target.value)}
      />
    </Toggable>
  )

  return (
    <div>
      <h1>blogs</h1>
      <NotificationMessage successMsg={successMessage} errorMsg={errorMessage} />
      <div>
        {user === null ?
          loginForm() :
          <div>
            <p>{user.name} logged in! <button onClick={handleLogout}> log out</button> </p>
            {blogForm()}
          </div>
        }
        {blogList()}
      </div>
    </div>

  )
}

export default App