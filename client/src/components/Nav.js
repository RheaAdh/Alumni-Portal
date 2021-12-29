import React, { useContext, useEffect, useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import { TOKEN_ID } from "../utils/constants";
import Loading from "./Loading";

import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import PeopleAltOutlinedIcon from "@mui/icons-material/PeopleAltOutlined";
import CampaignOutlinedIcon from "@mui/icons-material/CampaignOutlined";
import WorkOutlineOutlinedIcon from "@mui/icons-material/WorkOutlineOutlined";
import AdminPanelSettingsOutlinedIcon from "@mui/icons-material/AdminPanelSettingsOutlined";
import LogoutIcon from "@mui/icons-material/Logout";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import CollectionsIcon from "@mui/icons-material/Collections";
import AccountBoxIcon from "@mui/icons-material/AccountBox";

const drawerWidth = 240;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(9)} + 1px)`,
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

export default function MiniDrawer() {
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
      url: "/api/auth/getuser",
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

  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar position="fixed" open={open}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{
              marginRight: "36px",
              ...(open && { display: "none" }),
            }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            PRIMUS ALUMNI PORTAL
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer variant="permanent" open={open}>
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "rtl" ? (
              <ChevronRightIcon />
            ) : (
              <ChevronLeftIcon />
            )}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          {[
            { title: "About Us", url: "/" },
            { title: "Members", url: "/members" },
            { title: "Events", url: "/events" },
            { title: "Announcements", url: "/announcements" },
            { title: "Opportunities", url: "/opportunities" },
            { title: "Gallery", url: "/gallery" },
            { title: "Profile", url: "/profile" },
          ].map((obj, index) => (
            <ListItem
              button
              key={obj.title}
              onClick={() => history.push(obj.url)}
            >
              <ListItemIcon>
                {index === 0 ? (
                  <HomeOutlinedIcon />
                ) : index == 1 ? (
                  <PeopleAltOutlinedIcon />
                ) : index == 2 ? (
                  <CalendarTodayIcon />
                ) : index == 3 ? (
                  <CampaignOutlinedIcon />
                ) : index == 4 ? (
                  <WorkOutlineOutlinedIcon />
                ) : index == 5 ? (
                  <CollectionsIcon />
                ) : index == 6 ? (
                  <AccountBoxIcon />
                ) : null}
              </ListItemIcon>
              <ListItemText primary={obj.title} />
            </ListItem>
          ))}
          {auth.user != null ? (
            auth.user.isAdmin ? (
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
            ) : null
          ) : null}

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
        </List>
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <DrawerHeader />
      </Box>
    </Box>
  );
}
