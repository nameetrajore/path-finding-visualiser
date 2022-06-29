import React from "react";
import {
  AppBar,
  Toolbar,
  Box,
  Button,
  Typography,
  Link,
  Tooltip,
  IconButton,
  Modal,
} from "@mui/material";
import useScrollTrigger from "@mui/material/useScrollTrigger";
import { Info } from "@mui/icons-material";
import About from "./About";

function ElevationScroll(props) {
  const { children } = props;
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
  });

  return React.cloneElement(children, {
    elevation: trigger ? 4 : 0,
  });
}



const Header = () => {
  const [open, setOpen] = React.useState(false);
  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const infoHandler = () => {
    handleOpen();
  };

  return (
    <>
      <AppBar
        color="inherit"
        position="fixed"
        sx={{
          padding: "0.75rem",
          boxShadow: "none",
        }}
      >
        <Toolbar>
          <About open={open} handleClose={handleClose}/>
          <Typography
            variant="h4"
            fontWeight="700"
            color="primary"
            sx={{ flexGrow: "1" }}
          >
            PATH FINDING VISUALISER
          </Typography>
          <IconButton onClick={infoHandler}>
            <Info color="primary" />
          </IconButton>
        </Toolbar>
      </AppBar>
    </>
  );
};

export default Header;
