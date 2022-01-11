import React from "react";
import VerifyUsers from "../components/VerifyUsers";
import Nav from "../components/Nav";
import AdminEvent from "../components/AdminEvent";
import { useAuth } from "../context/AuthContext";
import NotFound from "./NotFound";
import AddLink from "../components/AddLink";

import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";

const Admin = () => {
  const [value, setValue] = React.useState("1");
  const auth = useAuth();
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <div>
      <Nav />
      {auth.user.isAdmin ? (
        <div className="admin">
          <Box sx={{ width: "100%", typography: "body1" }}>
            <TabContext value={value}>
              <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                <TabList
                  onChange={handleChange}
                  aria-label="lab API tabs example"
                >
                  <Tab label="Verify Users" value="1" />
                  <Tab label="Events/Drive Link" value="2" />
                </TabList>
              </Box>
              <TabPanel value="1">
                <VerifyUsers />
              </TabPanel>
              <TabPanel value="2">
                <h3 style={{ fontWeight: "bold", color: "black" }}>
                  ADD DRIVE LINK
                </h3>
                <AddLink />
                <h3 style={{ fontWeight: "bold", color: "black" }}>
                  ADD EVENT DETAILS
                </h3>
                <AdminEvent />
              </TabPanel>
            </TabContext>
          </Box>
        </div>
      ) : (
        <NotFound />
      )}
    </div>
  );
};

export default Admin;
