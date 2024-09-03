
export const SET_LOADER = "SET_LOADER";
export const SetLoader = (loaderName, value) => ({
  type: SET_LOADER,
  loaderName,
  value,
});
