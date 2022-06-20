import { Grid, Typography, Link } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";

const Footer = () => {
  return (
    <Box
      sx={{
        position: "fixed",
        bottom: "0px",
        left: "0px",
        bgcolor: "lightgray",
        width: "100%",
        m: 0,
      }}
    >
      <div style={{ "margin": "0 auto" }}>
        <Typography fontWeight="500" variant="overline" sx={{ margin: "auto" }}>
          This application was created by{" "}
          <Link
            underline="none"
            href="https://www.linkedin.com/in/nameet-rajore/"
          >
            <Typography variant="overline" fontWeight="600" color="primary">
              Nameet Rajore
            </Typography>
          </Link>
          .
        </Typography>
      </div>
    </Box>
  );
};

export default Footer;
