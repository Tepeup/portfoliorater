import React from "react";
import Rating from "@material-ui/lab/Rating";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import { useState, useEffect } from "react";
import axios from "axios";
import { withStyles } from "@material-ui/core/styles";

const StyledRating = withStyles({
  iconFilled: {
    color: "#ffb74d",
  },
  iconHover: {
    color: "#ffb74d",
  },
})(Rating);

export default function SimpleRating({ rating: rank, link: link }) {
  console.log(rank);
  const [value, setValue] = React.useState(rank);

  return (
    <div>
      <Box component="fieldset" mb={0} p={0} borderColor="transparent">
        <StyledRating
          value={value}
          precision={0.5}
          onChange={(event, newValue) => {
            setValue(newValue);
            axios.post(`http://localhost:5000/stocks/update/${link}`, {
              rating: [newValue],
            });
          }}
        />
      </Box>
    </div>
  );
}
