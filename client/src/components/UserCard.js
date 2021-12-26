import React, { useContext, createContext, useState, useEffect } from "react";
import { useHistory, useLocation } from "react-router-dom";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";

export default function ActionAreaCard({ user }) {
  const history = useHistory();
  return (
    <Card
      sx={{ maxWidth: 345 }}
      onClick={() => {
        history.push(`/users/${user.username}`);
      }}
    >
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {user.username}
        </Typography>
        <Typography variant="body2">{user.email}</Typography>
      </CardContent>
    </Card>
  );
}
