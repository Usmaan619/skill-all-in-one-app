// reducer

import {
  SET_IS_LOGGED_IN,
  SET_NET_INFO,
  SET_TOKEN,
  SET_USER_TYPE,
} from "../actions/action";

const initialState = {
  token: null,
  isNetConnected: false,
  isLoggingIn: false,
  userType: null,
};

export const AuthReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_USER_TYPE:
      return {
        ...state,
        userType: action.payload,
      };
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
