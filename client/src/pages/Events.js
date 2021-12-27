import React from "react";
import Nav from "../components/Nav";

import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import EventAvailableIcon from "@mui/icons-material/EventAvailable";

const bull = (
  <Box
    component="span"
    sx={{ display: "inline-block", mx: "2px", transform: "scale(0.8)" }}
  >
    •
  </Box>
);
const card = (
  <React.Fragment>
    <CardContent>
      <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
        35 people have confirmed
      </Typography>
      <Typography variant="h5" component="div">
        Batch of 2019
      </Typography>
      <Typography sx={{ mb: 1.5 }} color="text.secondary">
        Venue : School
      </Typography>
      <Typography sx={{ mb: 1.5 }} color="text.secondary">
        Date : Monday 27th Dec, 5pm
      </Typography>
    </CardContent>
    <CardActions>
      RSVP
      <Button size="small">Yes</Button>
      <Button size="small">Maybe</Button>
      <Button size="small">No</Button>
      {/* Add to calendar
      <EventAvailableIcon /> */}
    </CardActions>
  </React.Fragment>
);

const Events = () => {
  const [value, setValue] = React.useState("1");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <div>
      <Nav />
      <div className="events">
        <Box sx={{ width: "100%", typography: "body1" }}>
          <TabContext value={value}>
            <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
              <TabList
                onChange={handleChange}
                aria-label="lab API tabs example"
              >
                <Tab label="Reunions" value="1" />
                <Tab label="Virtual Meets" value="2" />
              </TabList>
            </Box>
            <TabPanel value="1">
              <Box sx={{ minWidth: 275 }}>
                <Card variant="outlined">{card}</Card>
              </Box>
            </TabPanel>
            <TabPanel value="2">Virtual Meets</TabPanel>
          </TabContext>
        </Box>
      </div>
    </div>
  );
};

export default Events;
