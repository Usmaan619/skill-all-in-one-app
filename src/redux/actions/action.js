// actions.js

export const SET_TOKEN = "SET_TOKEN";
export const SET_IS_LOGGED_IN = "SET_IS_LOGGED_IN";
export const SET_NET_INFO = "SET_NET_INFO";

export const SetIsLoggedIn = (data) => ({
  type: SET_IS_LOGGED_IN,
  payload: data,
});

export const SetToken = (data) => ({
  type: SET_TOKEN,
  payload: data,
});

export const SetNetInfo = (data) => ({
  type: SET_NET_INFO,
  payload: data,
});
