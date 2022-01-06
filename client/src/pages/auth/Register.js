import React, { useState, useContext, useEffect } from "react";
import { Redirect, useHistory } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../../context/AuthContext";
import toast, { Toaster } from "react-hot-toast";

const Register = () => {
  const auth = useAuth();

  const history = useHistory();
  const [username, setUsername] = useState("");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  // const [err, setErr] = useState("");
  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (fullName == "") {
      toast.error("Please Enter your Name");
      return;
    }
    if (username == "") {
      toast.error("Please Enter your userame");
      return;
    }
    const regex1 = /^[a-zA-Z0-9]([._-](?![._-])|[a-zA-Z0-9]){3,18}[a-zA-Z0-9]$/;

    if (!regex1.test(String(username))) {
      toast.error("Invalid Username");
      return;
    }
    if (email == "") {
      toast.error("Please Enter your Email");
      return;
    }
    const re =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if (!re.test(String(email).toLowerCase())) {
      // setErr("Invalid Email");
      toast.error("Invalid Email");
      return;
    }

    if (password == "") {
      // setErr("Please Enter your Password");
      toast.error("Please Enter your Password");
      return;
    }
    if (password.length < 8) {
      // setErr("try again(min length: 8)");
      toast.error("try again(min length: 8)");
      return;
    }
    if (confirmPassword !== password) {
      toast.error("Password doesnt match Confirm Password");
      // setErr("Password doesnt match Confirm Password");
      return;
    }
    axios({
      method: "post",
      url: "https://primus-alumni-portal.herokuapp.com/api/auth/register",
      data: {
        fullName,
        email,
        username,
        password,
      },
    })
      .then((result) => {
        console.log(result);
        if (result.data.success === true) {
          toast.success("Verification Link Sent");
        } else {
          // setErr(result.data.data);
          toast.error(result.data.data);
        }
        console.log(result.data.data);
      })
      .catch((err) => console.log(err));
    console.log("in submit");
  };

  return (
    <div className="register">
      <Toaster position="top-left" reverseOrder={false} />
      <div className="shade"></div>
      <div className="overlay">
        <div className="container">
          <div className="left-container">
            <div
              style={{
                color: "#FEC737",
                fontWeight: "bold",
                fontSize: "3rem",
              }}
            >
              <b> ALUMNI</b>
            </div>
            <div
              style={{
                color: "white",
                fontWeight: "normal",
                fontSize: "3rem",
              }}
            >
              PORTAL
            </div>
            <hr></hr>
            <div
              style={{
                color: "white",
                fontWeight: "normal",
                fontSize: "1rem",
              }}
            >
              Welcome to Primus Almuni Portal
            </div>
          </div>
          <div className="right-container">
            <h2>Register</h2>
            <form onSubmit={handleFormSubmit}>
              <div>
                <input
                  placeholder="Full name"
                  type="text"
                  onChange={(e) => setFullName(e.target.value)}
                ></input>
              </div>
              <div>
                <input
                  placeholder="Username(no space)"
                  type="text"
                  onChange={(e) => setUsername(e.target.value)}
                ></input>
              </div>
              <div>
                <input
                  placeholder="Email"
                  type="text"
                  onChange={(e) => setEmail(e.target.value)}
                ></input>
              </div>
              <div>
                <input
                  placeholder="Password"
                  type="password"
                  onChange={(e) => setPassword(e.target.value)}
                ></input>
              </div>
              <div>
                <input
                  placeholder="Confirm Password"
                  type="password"
                  onChange={(e) => setConfirmPassword(e.target.value)}
                ></input>
              </div>
              {/* <div
                                style={{
                                    color: "red",
                                    fontWeight: "bold",
                                    fontSize: "0.75rem",
                                }}
                            >
                                {err}
                            </div> */}
              <button type="submit">Register</button>
            </form>
            <span style={{ color: "grey" }}>Already registered?</span>
            <span>
              <a
                href="/login"
                style={{
                  color: "#fec737",
                  fontWeight: "bold",
                }}
              >
                Login
              </a>
            </span>
            <span style={{ color: "grey" }}>Didnt get verification link?</span>
            <span>
              <a
                href="/verifyagain"
                style={{
                  color: "#fec737",
                  fontWeight: "bold",
                }}
              >
                Send Verification Link
              </a>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
