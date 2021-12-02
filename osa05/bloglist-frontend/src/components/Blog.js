import React, { useState } from 'react'
import blogService from '../services/blogs'
const Blog = ({ blog, user }) => {
  const [showAllBlogs, setShowAllBlogs] = useState(false)
  const showBlogs = { display: showAllBlogs ? '' : 'none' }

  const blogpost = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const handleViewClick = () => {
    setShowAllBlogs(!showAllBlogs)
  }
  const blogCreator = () => {
    if(user) return (user.username === blog.user.username)

  }

  const handeLikeUpdate = async event => {
    event.preventDefault()
    const likes = blog.likes + 1
    const updatedBlog = { ...blog, likes }
    await blogService.update(blog.id, updatedBlog)
  }
  const handleDelete = async event => {
    event.preventDefault()
    if(window.confirm(`You sure you want to delete blog ${blog.title} by ${blog.author}?`)) {
      await blogService.remove(blog.id)
    }

  }
  return (
    <div style={blogpost}>
      {blogCreator()}
      {blog.title} {blog.author} <button onClick={handleViewClick}>shows</button>
      <div style={showBlogs}>
        <p>{blog.url}</p>
        <p>likes {blog.likes} <button onClick={handeLikeUpdate}>like</button></p>
        <p>{blog.author}</p>
        {blogCreator() === true &&
        <p><button onClick={handleDelete}>delete</button></p>
        }
      </div>
    </div>
  )

}
export default Blog