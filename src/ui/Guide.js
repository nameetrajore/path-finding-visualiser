import React from "react";
import { Grid, Typography } from "@mui/material";
import FitnessCenterIcon from "@mui/icons-material/FitnessCenter";
import Circle from "@mui/icons-material/Circle";
import SquareIcon from '@mui/icons-material/Square';

const Guide = () => {
  return (
    <Grid
      container
      sx={{ p: 3, mt: 2, borderRadius: "10px", outline: "1px solid #C7C7C7" }}
    >
      <Grid item xs={10} mb={1}>
        <Typography >Start Node</Typography>
      </Grid>
      <Circle color="success" sx={{ ml: 'auto' }} />
      <Grid item xs={10} mb={1}>
        <Typography>End Node</Typography>
      </Grid>
      <Circle color="error" sx={{ ml: 'auto' }} />
      <Grid item xs={10} mb={1}>
        <Typography>Weighted Node</Typography>
      </Grid>
      <FitnessCenterIcon sx={{ ml: 'auto' }} />
      <Grid item xs={10} mb={1}>
        <Typography>Visited Nodes</Typography>
      </Grid>
      <SquareIcon sx={{ ml: 'auto', color:'#536dfe' }} />
      <Grid item xs={10}>
        <Typography>Shortest Path</Typography>
      </Grid>
      <SquareIcon sx={{ ml: 'auto', color:'rgb(255, 230, 88)' }} />
    </Grid>
  );
};

export default Guide;
