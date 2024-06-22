// store/index.js

import { createStore, combineReducers } from "redux";
import userReducer from "../reducers/userReducer.js";

const rootReducer = combineReducers({
  user: userReducer,
});

const store = createStore(rootReducer);

export default store;
