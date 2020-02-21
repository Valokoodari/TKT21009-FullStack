import React from "react";
import PropTypes from "prop-types";

const Notification = ({notification}) => {
    if (notification.type === "error") {
        return (
            <div style={{border: "5px solid red", borderRadius: "7px", width: "400px", padding: "10px", backgroundColor: "#BBBBBB"}}>
                {notification.message}
            </div>
        );
    }

    if (notification.type === "success") {
        return (
            <div style={{border: "5px solid green", borderRadius: "7px", width: "400px", padding: "10px", backgroundColor: "#BBBBBB"}}>
                {notification.message}
            </div>
        );
    }

    return null;
};

Notification.propTypes = {
    notification: PropTypes.object.isRequired
};

export default Notification;