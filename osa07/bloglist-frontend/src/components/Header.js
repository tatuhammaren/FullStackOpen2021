import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Toggable from './Toggable';
import LoginForm from './LoginForm';
import * as S from './styles';

const Header = () => {
  const user = useSelector((state) => state.user);
  const handleLogout = async () => {
    try {
      /*       setSuccessMessage('logging out...')
      setTimeout(() => {
        setSuccessMessage(null)
      }, 200) */
      window.localStorage.removeItem('loggedUser');
      //setUser(null);
    } catch(e) {
      /*       setErrorMessage('logout failed... try again')
      setTimeout(() => {
        setErrorMessage(null)
      }, 300) */
    }
  };
  const loginForm = () => (
    <Toggable buttonLabel='login'>
      <LoginForm />
    </Toggable>
  );
  return (
    <S.Navbar>
      <Link to="/">blogs  </Link>
      <Link to="/users"> users </Link>
      {user === null ?
        loginForm() :
        <p>{user.name} logged in! <button onClick={handleLogout}> log out</button> </p>
      }
    </S.Navbar>

  );
};

export default Header;