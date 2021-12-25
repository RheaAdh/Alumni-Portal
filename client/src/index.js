import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "./styles/index.css";
import { BrowserRouter } from "react-router-dom";
import dotenv from "dotenv";
import AuthProvider from "./context/AuthContext";
// import ThemeProvider from "./context/ThemeProvider"
import * as serviceWorker from "./serviceWorker";

dotenv.config();

ReactDOM.render(
  <BrowserRouter>
    {/* <ThemeProvider> */}
    <AuthProvider>
      <App />
    </AuthProvider>
    {/* </ThemeProvider> */}
  </BrowserRouter>,
  document.getElementById("root")
);
serviceWorker.register();
