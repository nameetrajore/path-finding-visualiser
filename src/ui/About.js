import React from "react";
import {
  AppBar,
  Grid,
  Box,
  Button,
  Typography,
  Link,
  Tooltip,
  IconButton,
  Modal,
} from "@mui/material";
import useScrollTrigger from "@mui/material/useScrollTrigger";
import { Cancel, Info } from "@mui/icons-material";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  borderRadius: "10px",
  boxShadow: 24,
  p: 7,
  height: "80vh",
  width: "80vw",
  overflowY: "scroll",
  
};

const About = (props) => {
  return (
    <Modal open={props.open}>
      <Box sx={style}>
        <Box>
        <Typography variant="h3" fontWeight={600}>
          About the app.
        </Typography>
        <Typography variant="h4" fontWeight={400} m={1} my={3}>
          Algorithms visualised:
        </Typography>
        <Grid container spacing={4}>
          <Grid item xs={6}>
            <Grid
              sx={{
                boxShadow:
                  "rgba(0, 0, 0, 0.02) 0px 1px 3px 0px, rgba(27, 31, 35, 0.15) 0px 0px 0px 1px",
                borderRadius: "10px",
              }}
              p={3}
            >
              <Typography variant="h5" fontWeight={400} mb={1}>
                Dijkstra's Algorithm
              </Typography>
              <Typography variant="body1" fontWeight={400}>
                This algorithm was first concieved by computer scientist Edsger
                W in 1956 and is considered to be the father of all path finding
                algorithms. This is a{" "}
                <Typography sx={{ display: "inline" }} fontWeight={600}>
                  {" "}
                  weighted{" "}
                </Typography>{" "}
                path finding algorithm and{" "}
                <Typography sx={{ display: "inline" }} fontWeight={600}>
                  {" "}
                  it guarantees shortest path possible.{" "}
                </Typography>
              </Typography>
            </Grid>
          </Grid>
          <Grid item xs={6}>
            <Grid
              sx={{
                boxShadow:
                  "rgba(0, 0, 0, 0.02) 0px 1px 3px 0px, rgba(27, 31, 35, 0.15) 0px 0px 0px 1px",
                borderRadius: "10px",
              }}
              p={3}
            >
              <Typography variant="h5" fontWeight={400} mb={1}>
                A* Algorithm
              </Typography>
              <Typography variant="body1" fontWeight={400}>
                This is a part of informed searching technique where the source
                has an idea about where the destination lies and takes informed
                moves in that direction. This is a{" "}
                <Typography sx={{ display: "inline" }} fontWeight={600}>
                  {" "}
                  weighted{" "}
                </Typography>{" "}
                path finding algorithm and{" "}
                <Typography sx={{ display: "inline" }} fontWeight={600}>
                  {" "}
                  it guarantees shortest path possible.{" "}
                </Typography>
              </Typography>
            </Grid>
          </Grid>
          <Grid item xs={6}>
            <Grid
              sx={{
                boxShadow:
                  "rgba(0, 0, 0, 0.02) 0px 1px 3px 0px, rgba(27, 31, 35, 0.15) 0px 0px 0px 1px",
                borderRadius: "10px",
              }}
              p={3}
            >
              <Typography variant="h5" fontWeight={400} mb={1}>
                Breadth First Search
              </Typography>
              <Typography variant="body1" fontWeight={400}>
                This algorithm starts at a specified node and searches in all
                directions blindly for the destination node. It explores all
                possible routes at one depth level before moving on to the next
                one. This is an{" "}
                <Typography sx={{ display: "inline" }} fontWeight={600}>
                  {" "}
                  unweighted{" "}
                </Typography>{" "}
                path finding algorithm and it{" "}
                <Typography sx={{ display: "inline" }} fontWeight={600}>
                  {" "}
                  does not guarantee shortest path possible.{" "}
                </Typography>
              </Typography>
            </Grid>
          </Grid>
          <Grid item xs={6}>
            <Grid
              sx={{
                boxShadow:
                  "rgba(0, 0, 0, 0.02) 0px 1px 3px 0px, rgba(27, 31, 35, 0.15) 0px 0px 0px 1px",
                borderRadius: "10px",
              }}
              p={3}
            >
              <Typography variant="h5" fontWeight={400} mb={1}>
                Depth First Search
              </Typography>
              <Typography variant="body1" fontWeight={400}>
                Unlike breadth first search this algorithm explores one branch
                of the graph as deep as possible before back-tracking and
                expanding to other nodes. It is possible for it to get lost and never make it to the solution node. This
                is an{" "}
                <Typography sx={{ display: "inline" }} fontWeight={600}>
                  {" "}
                  unweighted{" "}
                </Typography>{" "}
                path finding algorithm and it{" "}
                <Typography sx={{ display: "inline" }} fontWeight={600}>
                  {" "}
                  does not guarantee shortest path possible.{" "}
                </Typography>
              </Typography>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <Grid
              sx={{
                boxShadow:
                  "rgba(0, 0, 0, 0.02) 0px 1px 3px 0px, rgba(27, 31, 35, 0.15) 0px 0px 0px 1px",
                borderRadius: "10px",
              }}
              p={3}
            >
              <Typography variant="h5" fontWeight={400} mb={1}>
                Best First Search
              </Typography>
              <Typography variant="body1" fontWeight={400}>
                This is also a type of informed search algorithm where it uses
                heuristics to take an informed guess about the location of the
                destination node. The difference between this and A* algorithm
                is that A* also takes into consideration the distance of the
                current node from the source node. This is an{" "}
                <Typography sx={{ display: "inline" }} fontWeight={600}>
                  {" "}
                  weighted{" "}
                </Typography>{" "}
                path finding algorithm and it{" "}
                <Typography sx={{ display: "inline" }} fontWeight={600}>
                  {" "}
                  does not guarantee shortest path possible.{" "}
                </Typography>
              </Typography>
            </Grid>
          </Grid>
        </Grid>
        <Grid container  spacing={4}>

        <Grid item xs={6}>
        <Typography variant="h4" fontWeight={400} m={1} mt={4} mb={2}>
          Features Implemented:
        </Typography>
        <Grid ml={2}>
          <Typography variant="body1" fontWeight={400}>
            1) Drag and drop enabled source and destination nodes 
          </Typography>
          <Typography variant="body1" fontWeight={400}>
            2) Drag and drop weighted nodes of user-selectable weights. 
          </Typography>
          <Typography variant="body1" fontWeight={400}>
            3) Weight-maze and Wall-maze implemented with different densities.
          </Typography>
          <Typography variant="body1" fontWeight={400}>
            4) User-selected animation speeds.
          </Typography>
          </Grid>
        </Grid>

        <Grid item xs={6}>
        <Typography variant="h4" fontWeight={400} m={1} mt={4} mb={2}>
          Technologies Used:
        </Typography>
        <Grid ml={2}>
          <Typography variant="h6" fontWeight={400}>
          <Link sx={{display:'inline', textDecoration:'none'}} href={'https://reactjs.org/'} >React</Link>, <Link sx={{display:'inline', textDecoration:'none'}} href={'https://mui.com/'} >MUI</Link> and <Link sx={{display:'inline', textDecoration:'none'}} href={'https://www.javascript.com/'} >Vanilla JS</Link>
          </Typography>
          </Grid>
        </Grid>
        </Grid>
        
        <Grid item color='gray'>
            <Box m={3}/>
        <Typography variant="overline" p={1}  mb={0} >
          Made with <span>&#10084;&#65039;</span> by <Link sx={{display:'inline', textDecoration:'none'}} href={'https://www.linkedin.com/in/nameet-rajore/'} >Nameet Rajore</Link>
        </Typography>
        </Grid>
       
      </Box>
      <Box>
        <IconButton sx={{position:'fixed', right:'1rem', top:'1rem'}} onClick={props.handleClose}>
            <Cancel/>
          </IconButton>
        </Box>
      </Box>
    </Modal>
  );
};

export default About;
