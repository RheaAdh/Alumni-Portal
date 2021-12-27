import React from "react";
import VerifyUsers from "../components/VerifyUsers";
import Nav from "../components/Nav";
import AdminEvent from "../components/AdminEvent";

const Admin = () => {
  return (
    <div>
      <Nav />
      <div className="admin">
        <VerifyUsers />
        <AdminEvent />
      </div>
    </div>
  );
};

export default Admin;
