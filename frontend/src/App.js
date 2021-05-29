import React, { useEffect } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import ProtectedRoute from "./components/routes/ProtectedRoute";

import AppHeader from "./components/Layout/AppHeader";
import AppFooter from "./components/Layout/AppFooter";

import Cart from "./components/Cart/Cart";
import Shipping from "./components/Cart/Shipping";
import ConfirmOrder from "./components/Cart/ConfirmOrder";
import Payment from "./components/Cart/Payment";
import OrderSuccess from "./components/Cart/OrderSuccess";

import Home from "./components/Home/Home";
import ProductDetails from "./components/Product/ProductDetails";
import Login from "./components/User/Login";
import Register from "./components/User/Register";
import Profile from "./components/User/Profile";
import UpdateProfile from "./components/User/UpdateProfile";
import UpdatePassword from "./components/User/UpdatePassword";
import ForgotPassword from "./components/User/ForgotPassword";
import NewPassword from "./components/User/NewPassword";

import { loadUser } from "./actions/userActions";
import store from "./store";

function App() {
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);

  return (
    <Router>
      <AppHeader />
      <Route path="/" component={Home} exact />
      <Route path="/product/:id" component={ProductDetails} exact />

      <Route path="/cart" component={Cart} exact />
      <ProtectedRoute path="/shipping" component={Shipping} />
      <ProtectedRoute path="/order/confirm" component={ConfirmOrder} />
      <ProtectedRoute path="/payment" component={Payment} />
      <ProtectedRoute path="/success" component={OrderSuccess} />

      <Route path="/search/:keyword" component={Home} />
      <Route path="/login" component={Login} />
      <Route path="/register" component={Register} />
      <Route path="/password/forgot" component={ForgotPassword} exact />
      <Route path="/password/reset/:token" component={NewPassword} exact />
      <ProtectedRoute path="/me" component={Profile} exact />
      <ProtectedRoute path="/me/update" component={UpdateProfile} exact />
      <ProtectedRoute
        path="/password/update"
        component={UpdatePassword}
        exact
      />
      <AppFooter />
    </Router>
  );
}

export default App;
