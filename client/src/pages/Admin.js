import React from "react";
import VerifyUsers from "../components/VerifyUsers";
import Nav from "../components/Nav";
const Admin = () => {
  return (
    <div>
      <Nav />
      <div className="admin">
        <div>post left side</div>
        <VerifyUsers />
      </div>
    </div>
  );
};

export default Admin;
