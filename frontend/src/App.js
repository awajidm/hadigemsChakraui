import React, { useEffect } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import AppHeader from "./components/Layout/AppHeader";
import AppFooter from "./components/Layout/AppFooter";

//cart imports
import Cart from "./components/Cart/Cart";
import Shipping from "./components/Cart/Shipping";
import ConfirmOrder from "./components/Cart/ConfirmOrder";
import Payment from "./components/Cart/Payment";
import OrderSuccess from "./components/Cart/OrderSuccess";

//order imports
import ListOrders from "./components/Order/ListOrders";
import OrderDetails from "./components/Order/OrderDetails";

import Home from "./components/Home/Home";
import ProductDetails from "./components/Product/ProductDetails";

//auth or user imports
import Login from "./components/User/Login";
import Register from "./components/User/Register";
import Profile from "./components/User/Profile";
import UpdateProfile from "./components/User/UpdateProfile";
import UpdatePassword from "./components/User/UpdatePassword";
import ForgotPassword from "./components/User/ForgotPassword";
import NewPassword from "./components/User/NewPassword";

//admin imports
import Dashboard from "./components/Admin/Dashboard";
import AdminProducts from "./components/Admin/ProductList";

import ProtectedRoute from "./components/routes/ProtectedRoute";
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
      <ProtectedRoute path="/confirm" component={ConfirmOrder} />
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
      <ProtectedRoute path="/orders/me" component={ListOrders} exact />
      <ProtectedRoute path="/order/:id" component={OrderDetails} exact />

      <ProtectedRoute
        path="/dashboard"
        isAdmin={true}
        component={Dashboard}
        exact
      />
      <ProtectedRoute
        path="/admin/products"
        isAdmin={true}
        component={AdminProducts}
        exact
      />

      <AppFooter />
    </Router>
  );
}

export default App;
