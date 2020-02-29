import { createStore, combineReducers } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";

import filterReducer from "./reducers/filterReducer";
import anecdoteReducer from "./reducers/anecdoteReducer";
import notificationReducer from "./reducers/notificationReducer";

const reducer = combineReducers({
  filter: filterReducer,
  anecdotes: anecdoteReducer,
  notification: notificationReducer
});

const store = createStore(
  reducer,
  composeWithDevTools()
);

export default store;