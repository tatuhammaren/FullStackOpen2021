import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
//import BlogForm from './components/BlogForm'
import LoginForm from './components/LoginForm'
import blogService from './services/blogs'
import loginService from './services/login'
import NotificationMessage from './components/NotificationMessage'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  const [errorMessage, setErrorMessage] = useState(null)
  const [successMessage, setSuccessMessage] = useState(null)


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
const handeLogin = async (event) => {
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
const handleBlogAdd = async event => {
  event.preventDefault()
  console.log('moro');
  const newBlog = {title: title, author: author, url: url}
  blogService.create(newBlog).then(b => {
    setBlogs(blogs.concat(b))
    setSuccessMessage(`Blog ${title} by ${author} was added!`)
    setTimeout(() => {
      setSuccessMessage(null)
    }, 3000)
    setTitle('')
    setAuthor('')
    setUrl('')
  })


}
const handeLogout = async event => {
  event.preventDefault()
  try {
    setSuccessMessage('logging out...')
    setTimeout(() => {
      setSuccessMessage(null)
    }, 200);
    window.localStorage.removeItem('loggedUser')
    setUser(null)
  } catch(e) {
    setErrorMessage('logout failed... try again')
    setTimeout(() => {
      setErrorMessage(null)
    }, 300);
  }
}
const blogForm = () => (
  <div>
  <h2>Add new post</h2>
  <form onSubmit={handleBlogAdd}>
  <div>
      title: <input
      type="text"
      value={title}
      name="Title"
      onChange={({target}) => setTitle(target.value)}
       />
    </div>
    <div>
      author: <input
      type="text"
      value={author}
      name="Author"
      onChange={({target}) => setAuthor(target.value)}
       />
       </div>
       <div>
               url: <input
        type="text"
        value={url}
        name="Link"
        onChange={({target}) => setUrl(target.value)}
       />
  </div>
  <button type="submit"> add blog </button>
  </form>
  </div>
)


  return (
    <div>
        <h1>blogs</h1>
        <NotificationMessage successMsg={successMessage} errorMsg={errorMessage} />
        {user === null && <LoginForm 
        handeLogin={handeLogin} 
        username={username}
        setPassword={setPassword} 
        password={password}
        setUsername={setUsername}
        />}
      {user !== null && 
      <div>
      <p>{user.name} logged in! <button onClick={handeLogout}> log out</button> </p>

      {blogForm()}
      </div>}
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
      
  )
}

export default App