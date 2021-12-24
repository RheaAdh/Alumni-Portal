import React, { useEffect, useContext, useState } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Community from "./components/pages/Community";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import Profile from "./components/pages/Profile";
import Feed from "./components/pages/Feed";
import Messages from "./components/pages/Messages";
import Bookmarks from "./components/pages/Bookmarks";
import ForgotPassword from "./components/auth/ForgotPassword";
import ResetPassword from "./components/auth/ResetPassword";
import NotFound from "./components/pages/NotFound";
import AdminPage from "./components/admin/AdminPage";
import OtherProfile from "./components/pages/OtherProfile";
import RandomPost from "./components/pages/RandomPost";
import PrivateRoute from "./components/PrivateRoute";
import Post from "./components/Post";
import { useAuth } from "./context/AuthContext";

import Verified from "./components/Verified";
import VerifyAgain from "./components/auth/VerifyAgain";

const App = () => {
    const auth = useAuth();
    // const history = useHistory();   Can be operated from Navigation Bar
    const [isloggedIn, setIsLoggedIn] = useState(false);

    return (
        <React.Fragment>
            <Switch>
                {/* Private Routes */}
                <PrivateRoute exact path={"/"} component={Feed}></PrivateRoute>
                <PrivateRoute
                    path="/community"
                    component={Community}
                ></PrivateRoute>
                <PrivateRoute path="/chat" component={Messages}></PrivateRoute>
                <PrivateRoute
                    exact
                    path="/profile"
                    component={Profile}
                ></PrivateRoute>
                <PrivateRoute
                    path="/saved"
                    component={Bookmarks}
                ></PrivateRoute>
                <PrivateRoute
                    exact
                    path="/profile/:username"
                    component={OtherProfile}
                ></PrivateRoute>
                <PrivateRoute
                    exact
                    path="/post/:postid"
                    component={RandomPost}
                ></PrivateRoute>
                <PrivateRoute
                    path="/admin"
                    component={AdminPage}
                ></PrivateRoute>
                <PrivateRoute
                    path="/post/:postid"
                    component={Post}
                ></PrivateRoute>
                {/* Public routes */}
                <Route
                    path="/forgotpassword"
                    component={ForgotPassword}
                ></Route>
                <Route
                    path="/resetpassword/:token"
                    component={ResetPassword}
                ></Route>
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
