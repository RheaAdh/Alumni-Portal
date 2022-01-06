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
      url: `https://primus-alumni-portal.herokuapp.com/api/users/profile/${username}`,
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
          <div>
            <h1>{otherUser.username}</h1>
            {otherUser.githubLink == "" ? null : (
              <a href={otherUser.githubLink}>
                <GitHubIcon />
              </a>
            )}
            {otherUser.linkedinLink == "" ? null : (
              <a href={otherUser.linkedinLink}>
                <LinkedInIcon />
              </a>
            )}
            {otherUser.twitterLink == "" ? null : (
              <a href={otherUser.twitterLink}>
                <TwitterIcon />
              </a>
            )}
            <a href={`mailto:` + otherUser.email}>
              <EmailIcon />
            </a>
            <div className="header">Education</div>
            <h3> {otherUser.college}</h3>
            <hr></hr>
            <div className="header">Current Company:</div>
            <h3> {otherUser.company}</h3>
            <hr></hr>
            <div className="header">Designation:</div>
            <h3> {otherUser.designation}</h3>
            <hr></hr>
            <div className="header">Previous Company: </div>
            <h3>{otherUser.prevCompany}</h3>
            <hr></hr>
            <div className="header">Previous Designation:</div>
            <h3> {otherUser.prevDesignation}</h3>
            <hr></hr>
            <div className="header">Years of Experience:</div>
            <h3> {otherUser.yearsOfExp}</h3>
            <hr></hr>
            <div className="header">Location:</div>
            <h3> {otherUser.location}</h3>
            <hr></hr>
            <div className="header">House:</div>
            <h3> {otherUser.house}</h3>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OtherProfile;
