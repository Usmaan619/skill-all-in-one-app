import { combineReducers } from "redux";
import { AuthReducer } from "./reducers/reducer";
import LoaderReducer from "./reducers/loader.reducer";
import CartReducer from "./reducers/cart.reducer";
import scrollReducer from "./reducers/scroll.reducer";

export const rootReducer = combineReducers({
  /**
   * Add other reducers here if needed
   * */
  AuthReducer,
  loader: LoaderReducer,
  cart: CartReducer,
  scrollReducer,
});
