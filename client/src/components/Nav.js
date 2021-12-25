import React, { useContext, useEffect, useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import { TOKEN_ID } from "../utils/constants";

const Nav = () => {
  const auth = useAuth();
  const history = useHistory();
  const location = useLocation();
  const [username, setUsername] = useState("");
  let [user, setUser] = useState(null);

  useEffect(() => {
    axios({
      method: "get",
      url: "/api/auth/getuser",
      headers: {
        "Content-type": "application/json",
        "x-auth-token": `${localStorage.getItem(TOKEN_ID)}`,
      },
    })
      .then((result) => {
        console.log("....");
        console.log(result.data.data.username);
        setUsername(result.data.data.username);
        setUser(result.data.data);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="nav">
      <div
        className={`nav-link ${location.pathname === "/" ? "active" : ""}`}
        onClick={() => history.push("/")}
      >
        <span className="fas fa-home"></span>
        <span className="nav-label">About Us</span>
      </div>

      {user ? (
        <div
          class={`nav-link ${
            location.pathname === "/community" ? "active" : ""
          }`}
          onClick={() => history.push("/community")}
        >
          <span className="fas fa-user-friends"></span>
          <span className="nav-label">Members</span>
        </div>
      ) : null}

      {user ? (
        <div
          className={`nav-link ${
            location.pathname === "/gallery" ? "active" : ""
          }`}
          onClick={() => history.push("/gallery")}
        >
          <span className="fas fa-images"></span>
          <span className="nav-label">Gallery</span>
        </div>
      ) : null}

      {user ? (
        <div
          className={`nav-link ${
            location.pathname === "/profile" ? "active" : ""
          }`}
          onClick={() => history.push("/profile")}
        >
          <span className="fas fa-user-circle"></span>
          <span className="nav-label">Profile</span>
        </div>
      ) : null}

      {user ? (
        <div
          className={`nav-link ${
            location.pathname === "/logout" ? "active" : ""
          }`}
          onClick={auth.logout}
        >
          <span className="fas fa-sign-out-alt"></span>
          <span className="nav-label">Logout</span>
        </div>
      ) : null}

      {user ? (
        user.isAdmin ? (
          <div
            className={`nav-link ${
              location.pathname === "/admin" ? "active" : ""
            }`}
            onClick={() => history.push("/admin")}
          >
            <span className="fas fa-lock"></span>
            <span className="nav-label">Admin</span>
          </div>
        ) : null
      ) : null}

      {!user ? (
        <div
          className={`nav-link ${
            location.pathname === "/register" ? "active" : ""
          }`}
          onClick={() => history.push("/register")}
        >
          <span className="fas fa-lock"></span>
          <span className="nav-label">Register</span>
        </div>
      ) : null}

      {!user ? (
        <div
          className={`nav-link ${
            location.pathname === "/login" ? "active" : ""
          }`}
          onClick={() => history.push("/login")}
        >
          <span className="fas fa-lock"></span>
          <span className="nav-label">Login</span>
        </div>
      ) : null}

      <button
        style={{ backgroundColor: "yellow" }}
        onClick={() => {
          console.log("theme change");
        }}
      >
        Toggle Theme
      </button>
    </div>
  );
};

export default Nav;
