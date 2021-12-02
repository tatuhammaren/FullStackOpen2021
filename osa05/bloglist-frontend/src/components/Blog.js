import React, { useState } from 'react'
import blogService from '../services/blogs'
const Blog = ({ blog, user, handleLikes }) => {
  const [showAllBlogs, setShowAllBlogs] = useState(false)

  const blogpost = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const blogCreator = () => {
    if(user) return (user.username === blog.user.username)

  }


  const handleDelete = async event => {
    event.preventDefault()
    if(window.confirm(`You sure you want to delete blog ${blog.title} by ${blog.author}?`)) {
      await blogService.remove(blog.id)
    }

  }
  const fullBlog = () => {
    return (
      <div className="blogPostInfo">
        <p>{blog.url}</p>
        <p>likes {blog.likes} <button onClick={() => handleLikes(blog.id, blog.likes)}>like</button></p>
        <p>{blog.author}
          {blogCreator() === true &&
      <button onClick={handleDelete}>delete</button>
          }</p>

      </div>
    )
  }
  return (
    <div style={blogpost} className="blogPost">
      <div  className="titleAndAuthor">
        {blog.title} {blog.author} <button onClick={() => setShowAllBlogs(!showAllBlogs)}>view</button>
      </div>
      {showAllBlogs && fullBlog()}
    </div>
  )

}
export default Blog