const initialState = {
  message: "",
  timeout: setTimeout(() => {}, 0)
};

const reducer = (state = initialState, action) => {
  switch(action.type) {
    case "SET_NOTIFICATION":
      clearTimeout(state.timeout);
      const newState = {
        message: action.message,
        timeout: action.timeout
      }
      return newState;
    case "CLEAR_NOTIFICATION":
      return initialState;
    default:
      return state;
  };
};

export const setNotification = (message, time) => {
  return dispatch => {
    const timeout = setTimeout(() => dispatch({
      type: "CLEAR_NOTIFICATION"
    }), time * 1000);
    dispatch({
      type: "SET_NOTIFICATION",
      message,
      timeout
    });
  };
};

export default reducer;