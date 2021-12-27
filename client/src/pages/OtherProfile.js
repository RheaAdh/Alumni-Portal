import React, { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import axios from "axios";
import { TOKEN_ID } from "../utils/constants";

import { useAuth } from "../context/AuthContext";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import GitHubIcon from "@mui/icons-material/GitHub";
import TwitterIcon from "@mui/icons-material/Twitter";
import EmailIcon from "@mui/icons-material/Email";
import LanguageIcon from "@mui/icons-material/Language";

import Nav from "../components/Nav";

const OtherProfile = () => {
  const auth = useAuth();
  const history = useHistory();
  const { username } = useParams();
  const [otherUser, setOtherUser] = useState({});

  useEffect(() => {
    console.log("inside useeffect of other profile");
    axios({
      method: "get",
      url: `/api/users/profile/${username}`,
      headers: {
        "Content-type": "application/json",
        "x-auth-token": `${localStorage.getItem(TOKEN_ID)}`,
      },
    })
      .then((result) => {
        console.log(result.data);
        if (result.data.success) setOtherUser(result.data.data);
        else {
          console.log("ohhono");
        }
      })
      .catch((err) => console.log(err));
  }, []);
  return (
    <div>
      <Nav />
      <div>
        <div className="profile">
          <div className="profile-top">
            <div className="profile-right">
              <h1>{otherUser.username}</h1>

              <GitHubIcon />
              <LinkedInIcon />
              <TwitterIcon />
              <EmailIcon />
              {otherUser.college ? <h3>College: {otherUser.college}</h3> : null}
              {otherUser.yearsOfExp ? (
                <h3>Years of Experience:{otherUser.yearsOfExp}</h3>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OtherProfile;
