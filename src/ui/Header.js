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
  Select,
  FormControl, InputLabel,
  MenuItem,
  ButtonGroup,

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



const Header = (props) => {
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
    <ElevationScroll {...props}>
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
          <FormControl variant='standard' sx={{minWidth:'300px', mr:1, mb:1, pb:-2}} size='small'>
            <InputLabel id="demo-simple-select-label">
              Choose Algorithm
            </InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={props.algo}
              label="Algorithm"
              onChange={props.handleSelect}
            >
              <MenuItem value="Dijkstra's Algorithm">
                Dijkstra's Algorithm
              </MenuItem>
              <MenuItem value="astar">A* Manhattan Search Algorithm</MenuItem>
              <MenuItem value="astar-diagonal">
                A* Diagonal Search Algorithm
              </MenuItem>
              <MenuItem value="dfs">Depth First Search Algorithm</MenuItem>
              <MenuItem value="bfs">Breadth First Search Algorithm</MenuItem>
            </Select>
          </FormControl>
          <ButtonGroup sx={{mx:2}}>
          <Button
            onClick={props.runAlgo}
            variant="contained"
            disableElevation
            color="success"
            disabled={props.disable || props.algo === ""}
          >
            Visualise Algo
          </Button>
          <Button
                onClick={props.clearBoard}
                variant="contained"
                disableElevation
                size="large"
                color="error"
                disabled={props.disableClear}
              >
                Clear Path
              </Button>
          <Button
                onClick={props.resetBoard}
                variant="outlined"
                disableElevation
                
                
                disabled={
                  (props.disable || !props.disableClear) && (!props.disable || props.disableClear)
                }
                color="error"
              >
                Reset Board
              </Button>
          </ButtonGroup>
          <IconButton onClick={infoHandler}>
            <Info />
          </IconButton>
        </Toolbar>
      </AppBar>
      </ElevationScroll>
    </>
  );
};

export default Header;
