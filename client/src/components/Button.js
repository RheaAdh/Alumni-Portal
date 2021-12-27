import * as React from "react";
import Button from "@mui/material/Button";

export default function ContainedButtons({ buttonValue }) {
  return (
    <Button variant="contained" href="#contained-buttons">
      {buttonValue}
    </Button>
  );
}
