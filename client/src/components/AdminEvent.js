import React from "react";
import Input from "./Input";
import Button from "./Button";
import axios from "axios";
import { TOKEN_ID } from "../utils/constants";
const AdminEvent = () => {
  const [eventDescription, setEventDescription] = React.useState("");
  const [eventDate, setEventDate] = React.useState("");
  const [eventTime, setEventTime] = React.useState("");
  const [eventLocation, setEventLocation] = React.useState("");
  const [eventLink, setEventLink] = React.useState("");
  const [eventType, setEventType] = React.useState("");

  const handleSubmit = (e) => {
    console.log("jhi");
    // e.preventDefault();
    // console.log("submit edit profile");
    // axios({
    //   method: "post",
    //   url: "/api/admin/addevent",
    //   data: {
    //     eventDescription,
    //     eventDate,
    //     eventTime,
    //     eventLocation,
    //     eventLink,
    //     eventType,
    //   },
    //   headers: {
    //     "Content-type": "application/json",
    //     "x-auth-token": `${localStorage.getItem(TOKEN_ID)}`,
    //   },
    // })
    //   .then((result) => {
    //     console.log("result");
    //     console.log(result.data);
    //     if (result.data.success) {
    //       console.log("successfully addded event");
    //     }
    //   })
    //   .catch((err) => console.log(err));

    // window.location.reload();
  };

  return (
    <form>
      <Input
        inputValue={"Date"}
        onChange={(e) => {
          setEventDate(e.target.value);
        }}
      />
      <Input
        inputValue={"Time"}
        onChange={(e) => {
          setEventTime(e.target.value);
        }}
      />
      <Input
        inputValue={"Venue"}
        onChange={(e) => {
          setEventLocation(e.target.value);
        }}
      />
      <Input
        inputValue={"Description"}
        onChange={(e) => {
          setEventDescription(e.target.value);
        }}
      />
      <Input
        inputValue={"Link"}
        onChange={(e) => {
          setEventLink(e.target.value);
        }}
      />
      <Input
        inputValue={"Type"}
        onChange={(e) => {
          setEventType(e.target.value);
        }}
      />

      <Button buttonValue={"Add Event"} onClick={handleSubmit} />
    </form>
  );
};

export default AdminEvent;
