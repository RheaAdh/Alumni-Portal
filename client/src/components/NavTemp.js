import React, { useContext, useEffect, useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import { TOKEN_ID } from "../utils/constants";
import Loading from "./Loading";
const Nav = () => {
  const auth = useAuth();
  const history = useHistory();
  const location = useLocation();
  const [username, setUsername] = useState("");
  let [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    console.log("use effect in nav to getuser");
    axios({
      method: "get",
      url: "/api/auth/getuser",
      headers: {
        "Content-type": "application/json",
        "x-auth-token": `${localStorage.getItem(TOKEN_ID)}`,
      },
    })
      .then((result) => {
        if (result.data.success) {
          console.log("....");
          console.log(result.data.data.username);
          setUsername(result.data.data.username);
          setUser(result.data.data);
          setLoading(false);
        } else {
          console.log(result.data.msg);
        }
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
          class={`nav-link ${location.pathname === "/members" ? "active" : ""}`}
          onClick={() => history.push("/members")}
        >
          <span className="fas fa-user-friends"></span>
          <span className="nav-label">Members</span>
        </div>
      ) : null}

      {user ? (
        <div
          class={`nav-link ${location.pathname === "/events" ? "active" : ""}`}
          onClick={() => history.push("/events")}
        >
          <span className="fas fa-calendar"></span>
          <span className="nav-label">Events</span>
        </div>
      ) : null}

      {user ? (
        <div
          class={`nav-link ${
            location.pathname === "/announcements" ? "active" : ""
          }`}
          onClick={() => history.push("/announcements")}
        >
          <span className="fas fa-bullhorn"></span>
          <span className="nav-label">Announcements</span>
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

      <div
        className="nav-link"
        onClick={() => {
          console.log("theme change");
        }}
      >
        <span className="fas fa-sun"></span>
        <span className="nav-label">Theme</span>
      </div>

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
    </div>
  );
};

export default Nav;
