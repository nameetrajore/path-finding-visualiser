import React from "react";
import {
  AppBar,
  Toolbar,
  Box,
  Button,
  Typography,
  Link,
  Tooltip,
} from "@mui/material";
import { Route, Routes } from "react-router-dom";
import PathFindingAlgorithms from "../pages/PathFindingAlgorithms";
import SortingAlgorithms from "../pages/SortingAlgorithms";
import PhysicsSimulations from "../pages/PhysicsSimulations";
import useScrollTrigger from "@mui/material/useScrollTrigger";

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

  const SortingAlgorithmsButton = (
    <Button
      variant="contained"
      disabled
      size="large"
      disableElevation
      to={{ pathname: "/sign-up" }}
      sx={{
        marginRight: "1rem",
      }}
    >
      Sorting Algorithms
    </Button>
  );

  const PhysicsSimulationsButton = (
    <Button
      variant="contained"
      disabled
      size="large"
      disableElevation
      to="/path-finding-algorithms"
    >
      Physics Simulations
    </Button>
  );

  const routes = (
    <Routes>
      <Route
        path="/path-finding-algorithms"
        element={<PathFindingAlgorithms />}
      />
      <Route path="/sorting-algorithms" element={<SortingAlgorithms />} />
      <Route path="/physics-simulations" element={<PhysicsSimulations />} />
    </Routes>
  );

  return (
    <>
      <ElevationScroll>
        <AppBar
          color="inherit"
          position="fixed"
          sx={{
            padding: "0.75rem",
          }}
        >
          <Toolbar>
            <Typography
              variant="h4"
              fontWeight="700"
              color="primary"
              sx={{ flexGrow: "1" }}
            >
              <Link underline="none" href='/'>
                VISUALIZER
              </Link>
            </Typography>

            {PathFindingAlgorithmsButton}
            <Tooltip title=" Work In Progress!">
              <div>{SortingAlgorithmsButton}</div>
            </Tooltip>
            <Tooltip title="Work In Progress!">
              <div>{PhysicsSimulationsButton}</div>
            </Tooltip>
          </Toolbar>
        </AppBar>
      </ElevationScroll>
    </>
  );
};

export default Header;
