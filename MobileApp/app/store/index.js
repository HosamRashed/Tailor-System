// store/index.js

import { createStore, combineReducers } from "redux";

const initialState = {
  user: null,
  isLoggedIn: false,
  url: "https://87b0-2001-f40-904-457e-65ce-480b-8e2b-dc20.ngrok-free.app",
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
