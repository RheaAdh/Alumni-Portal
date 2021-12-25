import React, { useContext, useEffect, useState, useRef } from "react";
import axios from "axios";
import { Redirect, useHistory } from "react-router-dom";
import { TOKEN_ID } from "../utils/constants";
import { useAuth } from "../context/AuthContext";
import Nav from "../components/Nav";
import "react-responsive-modal/styles.css";
import { Modal } from "react-responsive-modal";

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
      <div className="stick">Profile</div>
      <div className="profile">
        <div className="profile-top">
          <div className="profile-right">
            <button
              style={{ marginTop: "1rem" }}
              class="btn btn-primary"
              onClick={() => {
                setOpen(true);
              }}
            >
              Edit Profile
            </button>
            <h1>{auth.user.username}</h1>
            <h3>College: {auth.user.college}</h3>
            <h3>Current Company: {auth.user.company}</h3>
            <h3>Designation: {auth.user.designation}</h3>
            <h3>Previous Company: {auth.user.prevCompany}</h3>
            <h3>Previous Designation: {auth.user.prevDesignation}</h3>
            <h3>Years of Experience: {auth.user.yearsOfExp}</h3>
            <h3>Location: {auth.user.location}</h3>
            <h3>House: {auth.user.house}</h3>
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
          <button
            type="submit"
            style={{
              borderRadius: "0.25rem",
              backgroundColor: "#fec737",
              fontWeight: "bold",
              padding: "0.5rem",
              margin: "1rem 0rem 1rem 0rem",
              textAlign: "center",
              fontSize: "1rem",
            }}
            onClick={handleSubmit}
          >
            Save Profile
          </button>
          <div class="form-group" style={{ margin: "1rem" }}>
            <input
              className="form-control"
              placeholder="Location"
              type="text"
              id="location"
              onChange={(e) => setLocation(e.target.value)}
              value={location}
            ></input>
          </div>

          <div class="form-group" style={{ margin: "1rem" }}>
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
          <div class="form-group" style={{ margin: "1rem" }}>
            <input
              className="form-control"
              placeholder="Graduation Year"
              id="gradYear"
              type="text"
              onChange={(e) => setGradYear(e.target.value)}
              value={gradYear}
            ></input>
          </div>
          <div class="form-group" style={{ margin: "1rem" }}>
            <input
              className="form-control"
              placeholder="House Name"
              type="text"
              onChange={(e) => setHouse(e.target.value)}
              value={house}
            ></input>
          </div>
          <div class="form-group" style={{ margin: "1rem" }}>
            <input
              className="form-control"
              placeholder="Current Company"
              type="text"
              onChange={(e) => setCompany(e.target.value)}
              value={company}
            ></input>
          </div>
          <div class="form-group" style={{ margin: "1rem" }}>
            <input
              className="form-control"
              placeholder="Previous Company"
              type="text"
              onChange={(e) => setPrevCompany(e.target.value)}
              value={prevCompany}
            ></input>
          </div>
          <div class="form-group" style={{ margin: "1rem" }}>
            <input
              className="form-control"
              placeholder="Current Designation"
              type="text"
              onChange={(e) => setDesignation(e.target.value)}
              value={designation}
            ></input>
          </div>
          <div class="form-group" style={{ margin: "1rem" }}>
            <input
              className="form-control"
              placeholder="Previous Designation"
              type="text"
              onChange={(e) => setPrevDesignation(e.target.value)}
              value={prevDesignation}
            ></input>
          </div>
          <div class="form-group" style={{ margin: "1rem" }}>
            <input
              className="form-control"
              placeholder="Years of work experience"
              type="number"
              onChange={(e) => setYearsOfExp(e.target.value)}
              value={yearsOfExp}
            ></input>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default Profile;
