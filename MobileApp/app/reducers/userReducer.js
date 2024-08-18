// reducers/userReducer.js

const initialState = {
  user: null,
  isLoggedIn: false,
  token: null,
  tokenExpiration: null,
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_USER_SESSION":
      return {
        ...state,
        user: action.payload.user,
        isLoggedIn: true,
        token: action.payload.token,
        tokenExpiration: action.payload.tokenExpiration,
      };
    case "CLEAR_USER_SESSION":
      return {
        ...state,
        user: null,
        isLoggedIn: false,
        token: null,
        tokenExpiration: null,
      };
    default:
      return state;
  }
};

export default userReducer;
