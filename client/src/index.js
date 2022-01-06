import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "./styles/index.css";
import { BrowserRouter } from "react-router-dom";
import AuthProvider from "./context/AuthContext";

ReactDOM.render(
  <BrowserRouter>
    <AuthProvider>
      <App />
    </AuthProvider>
  </BrowserRouter>,
  document.getElementById("root")
);
