import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import {
  productReducer,
  productDetailsReducer,
  productCategoryReducer,
  newReviewReducer,
  newProductReducer,
} from "./reducers/productReducer";
import {
  authReducer,
  userReducer,
  forgotPasswordReducer,
} from "./reducers/userReducer";
import {
  newOrderReducer,
  myOrdersReducer,
  orderDetailsReducer,
} from "./reducers/orderReducer";

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
  myOrders: myOrdersReducer,
  orderDetails: orderDetailsReducer,
  newReview: newReviewReducer,
  newProduct: newProductReducer,
});

let intitialState = {
  cart: {
    cartItems: localStorage.getItem(`cartItems`)
      ? JSON.parse(localStorage.getItem(`cartItems`))
      : [],
    shippingInfo: localStorage.getItem(`shippingInfo`)
      ? JSON.parse(localStorage.getItem(`shippingInfo`))
      : {},
    paymentInfo: localStorage.getItem(`paymentInfo`)
      ? JSON.parse(localStorage.getItem(`paymentInfo`))
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
