import { toastSuccess } from "../../services/Toaster.service";
import {
  ADD_TO_CART,
  CART_TOTAL_ITEM,
  CART_TOTAL_PRICE,
  CLEAR_CART,
  REMOVE_ITEM,
  SET_DECREMENT,
  SET_INCREMENT,
} from "../actions/action";

const initialState = {
  cart: [],
  total_item: 0,
  total_price: 0,
};

const CartReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TO_CART: {
      const { amount, singleProduct } = action.payload;

      toastSuccess("Add to cart successfully");

      const existingProduct = state.cart.find(
        (curItem) => curItem.id === singleProduct.id
      );

      if (existingProduct) {
        const updatedProduct = state.cart.map((curElem) => {
          if (curElem.id === singleProduct.id) {
            let newAmount = curElem.amount + amount;
            if (newAmount >= curElem.max) {
              newAmount = curElem.max;
            }
            return {
              ...curElem,
              amount: newAmount,
            };
          }
          return curElem;
        });
        return {
          ...state,
          cart: updatedProduct,
        };
      } else {
        const cartProduct = {
          id: singleProduct.id,
          name: singleProduct.name,
          amount,
          price: singleProduct.price,
          max: singleProduct.stock,
        };
        return {
          ...state,
          cart: [...state.cart, cartProduct],
        };
      }
    }

    case SET_DECREMENT: {
      const updatedProduct = state.cart.map((curElem) => {
        if (curElem.id === action.payload) {
          let decAmount = curElem.amount - 1;
          if (decAmount <= 1) {
            decAmount = 1;
          }
          return {
            ...curElem,
            amount: decAmount,
          };
        }
        return curElem;
      });
      return { ...state, cart: updatedProduct };
    }

    case SET_INCREMENT: {
      const updatedProduct = state.cart.map((curElem) => {
        if (curElem.id === action.payload) {
          let incAmount = curElem.amount + 1;
          if (incAmount >= curElem.max) {
            incAmount = curElem.max;
          }
          return {
            ...curElem,
            amount: incAmount,
          };
        }
        return curElem;
      });
      return { ...state, cart: updatedProduct };
    }

    case CART_TOTAL_ITEM: {
      const updatedItemVal = state.cart.reduce((initialVal, curElem) => {
        const { amount } = curElem;
        return initialVal + amount;
      }, 0);
      return {
        ...state,
        total_item: updatedItemVal,
      };
    }

    case CART_TOTAL_PRICE: {
      const total_price = state.cart.reduce((initialVal, curElem) => {
        const { price, amount } = curElem;
        return initialVal + price * amount;
      }, 0);
      return {
        ...state,
        total_price,
      };
    }

    case REMOVE_ITEM: {
      const updatedCart = state.cart.filter(
        (curItem) => curItem.id !== action.payload
      );
      toastSuccess("Item has been removed");
      return {
        ...state,
        cart: updatedCart,
      };
    }

    case CLEAR_CART: {
      return {
        ...state,
        cart: [],
      };
    }

    default:
      return state;
  }
};

export default CartReducer;
