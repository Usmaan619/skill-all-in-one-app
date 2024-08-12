import { SET_HEADER_SCROLL } from "../actions/action";

const initialState = {
  headerScroll: false,
};

const scrollReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_HEADER_SCROLL:
      /** don't update state if headerScroll is already false */
      if (!action.payload && !state.headerScroll) return state;

      /** don't update state if headerScroll is already true */
      if (action.payload && state.headerScroll) return state;

      return {
        ...state,
        headerScroll: action.payload,
      };
    default:
      return state;
  }
};

export default scrollReducer;
