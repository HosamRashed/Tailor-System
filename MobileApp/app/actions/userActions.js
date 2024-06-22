// actions/userActions.js

export const setUserSession = (userData) => ({
  type: "SET_USER_SESSION",
  payload: userData,
});

export const clearUserSession = () => ({
  type: "CLEAR_USER_SESSION",
});
