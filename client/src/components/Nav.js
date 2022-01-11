import React, { useContext, useEffect, useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import { TOKEN_ID } from "../utils/constants";
import Loading from "./Loading";

import PropTypes from "prop-types";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import MailIcon from "@mui/icons-material/Mail";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import PeopleAltOutlinedIcon from "@mui/icons-material/PeopleAltOutlined";
import CampaignOutlinedIcon from "@mui/icons-material/CampaignOutlined";
import WorkOutlineOutlinedIcon from "@mui/icons-material/WorkOutlineOutlined";
import AdminPanelSettingsOutlinedIcon from "@mui/icons-material/AdminPanelSettingsOutlined";
import LogoutIcon from "@mui/icons-material/Logout";
import LoginIcon from "@mui/icons-material/Login";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import CollectionsIcon from "@mui/icons-material/Collections";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import Logo from "../images/black.png";
import Avatar from "@mui/material/Avatar";

const drawerWidth = 240;

function ResponsiveDrawer(props) {
  const auth = useAuth();
  const history = useHistory();
  const location = useLocation();
  const [username, setUsername] = useState("");
  let [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    console.log("use effect in nav to getuser");
    axios({
      method: "get",
      url: "https://primus-alumni-portal.herokuapp.com/api/auth/getuser",
      headers: {
        "Content-type": "application/json",
        "x-auth-token": `${localStorage.getItem(TOKEN_ID)}`,
      },
    })
      .then((result) => {
        if (result.data.success) {
          console.log("....");
          console.log(result.data.data.username);
          setUsername(result.data.data.username);
          setUser(result.data.data);
          setLoading(false);
        } else {
          console.log(result.data.msg);
        }
      })
      .catch((err) => console.log(err));
  }, []);

  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <div>
      <img
        src={Logo}
        style={{
          boxDecoration: "none",
          height: "8rem",
          marginLeft: "1rem",
          marginTop: "1rem",
        }}
      ></img>
      <List>
        {location.pathname === "/" ? (
          <ListItem
            button
            key={"About"}
            onClick={() => {
              history.push("/");
            }}
            style={{ color: "blue", fontWeight: "bold" }}
          >
            <ListItemIcon>
              <HomeOutlinedIcon style={{ color: "blue", fontWeight: "bold" }} />
            </ListItemIcon>
            <ListItemText primary={"About"} />
          </ListItem>
        ) : (
          <ListItem
            button
            key={"About"}
            onClick={() => {
              history.push("/");
            }}
          >
            <ListItemIcon>
              <HomeOutlinedIcon />
            </ListItemIcon>
            <ListItemText primary={"About"} />
          </ListItem>
        )}

        {auth.user != null ? (
          location.pathname === "/members" ? (
            <ListItem
              button
              key={"Members"}
              onClick={() => {
                history.push("/members");
              }}
              style={{ color: "blue", fontWeight: "bold" }}
            >
              <ListItemIcon>
                <PeopleAltOutlinedIcon
                  style={{ color: "blue", fontWeight: "bold" }}
                />
              </ListItemIcon>
              <ListItemText primary={"Members"} />
            </ListItem>
          ) : (
            <ListItem
              button
              key={"Members"}
              onClick={() => {
                history.push("/members");
              }}
            >
              <ListItemIcon>
                <PeopleAltOutlinedIcon />
              </ListItemIcon>
              <ListItemText primary={"Members"} />
            </ListItem>
          )
        ) : null}

        {auth.user != null ? (
          location.pathname === "/events" ? (
            <ListItem
              button
              key={"Events"}
              onClick={() => {
                history.push("/events");
              }}
              style={{ color: "blue", fontWeight: "bold" }}
            >
              <ListItemIcon>
                <CalendarTodayIcon
                  style={{ color: "blue", fontWeight: "bold" }}
                />
              </ListItemIcon>
              <ListItemText primary={"Events"} />
            </ListItem>
          ) : (
            <ListItem
              button
              key={"Events"}
              onClick={() => {
                history.push("/events");
              }}
            >
              <ListItemIcon>
                <CalendarTodayIcon />
              </ListItemIcon>
              <ListItemText primary={"Events"} />
            </ListItem>
          )
        ) : null}

        {auth.user != null ? (
          location.pathname === "/profile" ? (
            <ListItem
              button
              key={"Profile"}
              onClick={() => {
                history.push("/profile");
              }}
              style={{ color: "blue", fontWeight: "bold" }}
            >
              <ListItemIcon>
                <AccountBoxIcon style={{ color: "blue", fontWeight: "bold" }} />
              </ListItemIcon>
              <ListItemText primary={"Profile"} />
            </ListItem>
          ) : (
            <ListItem
              button
              key={"Profile"}
              onClick={() => {
                history.push("/profile");
              }}
            >
              <ListItemIcon>
                <AccountBoxIcon />
              </ListItemIcon>
              <ListItemText primary={"Profile"} />
            </ListItem>
          )
        ) : null}

        {auth.user != null ? (
          location.pathname === "/gallery" ? (
            <ListItem
              button
              key={"Gallery"}
              onClick={() => {
                history.push("/gallery");
              }}
              style={{ color: "blue", fontWeight: "bold" }}
            >
              <ListItemIcon>
                <CollectionsIcon
                  style={{ color: "blue", fontWeight: "bold" }}
                />
              </ListItemIcon>
              <ListItemText primary={"Gallery"} />
            </ListItem>
          ) : (
            <ListItem
              button
              key={"Gallery"}
              onClick={() => {
                history.push("/gallery");
              }}
            >
              <ListItemIcon>
                <CollectionsIcon />
              </ListItemIcon>
              <ListItemText primary={"Gallery"} />
            </ListItem>
          )
        ) : null}

        {auth.user != null ? (
          auth.user.isAdmin ? (
            location.pathname === "/admin" ? (
              <ListItem
                button
                key={"Admin Panel"}
                onClick={() => {
                  history.push("/admin");
                }}
                style={{ color: "blue", fontWeight: "bold" }}
              >
                <ListItemIcon>
                  <AdminPanelSettingsOutlinedIcon
                    style={{ color: "blue", fontWeight: "bold" }}
                  />
                </ListItemIcon>
                <ListItemText primary={"Admin Panel"} />
              </ListItem>
            ) : (
              <ListItem
                button
                key={"Admin Panel"}
                onClick={() => {
                  history.push("/admin");
                }}
              >
                <ListItemIcon>
                  <AdminPanelSettingsOutlinedIcon />
                </ListItemIcon>
                <ListItemText primary={"Admin Panel"} />
              </ListItem>
            )
          ) : null
        ) : null}
        {auth.user == null ? (
          <ListItem
            button
            key={"Login"}
            onClick={() => {
              auth.logout();
              history.push("/login");
            }}
          >
            <ListItemIcon>
              <LoginIcon />
            </ListItemIcon>
            <ListItemText primary={"Login"} />
          </ListItem>
        ) : null}
        {auth.user != null ? (
          <ListItem
            button
            key={"Logout"}
            onClick={() => {
              auth.logout();
              history.push("/login");
            }}
          >
            <ListItemIcon>
              <LogoutIcon />
            </ListItemIcon>
            <ListItemText primary={"Logout"} />
          </ListItem>
        ) : null}
      </List>
    </div>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            {location.pathname == "/admin" ? (
              <span style={{ fontWeight: "bold" }}>Admin</span>
            ) : location.pathname == "/" ? (
              <span style={{ fontWeight: "bold" }}>About</span>
            ) : location.pathname == "/members" ? (
              <span style={{ fontWeight: "bold" }}>Members</span>
            ) : location.pathname == "/profile" ? (
              <span style={{ fontWeight: "bold" }}>Profile</span>
            ) : location.pathname == "/gallery" ? (
              <span style={{ fontWeight: "bold" }}>Pictures</span>
            ) : location.pathname == "/events" ? (
              <span style={{ fontWeight: "bold" }}>Events</span>
            ) : (
              <span style={{ fontWeight: "bold" }}>User Profile</span>
            )}
          </Typography>
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: "none", sm: "block" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
    </Box>
  );
}

ResponsiveDrawer.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
};

export default ResponsiveDrawer;
