// store/index.js

import { createStore, combineReducers } from "redux";

const initialState = {
  user: null,
  isLoggedIn: false,
  url: "https://59f2-2001-f40-906-2c3e-7cf2-5c58-e574-fe7f.ngrok-free.app",
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_USER_SESSION":
      return {
        ...state,
        user: action.payload,
        isLoggedIn: true,
      };
    case "CLEAR_USER_SESSION":
      return {
        ...state,
        user: null,
        isLoggedIn: false,
      };
    default:
      return state;
  }
};

const rootReducer = combineReducers({
  user: userReducer,
});

const store = createStore(rootReducer);

export default store;
