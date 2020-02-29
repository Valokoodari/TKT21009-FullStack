const reducer = (state = "", action) => {
  switch(action.type) {
    case "SET_FILTER":
      return action.text.toLowerCase();
    default:
      return state;
  }
};

export const setFilter = (text) => {
  return {
    type: "SET_FILTER",
    text
  }
};

export default reducer;