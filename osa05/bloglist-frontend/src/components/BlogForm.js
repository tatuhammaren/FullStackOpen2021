import React, {useState} from "react";


const BlogForm = ({createBlog}) => {
    const [title, setTitle] = useState('')
    const [author, setAuthor] = useState('')
    const [url, setUrl] = useState('')

    const handeAuthorChange = (event) => {
        //console.log(event.target.value);
          setAuthor(event.target.value)
      }
      const handeTitleChange = (event) => {
        //console.log(event.target.value);
        setTitle(event.target.value)
      }
      const handeUrlChange = (event) => {
        //console.log(event.target.value);
        setUrl(event.target.value)
      }
const addBlog = (event) => {
    event.preventDefault()

    createBlog({
        author: author,
        title: title,
        url: url
    })
    setTitle('')
    setAuthor('')
    setUrl('')
}

return (
    <div>
    <h2>Add new post</h2>
    <form onSubmit={addBlog}>
    <div>
        title: <input
        type="text"
        value={title}
        name="Title"
        onChange={handeTitleChange}
         />
    <div>
        author: <input
        type="text"
        value={author}
        name="Author"
        onChange={handeAuthorChange}
         />
         </div>
         <div>
                 url: <input
        type="text"
        value={url}
        name="URL"
        onChange={handeUrlChange}
         />
         </div>
         <button type="submit">submit</button>
    </div>

    </form>
    </div>
)}

export default BlogForm