import loginService from '../services/login';
import blogService from '../services/blogs';


const authenticationReducer = (state = null, action) => {

  switch(action.type){
  case 'LOGIN':
    return action.user;
  case 'LOGOUT':
    return action.user;
  case 'INIT_USER':
    return action.user;
  default:
    return state;
  }
};

export const login = (username, password) => {
  return async (dispatch) => {
    try {
      let user = await loginService.login(
        {
          username,
          password
        }
      );
      blogService.setToken(user.token);
      window.localStorage.setItem('loggedUser', JSON.stringify(user));
      dispatch(
        {
          type: 'LOGIN',
          user:   user
        });
    } catch (e) {
      console.log(e);
    }
  };
};

export const initUser = () => {
  const userFromStorage = window.localStorage.getItem('loggedUser');
  if(userFromStorage) {
    const user = JSON.parse(userFromStorage);
    blogService.setToken(user.token);
    return {
      type: 'INIT_USER',
      user: user
    };
  } else {
    return {
      type: 'INIT_USER',
      user: null
    };
  }

};















export default authenticationReducer;