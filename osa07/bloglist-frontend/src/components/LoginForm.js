import React from 'react';
//import PropTypes from 'prop-types';
import { showNotifcation } from '../reducers/notificationReducer';
import { useDispatch } from 'react-redux';
import { login } from '../reducers/authenticationReducer';
import { initBlogs } from '../reducers/blogReducer';

const LoginForm = () => {

  const    dispatch = useDispatch();
  const handleLogin = async (event) => {
    event.preventDefault();
    const uname = event.target.username.value;
    const pass = event.target.password.value;

    try {
      dispatch(login(uname, pass));
      dispatch(initBlogs);

    } catch (exception) {
      dispatch(showNotifcation(`Login failed: ${exception.message()}`));
    }
    event.target.username.value = '';
    event.target.password.value = '';
  };
  return (
    <div>
      <h2>Log in to application</h2>

      <form onSubmit={handleLogin}>
        <div>
                username <input
            type="text"
            id="username"
            name="Username"
          />
        </div>
        <div>
                password <input
            type="password"
            id="password"
            name="Password"
          />
        </div>
        <button type="submit"> Loggaa sissään </button>
      </form>
    </div>
  );

};


// LoginForm.propTypes = {
//   handleLogin: PropTypes.func.isRequired,
//   handleUsernameChange: PropTypes.func.isRequired,
//   handlePasswordChange: PropTypes.func.isRequired,
//   username: PropTypes.string.isRequired,
//   password: PropTypes.string.isRequired
// };

export default LoginForm;