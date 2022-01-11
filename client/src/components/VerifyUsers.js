import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import Individual from "./Individual";
import { TOKEN_ID } from "../utils/constants";
import { experimentalStyled as styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(2),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));
const VerifyUsers = () => {
  const auth = useAuth();
  const [users, setUsers] = useState([]);
  const [filterusers, setFilterUsers] = useState([]);
  const [searchItem, setSearchItem] = useState("");

  useEffect(() => {
    GetAll();
  }, []);

  const GetAll = () => {
    axios({
      method: "get",
      url: "https://primus-alumni-portal.herokuapp.com/api/users/getall",
      headers: {
        "Content-type": "application/json",
        "x-auth-token": `${localStorage.getItem(TOKEN_ID)}`,
      },
    })
      .then((result) => {
        if (result.data.success) {
          console.log("get all users");
          console.log(result.data.data);
          setUsers(result.data.data);
        } else {
          console.log("cannot get all users");
        }
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    let arrusers = [];
    for (let i = 0; i < users.length; i++) {
      if (users[i].username.toLowerCase().includes(searchItem.toLowerCase())) {
        arrusers.push(users[i]);
        console.log(users[i]);
      }
      console.log(searchItem);
    }
    setFilterUsers(arrusers);
  }, [searchItem]);

  return (
    <div>
      <center>
        <input
          placeholder="Search"
          onChange={(e) => setSearchItem(e.target.value)}
          style={{
            border: "solid",
            color: "gray",
            width: "30%",
          }}
        />
      </center>
      <div className="bottom">
        <Box sx={{ flexGrow: 1 }}>
          <Grid
            container
            spacing={{ xs: 2, md: 3 }}
            columns={{ xs: 4, sm: 8, md: 12 }}
          >
            {searchItem == ""
              ? users.map((user, index) => (
                  <Grid item xs={2} sm={4} md={4} key={index}>
                    <Individual user={user} />
                  </Grid>
                ))
              : filterusers.map((user, index) => (
                  <Grid item xs={2} sm={4} md={4} key={index}>
                    <Individual user={user} />
                  </Grid>
                ))}
          </Grid>
        </Box>
      </div>
    </div>
  );
};

export default VerifyUsers;
