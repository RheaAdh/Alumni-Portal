import React, { useState } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import AboutUs from "./pages/AboutUs";
import Admin from "./pages/Admin";
import Events from "./pages/Events";
import Gallery from "./pages/Gallery";
import Members from "./pages/Members";
import NotFound from "./pages/NotFound";
import OtherProfile from "./pages/OtherProfile";
import Profile from "./pages/Profile";

import Register from "./pages/auth/Register";
import Login from "./pages/auth/Login";
import ForgotPassword from "./pages/auth/ForgotPassword";
import ResetPassword from "./pages/auth/ResetPassword";
import VerifyAgain from "./pages/auth/VerifyAgain";

import PrivateRoute from "./components/PrivateRoute";
import Verified from "./components/Verified";
import { useAuth } from "./context/AuthContext";
const App = () => {
  const [isloggedIn, setIsLoggedIn] = useState(false);
  const auth = useAuth();
  return (
    <React.Fragment>
      <Switch>
        {/* Private Routes */}

        <PrivateRoute path="/events" component={Events}></PrivateRoute>
        <PrivateRoute path="/members" component={Members}></PrivateRoute>
        <PrivateRoute path="/gallery" component={Gallery}></PrivateRoute>
        <PrivateRoute exact path="/profile" component={Profile}></PrivateRoute>
        <PrivateRoute
          exact
          path="/users/:username"
          component={OtherProfile}
        ></PrivateRoute>
        <PrivateRoute path="/admin" component={Admin}></PrivateRoute>

        {/* Public routes */}
        <Route exact path="/" component={AboutUs}></Route>
        <Route path="/forgotpassword" component={ForgotPassword}></Route>
        <Route path="/resetpassword/:token" component={ResetPassword}></Route>
        <Route path="/register" component={Register}></Route>
        <Route path="/login" component={Login}></Route>
        <Route path="/verifyemail/:token" component={Verified}></Route>
        <Route path="/verifyagain" component={VerifyAgain}></Route>
        <Route path="*" component={NotFound} />
      </Switch>
    </React.Fragment>
  );
};

export default App;
