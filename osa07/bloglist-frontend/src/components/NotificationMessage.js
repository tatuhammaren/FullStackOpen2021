import React from 'react';
import { useSelector } from 'react-redux';



const NotificationMessage = () => {
  const notification = useSelector(state => state.notification );
  if (notification.notificationType === 'SUCCES') {
    return (
      <div className="successMsg">
        {notification.message}
      </div>
    );
  }
  else if (notification.notificationType === 'ERROR') {
    return (
      <div className="errorMsg">
        {notification.message}
      </div>
    );
  } else if (notification.message === null && notification.notificationType === null) {
    return null;
  }

};

export default NotificationMessage;