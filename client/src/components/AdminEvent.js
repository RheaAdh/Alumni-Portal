import React, { useState } from "react";
import Button from "./Button";
import axios from "axios";
import { TOKEN_ID } from "../utils/constants";

import { FormControl } from "@mui/material";

const AdminEvent = () => {
  const [eventDescription, setEventDescription] = useState("");
  const [eventDate, setEventDate] = useState("");
  const [eventTime, setEventTime] = useState("");
  const [eventLocation, setEventLocation] = useState("");
  const [eventLink, setEventLink] = useState("");
  const [eventType, setEventType] = useState("physical");

  const handleChange = (e) => {
    setEventType(e.target.value);
  };

  const handleSubmit = (e) => {
    console.log("submit edit profile");
    axios({
      method: "post",
      url: "https://primus-alumni-portal.herokuapp.com/api/admin/addevent",
      data: {
        description: eventDescription,
        date: eventDate,
        time: eventTime,
        venue: eventLocation,
        eventLink: eventLink,
        eventType: eventType,
      },
      headers: {
        "Content-type": "application/json",
        "x-auth-token": `${localStorage.getItem(TOKEN_ID)}`,
      },
    })
      .then((result) => {
        console.log("result");
        console.log(result.data);
        if (result.data.success) {
          console.log("successfully addded event");
          alert("added event");
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <FormControl>
      <input
        placeholder="Event Date"
        onChange={(e) => {
          setEventDate(e.target.value);
        }}
      />
      <input
        placeholder="Event Time"
        onChange={(e) => {
          setEventTime(e.target.value);
        }}
      />
      <input
        placeholder="Event Location"
        onChange={(e) => {
          setEventLocation(e.target.value);
        }}
      />
      <input
        placeholder="Event Description"
        onChange={(e) => {
          setEventDescription(e.target.value);
        }}
      />
      <input
        placeholder="Event Link"
        onChange={(e) => {
          setEventLink(e.target.value);
        }}
      />

      <select value={eventType} onChange={handleChange}>
        <option value="physical">Physical</option>
        <option value="virtual">Virtual</option>
      </select>

      <button
        type="submit"
        onClick={handleSubmit}
        style={{ backgroundColor: "grey", color: "white" }}
      >
        Add Event
      </button>
    </FormControl>
  );
};

export default AdminEvent;
