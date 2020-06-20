import React from "react";
import Rating from "@material-ui/lab/Rating";

import Box from "@material-ui/core/Box";

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
  const [value, setValue] = React.useState(rank);
  const [click, setClick] = React.useState(true);

  return (
    <div>
      <Box component="fieldset" mb={0} p={0} borderColor="transparent">
        <StyledRating
          size={"large"}
          value={value}
          precision={0.5}
          onChange={(event, newValue) => {
            setValue(newValue);
            setClick(false);
            if (click) {
              axios.post(`/stocks/update/${link}`, {
                rating: [newValue],
              });
            }
          }}
        />
      </Box>
    </div>
  );
}
