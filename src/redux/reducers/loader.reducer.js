const initialState = {
  sendOtpLoader: false,
  loader: false,
};

const LoaderReducer = (state = initialState, action) => {
  switch (action.type) {
    case true:
      return {
        ...state,
        [action.loaderName]: action?.value,
      };

    default:
      return state;
  }
};

export default LoaderReducer;
