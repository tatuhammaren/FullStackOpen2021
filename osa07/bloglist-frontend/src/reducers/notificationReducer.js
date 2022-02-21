let TimeId = 0;
const notificationReducer = (state = { message: null, notificationType: null }, action) => {
  switch (action.type){
  case 'SET_NOTIFICATION':
    return action.data;
  case 'HIDE_NOTIFICATION':
    return action.data;
  default: return state;
  }

};

export const showNotifcation = (message, notificationType, time) => {
  return async dispatch => {
    clearTimeout(TimeId);
    dispatch({
      type: 'SET_NOTIFICATION',
      data:
      {
        message, notificationType
      }
    });


    TimeId = setTimeout(() => {
      dispatch(
        {
          type: 'HIDE_NOTIFICATION',
          data:
          {
            message: null, notificationType: null
          }
        });
    }, time);
  };
};


export default notificationReducer;