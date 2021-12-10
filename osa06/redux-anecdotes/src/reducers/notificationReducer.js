
const reducer = (state = null, action) => {
  switch (action.type){
  case 'SHOW_NOTIFICATION': {
    return action.data.notification
  }
  default: return state
  }

}

export const showNotifcation = (notification) => {
  // console.log(notification)
  return {
    type: 'SHOW_NOTIFICATION',
    data: {
      notification
    }
  }
}

export default reducer