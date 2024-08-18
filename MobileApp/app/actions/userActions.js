// actions/userActions.js

export const setUserSession = (userData, token, tokenExpiration) => ({
  type: "SET_USER_SESSION",
  payload: {
    shopInfo: userData,
    token,
    tokenExpiration,
  },
});

export const clearUserSession = () => ({
  type: "CLEAR_USER_SESSION",
});

// Optional action for handling token expiration
export const handleTokenExpiration = () => ({
  type: "HANDLE_TOKEN_EXPIRATION",
});
