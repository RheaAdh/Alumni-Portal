import React from "react";
import VerifyUsers from "../components/VerifyUsers";
import Nav from "../components/Nav";
const Admin = () => {
  return (
    <div>
      <Nav />
      <div className="admin">
        <VerifyUsers />
      </div>
    </div>
  );
};

export default Admin;
