import React from "react";

import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import EventAvailableIcon from "@mui/icons-material/EventAvailable";
import { useAuth } from "../context/AuthContext";
import { TOKEN_ID } from "../utils/constants";
import axios from "axios";

const EventCard = ({
  description,
  date,
  time,
  eventLink,
  location,
  eventid,
  DeleteEvent,
  eventType,
}) => {
  const auth = useAuth();
  const handleDelete = () => {
    DeleteEvent(eventid);
  };
  return (
    <Card style={{ padding: "0.25rem", width: "80%", margin: "1rem" }}>
      <CardContent>
        <Typography variant="h5" component="div">
          <h3>{description}</h3>
        </Typography>
        <br />
        <Typography sx={{ mb: 1.5 }} color="text.primary">
          <b>Venue : </b> {location}
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.primary">
          <b> Date : </b> {date}
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.primary">
          <b> Time : </b>
          {time}
        </Typography>
        {eventType == "physical" ? null : (
          <Typography sx={{ mb: 1.5 }} color="text.primary">
            <b> Link : </b>
            <a href={eventLink} style={{ color: "blue" }}>
              {eventLink}
            </a>
          </Typography>
        )}

        {auth.user.isAdmin ? (
          <CardActions>
            <button
              style={{
                backgroundColor: "red",
                color: "white",
                fontSize: "bold",
              }}
              onClick={handleDelete}
            >
              Delete Event
            </button>
          </CardActions>
        ) : null}
      </CardContent>
    </Card>
  );
};

export default EventCard;
