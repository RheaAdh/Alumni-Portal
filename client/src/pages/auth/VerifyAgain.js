import React, { useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

const VerifyAgain = () => {
  const [err, setErr] = useState("");
  const [email, setEmail] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
    axios({
      method: "post",
      url: `/api/auth/reverify`,
      data: {
        email: email,
      },
    }).then((result) => {
      toast.error(result.data.data);
    });
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
            <div
              style={{
                color: "white",
                fontWeight: "normal",
              }}
            >
              Let’s Connect!
            </div>
          </div>
          <div className="right-container">
            <form onSubmit={handleSubmit}>
              <h2>Resend Verfication Link</h2>
              <div>
                <input
                  placeholder="Email ID"
                  type="text"
                  onChange={(e) => setEmail(e.target.value)}
                ></input>
              </div>

              <button type="submit">Send Verification Link</button>
              <span>
                <a
                  href="/login"
                  style={{
                    color: "#fec737",
                    fontWeight: "bold",
                  }}
                >
                  Login?
                </a>
              </span>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VerifyAgain;
