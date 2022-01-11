import React from "react";
import axios from "axios";
import { Button } from "@mui/material";
import { TOKEN_ID } from "../utils/constants";
const AddLink = () => {
  const [driveLink, setDriveLink] = React.useState("");
  const [title, setTitle] = React.useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("submit edit profile");
    axios({
      method: "post",
      url: "https://primus-alumni-portal.herokuapp.com/api/admin/adddrivelink",
      data: {
        driveLink,
        title,
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
          alert("added drive link");
        }
      })
      .catch((err) => console.log(err));
  };
  return (
    <div>
      <form>
        <div>
          <input
            type="text"
            placeholder="Title"
            onChange={(e) => setTitle(e.target.value)}
            style={{ border: "solid", color: "gray" }}
          />
          <input
            type="text"
            placeholder="Link"
            onChange={(e) => setDriveLink(e.target.value)}
            style={{ border: "solid", color: "gray" }}
          />
        </div>

        <div style={{ marginTop: "0.5rem", marginBottom: "1rem" }}>
          <Button
            variant="contained"
            type="submit"
            onClick={handleSubmit}
            style={{ width: "15%" }}
          >
            Add Drive Link
          </Button>
        </div>
      </form>
    </div>
  );
};

export default AddLink;
