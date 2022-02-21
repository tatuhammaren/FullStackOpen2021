import blogService from '../services/blogs';
import { showNotifcation } from './notificationReducer';


const blogReducer = (state = [], action) => {
  //console.log('state now: ', state);
  //console.log('action', action);

  switch(action.type){
  case 'CREATE_BLOG':
    return [...state, action.data];
  case 'INIT_BLOGS':
    return action.data;
  case 'LIKE_BLOG':
  case 'ADD_COMMENT':
    return state.map(blog =>  {
      console.log();
      return blog.id !== action.data.id ? blog : action.data; }
    );
  case 'DELETE_BLOG':
    return state.filter(blog => {
      return blog.id !== action.data;}
    );

  default: return state;
  }
};


export const initBlogs = () => {
  return async (dispatch) => {
    let blogs = await blogService.getAll();
    dispatch(
      {
        type: 'INIT_BLOGS',
        data: blogs
      }
    );
  };
};
export const createBlog = (blogObject) => {
  return async (dispatch) => {
    let blog = await blogService.create(blogObject);
    dispatch(
      {
        type: 'CREATE_BLOG',
        data: blog
      });
  };
};
export const AddComment = (id, comment) => {
  return async (dispatch) => {
    let blog = await blogService.addComment(id, comment);
    dispatch(
      {
        type: 'ADD_COMMENT',
        data: blog
      }
    );
  };

};
export const deleteBlog = (id) => {
  return async(dispatch) => {
    try {
      await blogService.remove(id);
      dispatch(
        {
          type: 'DELETE_BLOG',
          data: id
        }
      );

    } catch (e) {
      dispatch(showNotifcation('Removing blog failed', 'error', 3));
    }


  };
};

export const likeBlog = (blogObject) => {
  return async (dispatch) => {
    let blog = await blogService.update(blogObject.id, { ...blogObject, likes: blogObject.likes + 1 });
    dispatch(
      {
        type: 'LIKE_BLOG',
        data: blog
      }
    );
  };

};





export default blogReducer;