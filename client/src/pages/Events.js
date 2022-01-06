import React, { useEffect, useState } from "react";
import Nav from "../components/Nav";
import { TOKEN_ID } from "../utils/constants";
import axios from "axios";
import EventCard from "../components/EventCard";

import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";

const bull = (
  <Box
    component="span"
    sx={{ display: "inline-block", mx: "2px", transform: "scale(0.8)" }}
  ></Box>
);

const Events = () => {
  const [value, setValue] = React.useState("1");
  const [eventList, setEventList] = useState([]);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const DeleteEvent = (eventid) => {
    console.log("Deleteevent:", eventid);
    axios({
      method: "delete",
      url: `https://primus-alumni-portal.herokuapp.com/api/admin/deleteevent/${eventid}`,
      headers: {
        "Content-type": "application/json",
        "x-auth-token": `${localStorage.getItem(TOKEN_ID)}`,
      },
    })
      .then((result) => {
        console.log("result");
        console.log(result.data);
        if (result.data.success) {
          console.log(result.data.data);
          setEventList(result.data.data);
        }
      })
      .catch((err) => console.log(err));
  };
  useEffect(() => {
    axios({
      method: "get",
      url: "https://primus-alumni-portal.herokuapp.com/api/event",
      headers: {
        "Content-type": "application/json",
        "x-auth-token": `${localStorage.getItem(TOKEN_ID)}`,
      },
    })
      .then((result) => {
        console.log("result");
        console.log(result.data);
        if (result.data.success) {
          console.log(result.data.data);
          setEventList(result.data.data);
        }
      })
      .catch((err) => console.log(err));
  }, []);

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
                <Tab label="Physical Meets" value="1" />
                <Tab label="Virtual Meets" value="2" />
              </TabList>
            </Box>
            <TabPanel value="1">
              {eventList.map((event) => {
                if (event.eventType === "physical") {
                  return (
                    <EventCard
                      key={event._id}
                      variant="outlined"
                      sx={{
                        width: "100%",
                        maxWidth: "100%",
                        marginTop: "1rem",
                        marginBottom: "1rem",
                      }}
                      description={event.description}
                      date={event.date}
                      time={event.time}
                      location={event.venue}
                      eventLink={event.eventLink}
                      eventid={event._id}
                      eventlink={event.eventLink}
                      DeleteEvent={DeleteEvent}
                    />
                  );
                }
              })}
            </TabPanel>
            <TabPanel value="2">
              {eventList.map((event) => {
                if (event.eventType === "virtual") {
                  return (
                    <EventCard
                      key={event._id}
                      variant="outlined"
                      sx={{
                        width: "100%",
                        maxWidth: "100%",
                        marginTop: "1rem",
                        marginBottom: "1rem",
                      }}
                      eventLink={event.eventLink}
                      description={event.description}
                      date={event.date}
                      time={event.time}
                      location={event.venue}
                      link={event.eventLink}
                      eventid={event._id}
                      DeleteEvent={DeleteEvent}
                    />
                  );
                }
              })}
            </TabPanel>
          </TabContext>
        </Box>
      </div>
    </div>
  );
};

export default Events;
