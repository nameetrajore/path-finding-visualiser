import React from "react";
import { Grid, Link, Typography } from "@mui/material";

const Welcome = () => {
  return (
    <Grid
      container
      pl={10}
      sx={{
        position: "absolute",
        left: "50%",
        top: "50%",
        transform: "translate(-50%, -50%)",
      }}
    >
      <Grid item xs={7}>
        <Typography variant="h2" fontWeight="500" color="primary" mb={1}>
          Welcome to VISUALIZER!
        </Typography>
      </Grid>
      <Grid item xs={6}>
        <Typography
          paragraph
          variant="h6"
          fontWeight="400"
          color="gray"
          align="justify"
        >
          This application was built simply because I love visualising
          everything. And that's why I wanted to share it with
          everyone. Hope you enjoy playing around with it! 
        </Typography>
      </Grid>
    </Grid>
  );
};

export default Welcome;
