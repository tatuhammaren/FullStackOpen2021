import React from 'react';
import { useDispatch } from 'react-redux';
//import { showNotifcation } from '../reducers/notificationReducer';
import { likeBlog, AddComment } from '../reducers/blogReducer';
import { showNotifcation } from '../reducers/notificationReducer';

const Blog = ({ blog }) => {
  const dispatch = useDispatch();
  if (!blog) return null;
  const handleCommendAdd = async (event) => {
    event.preventDefault();
    console.log(event.target.comment.value);
    const command = event.target.comment.value;
    try {
      dispatch(AddComment(blog.id, command));

    } catch (exception) {
      dispatch(showNotifcation(`commend add failed: ${exception.message()}`));
    }
    event.target.comment.value = '';
  };
  return (
    <div>
      <div  className="titleAndAuthor">
        <h2>{blog.title} {blog.author}</h2>
        <p>{blog.url}</p>
        <p>likes {blog.likes} <button onClick={() => dispatch(likeBlog(blog))}>like</button></p>
        <p>created by{blog.author}</p>
      </div>
      <div>
        <h2>comments</h2>
        <div>
          <form onSubmit={handleCommendAdd}>
            <div>
              <input
                type="text"
                id="comment"
                name="comment"
                placeholder='add new comment'
              />
              <button type="submit"> add </button>
            </div>

          </form>
        </div>
        <ul>
          {
            blog.comments.map((comment, i) =>  {
              return(
                <li key={i}>{comment}</li>
              );})
          }

        </ul>
      </div>
    </div>
  );

};
export default Blog;