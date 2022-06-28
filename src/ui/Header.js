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
} from "@mui/material";
import useScrollTrigger from "@mui/material/useScrollTrigger";
import { QuestionMark } from "@mui/icons-material";

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
  const PathFindingAlgorithmsButton = (
    <Button
      variant="contained"
      size="large"
      disableElevation
      href="/path-finding-algorithms"
      sx={{
        marginRight: "1rem",
      }}
    >
      Path Finding Algorithms
    </Button>
  );
  return (
    <>
        <AppBar
          color="transparent"
          position="fixed"
          sx={{
            padding: "0.75rem",
            boxShadow:'none'
          }}
        >
          <Toolbar>
            <Typography
              variant="h4"
              fontWeight="700"
              color="primary"
              sx={{ flexGrow: "1" }}
            >
                PATH FINDING VISUALISER
            </Typography>
          </Toolbar>
          {/* <IconButton>
            <QuestionMark/>
          </IconButton> */}
        </AppBar>
    </>
  );
};

export default Header;
