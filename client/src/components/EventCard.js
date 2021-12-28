import React from "react";

import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import EventAvailableIcon from "@mui/icons-material/EventAvailable";

const EventCard = ({ description, date, time, eventLink, location }) => {
  return (
    <div>
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          35 people have confirmed
        </Typography>
        <Typography variant="h5" component="div">
          {description}
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          Venue : {location}
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          Date : {date}
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
    </div>
  );
};

export default EventCard;
