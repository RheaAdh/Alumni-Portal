import React, { useContext, useEffect, useState, useRef } from "react";
import axios from "axios";
import { Redirect, useHistory } from "react-router-dom";
import { TOKEN_ID } from "../utils/constants";
import { useAuth } from "../context/AuthContext";
import Nav from "../components/Nav";
import "react-responsive-modal/styles.css";
import { Modal } from "react-responsive-modal";

import LinkedInIcon from "@mui/icons-material/LinkedIn";
import GitHubIcon from "@mui/icons-material/GitHub";
import TwitterIcon from "@mui/icons-material/Twitter";
import EmailIcon from "@mui/icons-material/Email";
import LanguageIcon from "@mui/icons-material/Language";

import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";

const Profile = () => {
  const auth = useAuth();

  const history = useHistory();
  const [open, setOpen] = useState(false);

  const [college, setCollege] = useState("");
  const [gradYear, setGradYear] = useState("");
  const [company, setCompany] = useState("");
  const [prevCompany, setPrevCompany] = useState("");
  const [designation, setDesignation] = useState("");
  const [prevDesignation, setPrevDesignation] = useState("");
  const [yearsOfExp, setYearsOfExp] = useState(0);
  const [location, setLocation] = useState("");
  const [house, setHouse] = useState("");
  const [linkedin, setLinkedin] = useState("");
  const [github, setGithub] = useState("");
  const [twitter, setTwitter] = useState("");

  useEffect(() => {
    setCollege(auth.user.college);
    setGradYear(auth.user.gradYear);
    setCompany(auth.user.company);
    setPrevCompany(auth.user.prevCompany);
    setDesignation(auth.user.designation);
    setPrevDesignation(auth.user.prevDesignation);
    setYearsOfExp(auth.user.yearsOfExp);
    setLocation(auth.user.location);
    setHouse(auth.user.house);
    setLinkedin(auth.user.linkedinLink);
    setGithub(auth.user.githubLink);
    setTwitter(auth.user.twitterLink);
    console.log(auth.user);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("submit edit profile");
    axios({
      method: "put",
      url: "/api/users/profile",
      data: {
        college,
        designation,
        prevDesignation,
        gradYear,
        prevCompany,
        company,
        yearsOfExp,
        location,
        house,
        linkedinLink: linkedin,
        githubLink: github,
        twitterLink: twitter,
      },
      headers: {
        "Content-type": "application/json",
        "x-auth-token": `${localStorage.getItem(TOKEN_ID)}`,
      },
    })
      .then((result) => {
        console.log("result");
        console.log(result.data);
        console.log(auth.user);
        if (result.data.success) {
          auth.setUser(result.data.data);
        }
        console.log(auth.user);
      })
      .catch((err) => console.log(err));

    window.location.reload();
  };

  return (
    <div>
      <Nav />
      <div className="profile">
        <div className="profile-top">
          <Button
            variant="contained"
            onClick={() => {
              setOpen(true);
            }}
          >
            Edit
          </Button>
          <div>
            <h1>{auth.user.username}</h1>
            {auth.user.githubLink == "" ? null : (
              <a href={auth.user.githubLink}>
                <GitHubIcon />
              </a>
            )}
            {auth.user.linkedinLink == "" ? null : (
              <a href={auth.user.linkedinLink}>
                <LinkedInIcon />
              </a>
            )}
            {auth.user.twitterLink == "" ? null : (
              <a href={auth.user.twitterLink}>
                <TwitterIcon />
              </a>
            )}
            <a href={`mailto:` + auth.user.email}>
              <EmailIcon />
            </a>
            <div className="header">Education</div>
            <h3> {auth.user.college}</h3>
            <hr></hr>
            <div className="header">Current Company:</div>
            <h3> {auth.user.company}</h3>
            <hr></hr>
            <div className="header">Designation:</div>
            <h3> {auth.user.designation}</h3>
            <hr></hr>
            <div className="header">Previous Company: </div>
            <h3>{auth.user.prevCompany}</h3>
            <hr></hr>
            <div className="header">Previous Designation:</div>
            <h3> {auth.user.prevDesignation}</h3>
            <hr></hr>
            <div className="header">Years of Experience:</div>
            <h3> {auth.user.yearsOfExp}</h3>
            <hr></hr>
            <div className="header">Location:</div>
            <h3> {auth.user.location}</h3>
            <hr></hr>
            <div className="header">House:</div>
            <h3> {auth.user.house}</h3>
          </div>
        </div>
      </div>

      <Modal
        open={open}
        onClose={() => {
          setOpen(false);
        }}
      >
        <form>
          <div class="form-group">
            <input
              className="form-control"
              placeholder="Location"
              type="text"
              id="location"
              onChange={(e) => setLocation(e.target.value)}
              value={location}
            ></input>
          </div>

          <div class="form-group">
            <input
              className="form-control"
              placeholder="College"
              id="college"
              type="text"
              onChange={(e) => setCollege(e.target.value)}
              value={college}
              onChange={(e) => setCollege(e.target.value)}
            ></input>
          </div>
          <div class="form-group">
            <input
              className="form-control"
              placeholder="Graduation Year"
              id="gradYear"
              type="text"
              onChange={(e) => setGradYear(e.target.value)}
              value={gradYear}
            ></input>
          </div>
          <div class="form-group">
            <input
              className="form-control"
              placeholder="House Name"
              type="text"
              onChange={(e) => setHouse(e.target.value)}
              value={house}
            ></input>
          </div>
          <div class="form-group">
            <input
              className="form-control"
              placeholder="Current Company"
              type="text"
              onChange={(e) => setCompany(e.target.value)}
              value={company}
            ></input>
          </div>
          <div class="form-group">
            <input
              className="form-control"
              placeholder="Previous Company"
              type="text"
              onChange={(e) => setPrevCompany(e.target.value)}
              value={prevCompany}
            ></input>
          </div>
          <div class="form-group">
            <input
              className="form-control"
              placeholder="Current Designation"
              type="text"
              onChange={(e) => setDesignation(e.target.value)}
              value={designation}
            ></input>
          </div>
          <div class="form-group">
            <input
              className="form-control"
              placeholder="Previous Designation"
              type="text"
              onChange={(e) => setPrevDesignation(e.target.value)}
              value={prevDesignation}
            ></input>
          </div>
          <div class="form-group">
            <input
              className="form-control"
              placeholder="Years of work experience"
              type="number"
              onChange={(e) => setYearsOfExp(e.target.value)}
              value={yearsOfExp}
            ></input>
          </div>
          <div class="form-group">
            <input
              className="form-control"
              placeholder="Linkedin URL"
              type="text"
              onChange={(e) => setLinkedin(e.target.value)}
              value={linkedin}
            ></input>
          </div>
          <div class="form-group">
            <input
              className="form-control"
              placeholder="Github URL"
              type="text"
              onChange={(e) => setGithub(e.target.value)}
              value={github}
            ></input>
          </div>
          <div class="form-group">
            <input
              className="form-control"
              placeholder="Twitter Link"
              type="text"
              onChange={(e) => setTwitter(e.target.value)}
              value={twitter}
            ></input>
          </div>
          <Button variant="contained" type="submit" onClick={handleSubmit}>
            Save
          </Button>
        </form>
      </Modal>
    </div>
  );
};

export default Profile;
