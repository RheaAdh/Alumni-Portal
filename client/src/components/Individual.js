import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import { TOKEN_ID } from "../utils/constants";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
const Individual = ({ user }) => {
  const [verified, setVerified] = useState(user.isVerifiedByAdmin);
  const [isAdmin, setIsAdmin] = useState(user.isAdmin);
  const auth = useAuth();

  const BlockUser = (userid) => {
    axios({
      method: "post",
      url: "https://primus-alumni-portal.herokuapp.com/api/admin/blockuser",
      data: {
        userid: userid,
      },
      headers: {
        "Content-type": "application/json",
        "x-auth-token": `${localStorage.getItem(TOKEN_ID)}`,
      },
    })
      .then((result) => {
        console.log(result.data);
        if (result.data.success) {
          console.log("blocked");
          console.log(result.data.data);
          setVerified(false);
        } else {
          console.log("cant");
        }
      })
      .catch((err) => console.log(err));
  };

  const VerifyUser = (userid) => {
    axios({
      method: "post",
      url: "https://primus-alumni-portal.herokuapp.com/api/admin/verifyuser",
      data: {
        userid: userid,
      },
      headers: {
        "Content-type": "application/json",
        "x-auth-token": `${localStorage.getItem(TOKEN_ID)}`,
      },
    })
      .then((result) => {
        if (result.data.success) {
          console.log(result.data.data);
          setVerified(true);
        } else {
          console.log("cant");
        }
      })
      .catch((err) => console.log(err));
  };
  const MakeAdmin = (userid) => {
    axios({
      method: "post",
      url: "https://primus-alumni-portal.herokuapp.com/api/admin/makeadmin",
      data: {
        userid: userid,
      },
      headers: {
        "Content-type": "application/json",
        "x-auth-token": `${localStorage.getItem(TOKEN_ID)}`,
      },
    })
      .then((result) => {
        if (result.data.success) {
          console.log(result.data.data);
          setIsAdmin(true);
        } else {
          console.log("cant");
        }
      })
      .catch((err) => console.log(err));
  };
  const RemoveAdmin = (userid) => {
    axios({
      method: "post",
      url: "https://primus-alumni-portal.herokuapp.com/api/admin/removeadmin",
      data: {
        userid: userid,
      },
      headers: {
        "Content-type": "application/json",
        "x-auth-token": `${localStorage.getItem(TOKEN_ID)}`,
      },
    })
      .then((result) => {
        if (result.data.success) {
          console.log(result.data.data);
          setIsAdmin(false);
        } else {
          console.log("cant");
        }
      })
      .catch((err) => console.log(err));
  };
  return (
    <div style={{ marginTop: "1rem" }} className="individual">
      <div className="name">{user.username}</div>

      <div className="toggle-btn">
        {verified ? (
          <Button
            className="btn"
            variant="contained"
            color="error"
            onClick={() => BlockUser(user._id)}
          >
            Block
          </Button>
        ) : (
          <Button
            className="btn"
            variant="contained"
            color="success"
            onClick={() => VerifyUser(user._id)}
          >
            Accept
          </Button>
        )}
        {!isAdmin ? (
          <Button
            className="btn"
            variant="contained"
            color="success"
            onClick={() => MakeAdmin(user._id)}
          >
            Make Admin
          </Button>
        ) : (
          <Button
            className="btn"
            variant="contained"
            color="error"
            onClick={() => RemoveAdmin(user._id)}
          >
            Remove Admin Access
          </Button>
        )}
      </div>
    </div>
  );
};

export default Individual;
