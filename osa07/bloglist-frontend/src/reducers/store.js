import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

import notificationReducer from './notificationReducer';
import blogReducer from './blogReducer';
import authenticationReducer from './authenticationReducer';
import usersReducer from './usersReducer';
const reducer = combineReducers(
  {
    user: authenticationReducer,
    blogs: blogReducer,
    notification: notificationReducer,
    users: usersReducer
  }
);

const store = createStore(
  reducer,
  composeWithDevTools(applyMiddleware(thunk))
);

export default store;