import React from "react";
import VerifyUsers from "../components/VerifyUsers";
import Nav from "../components/Nav";
import AdminEvent from "../components/AdminEvent";
import { useAuth } from "../context/AuthContext";
import NotFound from "./NotFound";

const Admin = () => {
  const auth = useAuth();
  return (
    <div>
      <Nav />
      {auth.user.isAdmin ? (
        <div className="admin">
          <VerifyUsers />
          <AdminEvent />
        </div>
      ) : (
        <NotFound />
      )}
    </div>
  );
};

export default Admin;
