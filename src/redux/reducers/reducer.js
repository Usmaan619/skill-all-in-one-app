// reducer

import { SET_IS_LOGGED_IN, SET_NET_INFO, SET_TOKEN } from "../actions/action";

const initialState = {
  token: null,
  isNetConnected: false,
  isLoggingIn: false,
  role: null,
};

export const AuthReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_TOKEN:
      return {
        ...state,
        token: action.payload,
      };
    case SET_IS_LOGGED_IN:
      return {
        ...state,
        isLoggingIn: action.payload,
      };

    case SET_NET_INFO:
      return {
        ...state,
        isNetConnected: action.payload,
      };
    default:
      return state;
  }
};
