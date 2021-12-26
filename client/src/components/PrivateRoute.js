import React, { useEffect } from "react";
import { Redirect, Route, useLocation } from "react-router-dom";

import { useAuth } from "../context/AuthContext";

export default function PrivateRoute({ component: Component, ...rest }) {
  const auth = useAuth();
  useEffect(() => {
    console.log("private route use effect");
  }, []);
  return (
    // Show the component only when the user is logged in
    // Otherwise, redirect the user to /signin page
    <Route
      {...rest}
      render={(props) =>
        auth.user == null ? <Redirect to="/login" /> : <Component {...props} />
      }
    />
  );
}
