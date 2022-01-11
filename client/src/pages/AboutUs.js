import React from "react";
import Nav from "../components/Nav";

const AboutUs = () => {
  return (
    <div className="page">
      <Nav />
      <div className="aboutus">
        <h4>ALMA MATER</h4>
        <p>
          This is a portal for the alumni to connect as well as for the current
          students studying in school who want to approach their seniors
          regarding doubts.
        </p>
        <br />
        <h4>MEMBERS</h4>
        <p>
          You can use the provided filters to search for alumni by college name
          or work place,etc.
        </p>
        <br />
        <h4>EVENTS</h4>
        <p>
          The alumni team will release information regarding physical/virtual
          meetups for the alumni either batch wise or the whole school .
        </p>
        <br />
        <h4>PROFILE</h4>
        <p>
          Please update your profile as this will let others know about you.
        </p>
        <br />
        <h4>GALLERY</h4>
        <p>
          After each event the alumni admins will uppload the pictures through a
          drive link.
        </p>
      </div>
    </div>
  );
};

export default AboutUs;
