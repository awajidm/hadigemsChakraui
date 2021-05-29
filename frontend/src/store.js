import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import {
  productReducer,
  productDetailsReducer,
  productCategoryReducer,
} from "./reducers/productReducer";
import {
  authReducer,
  userReducer,
  forgotPasswordReducer,
} from "./reducers/userReducer";
import { newOrderReducer } from "./reducers/orderReducer";

import { cartReducer } from "./reducers/cartReducer";

const reducer = combineReducers({
  products: productReducer,
  productDetails: productDetailsReducer,
  productCategory: productCategoryReducer,
  auth: authReducer,
  user: userReducer,
  forgotPassword: forgotPasswordReducer,
  cart: cartReducer,
  newOrder: newOrderReducer,
});

let intitialState = {
  cart: {
    cartItems: localStorage.getItem(`cartItems`)
      ? JSON.parse(localStorage.getItem(`cartItems`))
      : [],
    shippingInfo: localStorage.getItem(`shippingInfo`)
      ? JSON.parse(localStorage.getItem(`shippingInfo`))
      : {},
  },
};

const middleware = [thunk];
const store = createStore(
  reducer,
  intitialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
