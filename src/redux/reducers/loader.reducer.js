import { SET_LOADER } from "../actions/loader.action";

const initialState = {
  sendOtpLoader: false,
  loader: false,
};

const LoaderReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_LOADER:
      return {
        ...state,
        [action.loaderName]: action?.value,
      };

    default:
      return state;
  }
};

export default LoaderReducer;
