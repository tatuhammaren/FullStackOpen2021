import React, { useEffect, useRef } from 'react';
import { Routes, Route, Link, useMatch } from 'react-router-dom';
import Blog from './components/Blog';
import Toggable from './components/Toggable';
import BlogForm from './components/BlogForm';
import { initBlogs } from './reducers/blogReducer';
import { initUser } from './reducers/authenticationReducer';
import { useDispatch, useSelector } from 'react-redux';
import NotificationMessage from './components/NotificationMessage';
import { initUsers } from './reducers/usersReducer';
import SingleUserPage from './components/SingleUserPage';
import UsersPage from './components/UsersPage';
import Header from './components/Header';
const App = () => {
  // const [blogs, setBlogs] = useState([])
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const blogs = useSelector((state) => state.blogs);
  const users = useSelector((state) => state.users);



  const blogFromRef = useRef();
  useEffect(() => {
    dispatch(initUser());


  }, [dispatch]);

  useEffect(() => {
    dispatch(initBlogs());
  }, [dispatch]);

  useEffect(() => {
    dispatch(initUsers());
  }, [dispatch]);



  const blogForm = () => (
    <Toggable buttonLabel="add blog" ref={blogFromRef}>
      <BlogForm />
    </Toggable>
  );
  const blogList = () => {
    return (
      <div className='blogPost'>
        <ul>
          {blogs
            .sort((a, b) => b.likes - a.likes)
            .map(blog =>
              <li key={blog.id} >
                <Link to={`/blogs/${blog.id}`}>{blog.title} </Link>
              </li>
            )}
        </ul>

      </div>
    );
  };

  const Home = () => {
    return (
      <div>
        {blogList()}
      </div>
    );
  };

  const userMatch = useMatch('/users/:id');
  const userp = userMatch ? users.find(u => u.id === userMatch.params.id) : null;
  const blogMatch = useMatch('/blogs/:id');
  const blogp = blogMatch ? blogs.find(b => b.id === blogMatch.params.id) : null;

  return (
    <div>
      <div>
        <Header></Header>
        <h1>blogi-appsukka</h1>
        <NotificationMessage />
      </div>

      <div>
        {user !== null ? blogForm() : null }
      </div>
      <div>
        <Routes>
          <Route path="/users" element={<UsersPage users={users} />}/>
          <Route path="/users/:id" element = {<SingleUserPage user={userp}/>} ></Route>
          <Route path="/blogs/:id" element={<Blog blog={blogp} />}></Route>
          <Route path="/" element={ <Home />} />
        </Routes>
      </div>
    </div>

  );
};

export default App;