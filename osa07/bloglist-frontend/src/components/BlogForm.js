import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createBlog } from '../reducers/blogReducer';
const BlogForm = () => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [url, setUrl] = useState('');

  const dispatch = useDispatch();

  const handeAuthorChange = (event) => {
    //console.log(event.target.value);
    setAuthor(event.target.value);
  };
  const handeTitleChange = (event) => {
    //console.log(event.target.value);
    setTitle(event.target.value);
  };
  const handeUrlChange = (event) => {
    //console.log(event.target.value);
    setUrl(event.target.value);
  };
  const addBlog = (event) => {
    event.preventDefault();

    dispatch(createBlog(
      {
        author,
        title,
        url
      }
    ));
    setTitle('');
    setAuthor('');
    setUrl('');
  };

  return (
    <div>
      <h2>Add new post</h2>
      <form onSubmit={addBlog}>
        <div>
        title: <input
            id='title'
            type="text"
            value={title}
            name="Title"
            onChange={handeTitleChange}
          />
          <div>
        author: <input
              id='author'
              type="text"
              value={author}
              name="Author"
              onChange={handeAuthorChange}
            />
          </div>
          <div>
                 url: <input
              id='url'
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
  );};

export default BlogForm;