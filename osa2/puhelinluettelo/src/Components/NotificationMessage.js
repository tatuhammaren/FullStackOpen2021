import React from 'react';



const NotificationMessage = ({errorMsg, successMsg}) => {
    if (errorMsg === null && successMsg === null) {
        return null;
    }
    if (successMsg) {
        return (
            <div className="successMsg">
                {successMsg}
            </div>
        )
    }
    else {
        return (
            <div className="errorMsg">
            {errorMsg}
        </div>
        )
    }

}




export default NotificationMessage