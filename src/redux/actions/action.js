// actions.js

export const SET_TOKEN = "SET_TOKEN";
export const SET_IS_LOGGED_IN = "SET_IS_LOGGED_IN";
export const SET_NET_INFO = "SET_NET_INFO";

export const ADD_TO_CART = "ADD_TO_CART";
export const SET_DECREMENT = "SET_DECREMENT";
export const SET_INCREMENT = "SET_INCREMENT";
export const REMOVE_ITEM = "REMOVE_ITEM";
export const CLEAR_CART = "CLEAR_CART";
export const CART_TOTAL_ITEM = "CART_TOTAL_ITEM";
export const CART_TOTAL_PRICE = "CART_TOTAL_PRICE";

export const SET_HEADER_SCROLL = "SET_HEADER_SCROLL";

export const setHeaderScroll = (isScrolled) => ({
  type: SET_HEADER_SCROLL,
  payload: isScrolled,
});

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

export const addToCart = (id, amount, singleProduct) => ({
  type: ADD_TO_CART,
  payload: { id, amount, singleProduct },
});

export const setDecrement = (id) => ({
  type: SET_DECREMENT,
  payload: id,
});

export const setIncrement = (id) => ({
  type: SET_INCREMENT,
  payload: id,
});

export const removeItem = (id) => ({
  type: REMOVE_ITEM,
  payload: id,
});

export const clearCart = () => ({
  type: CLEAR_CART,
});

export const calculateTotalItems = () => ({
  type: CART_TOTAL_ITEM,
});

export const calculateTotalPrice = () => ({
  type: CART_TOTAL_PRICE,
});
