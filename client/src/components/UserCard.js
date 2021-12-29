import React, { useContext, createContext, useState, useEffect } from "react";
import { useHistory, useLocation } from "react-router-dom";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";

export default function ActionAreaCard({ user }) {
  const history = useHistory();
  return (
    <Card
      sx={{ maxWidth: 345 }}
      onClick={() => {
        history.push(`/users/${user.username}`);
      }}
      className="user-card"
    >
      <CardContent>
        <Avatar alt={user.username} src="../images/me.jpg" />
        <Typography gutterBottom variant="h5" component="div">
          {user.username}
        </Typography>
        <Typography variant="body2">{user.email}</Typography>
      </CardContent>
    </Card>
  );
}
