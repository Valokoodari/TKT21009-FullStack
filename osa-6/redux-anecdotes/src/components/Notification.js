import React from "react";
import { connect } from "react-redux";

const Notification = (props) => {
  if (props.message === "") return null;

  const style = {
    border: "solid",
    padding: 10,
    borderWidth: 1
  };

  return (
    <div style={style}>
      {props.message}
    </div>
  );
};

const mapStateToNotification = (state) => {
  return {
    message: state.notification.message
  };
};

const connectedNotification = connect(mapStateToNotification)(Notification);
export default connectedNotification;