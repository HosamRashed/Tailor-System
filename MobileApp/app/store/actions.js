// store/actions.js

export const setUserSession = (user) => ({
  type: "SET_USER_SESSION",
  payload: user,
});

export const clearUserSession = () => ({
  type: "CLEAR_USER_SESSION",
});
