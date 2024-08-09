// reducer.js

import { SET_HEADER_SCROLL } from "../actions/action";

const initialState = {
  headerScroll: false,
};

const scrollReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_HEADER_SCROLL:
      return {
        ...state,
        headerScroll: action.payload,
      };
    default:
      return state;
  }
};

export default scrollReducer;
