
const reducer = (state = null, action) => {
  switch (action.type){
  case 'SET_NOTIFICATION': {
    return action.data.notification
  }
  default: return state
  }

}

export const showNotifcation = (notification, time) => {
  return async dispatch => {
    dispatch({
      type: 'SET_NOTIFICATION',
      data: {
        notification
      } })


    setTimeout(() => {
      dispatch(
        {
          type: 'SET_NOTIFICATION',
          data: {
            notification: null
          }
        }
      )
    }, time)
  }
}


export default reducer