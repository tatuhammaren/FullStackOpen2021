import React, {useState} from "react";


const BlogForm = () => (
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
        author: <input
        type="text"
        value={author}
        name="Author"
        onChange={({target}) => setAuthor(target.value)}
         />
                 title: <input
        type="url"
        value={url}
        name="Link"
        onChange={({target}) => setUrl(target.value)}
         />
    </div>

    </form>
    </div>
)

export default BlogForm