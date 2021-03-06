import {
  Box,
  Button,
  Grid,
  Slider,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Tooltip,
} from "@mui/material";
import Header from "../ui/Header";
import React, { useState } from "react";
import { AppBar, Toolbar } from "@mui/material";
import { pathActions } from "../app/store";
import Node from "../ui/Node/Node";
import { getNodesInShortestPathOrder } from "../algorithms/dijkstra";
import { dijkstra } from "../algorithms/dijkstra";
import { useSelector, useDispatch } from "react-redux";
import FitnessCenterIcon from "@mui/icons-material/FitnessCenter";
import IntroModal from "../ui/IntroModal";
import { bfs, getNodesInShortestPathOrderBfs } from "../algorithms/bfs";
import Guide from "../ui/Guide";
import { dfs, getNodesInShortestPathOrderDfs } from "../algorithms/dfs";
import {
  astarDiagonal,
  getNodesInShortestPathOrderAStarDiagonal,
} from "../algorithms/astarDiagonal";
import NotFoundModal from "../ui/NotFoundModal";
import { astarManhattan, getNodesInShortestPathOrderAStarManhattan } from "../algorithms/astarManhattan";

const PathFindingAlgorithms = () => {
  // const cols = window.innerWidth/36.2;
  // const rows = window.innerHeight/30;
  const cols = 55;
  const rows = 29;

  const dispatch = useDispatch();
  const start = useSelector((state) => state.start);
  const finish = useSelector((state) => state.finish);
  const [mouseIsPressed, setMouseIsPressed] = useState(false);
  const [mazeDensity, setMazeDensity] = useState(5);

  const getNewGridWithWallToggled = (grid, row, col) => {
    const newGrid = grid.slice();
    const node = newGrid[row][col];
    const newNode = {
      ...node,
      isWall: !node.isWall,
      weight: 1,
    };
    newGrid[row][col] = newNode;
    return newGrid;
  };

  const getNewGridWithWallFalse = (grid, row, col) => {
    const newGrid = grid.slice();
    const node = newGrid[row][col];
    const newNode = {
      ...node,
      isWall: false,
      weight: 1,
    };
    newGrid[row][col] = newNode;
    return newGrid;
  };

  const getGridWithWeights = (row, col, weight) => {
    const newGrid = grid.slice();
    const node = newGrid[row][col];
    const newNode = {
      ...node,
      weight,
    };
    newGrid[row][col] = newNode;
    // console.log(newGrid);
    return newGrid;
  };

  const mouseDownHandler = (e, row, col) => {
    // console.log(row, col);
    // console.log(finish, start);
    // console.log(e.target);
    // console.log(e.target.closest("div"));
    if (disable) return;
    if (
      e.target.closest("div").className === "start" ||
      e.target.closest("div").className === "finish"
    )
      return;
    if (e.target.closest("div").className.indexOf("weight") >= 0) {
      const newGrid = getNewGridWithWallFalse(grid, row, col);
      setGrid(newGrid);
      return;
    }
    e.target.innerHTML = "";
    const newGrid = getNewGridWithWallToggled(grid, row, col);
    setGrid(newGrid);
    setMouseIsPressed(true);
  };

  const clearMaze = () => {
    for (let i = 0; i < cols; i++) {
      for (let j = 0; j < rows; j++) {
        // if (
        //   (start.row !== j || start.col !== i) &&
        //   (finish.row !== j || finish.col !== i)
        // ) {
        const newGrid = getNewGridWithWallFalse(grid, j, i);
        setGrid(newGrid);
        // }
      }
    }
  };

  const generateRandomMaze = () => {
    clearMaze();
    for (let i = 0; i < cols; i++) {
      for (let j = 0; j < rows; j++) {
        let r = Math.random();
        if (
          r < 0.033 * mazeDensity &&
          (start.row !== j || start.col !== i) &&
          (finish.row !== j || finish.col !== i)
        ) {
          const newGrid = getNewGridWithWallToggled(grid, j, i);
          setGrid(newGrid);
        }
      }
    }
  };

  const generateRandomWeightMaze = () => {
    clearMaze();
    for (let i = 0; i < cols; i++) {
      for (let j = 0; j < rows; j++) {
        let w = Math.floor(Math.random() * 10) + 2;
        let r = Math.random();
        if (
          r < 0.05 * mazeDensity &&
          (start.row !== j || start.col !== i) &&
          (finish.row !== j || finish.col !== i)
        ) {
          const newGrid = getGridWithWeights(j, i, w);
          setGrid(newGrid);
        }
      }
    }
  };

  const mouseEnterHandler = (row, col) => {
    // if (!mouseIsPressed) return;
    // console.log("executed");
    // if (
    //   (start.row === row && start.col === col) ||
    //   (finish.col === col && finish.row === row)
    // )
    //   return;
    // const newGrid = getNewGridWithWallToggled(grid, row, col);
    // setGrid(newGrid);
  };

  const mouseUpHandler = () => {
    // setMouseIsPressed(false);
  };

  const createNode = (col, row) => {
    return {
      row,
      col,
      distance: Infinity,
      weight: 1,
      isVisited: false,
      isWall: false,
      previousNode: null,
      f: 0,
      // getGridWithWeights,
      // mouseDownHandler,
      // mouseEnterHandler,
      // mouseUpHandler,
    };
  };

  const getInitialGrid = () => {
    const grid = [];
    for (let i = 0; i < rows; i++) {
      let currentRow = [];
      for (let j = 0; j < cols; j++) {
        currentRow.push(createNode(j, i));
      }
      grid.push(currentRow);
    }
    return grid;
  };

  const [grid, setGrid] = useState(getInitialGrid());
  const [speed, setSpeed] = useState(10);
  const [disable, setDisable] = useState(false);
  const [disableClear, setDisableClear] = useState(true);
  const [visitedNodes, setVisitedNodes] = useState([]);
  const [algo, setAlgo] = useState("");
  const [weight, setWeight] = useState(2);
  const [notFound, setNotFound] = useState(false);

  const animateAlgo = (visitedNodesInOrder, nodesInShortestPathOrder) => {
    setDisable(true);
    for (let i = 0; i <= visitedNodesInOrder.length; i++) {
      if (i === visitedNodesInOrder.length) {
        setTimeout(() => {
          animateShortestPath(nodesInShortestPathOrder);
        }, (100 / speed) * i);
        return;
      }
      setTimeout(() => {
        const node = visitedNodesInOrder[i];
        const element = document.getElementById(`node-${node.row}-${node.col}`);
        if (!element.className.includes("node-visited"))
          element.className = "node node-visited";
      }, (100 / speed) * i);
    }
  };

  const animateShortestPath = (nodesInShortestPathOrder) => {
    for (let i = 0; i < nodesInShortestPathOrder.length; i++) {
      setTimeout(() => {
        const node = nodesInShortestPathOrder[i];
        document.getElementById(`node-${node.row}-${node.col}`).className =
          " node node-visited node-shortest-path";
        if (i === nodesInShortestPathOrder.length - 2) setDisableClear(false);
      }, 20 * i);
    }
    if (nodesInShortestPathOrder.length === 1) {
      setDisableClear(false);
      setTimeout(setNotFound(true), 20);
    }
  };

  const visualiseDijkstra = () => {
    let visitedNodesInOrder = dijkstra(
      grid,
      grid[start.row][start.col],
      grid[finish.row][finish.col]
    );
    //console.log(visitedNodesInOrder);
    setVisitedNodes(visitedNodesInOrder);
    const nodesInShortestPathOrder = getNodesInShortestPathOrder(
      grid[finish.row][finish.col]
    );
    console.log(nodesInShortestPathOrder.length);
    animateAlgo(visitedNodesInOrder, nodesInShortestPathOrder);
  };

  const visualiseBfs = () => {
    let visitedNodesInOrder = bfs(
      grid,
      grid[start.row][start.col],
      grid[finish.row][finish.col]
    );
    setVisitedNodes(visitedNodesInOrder);
    const nodesInShortestPathOrder = getNodesInShortestPathOrderBfs(
      grid[finish.row][finish.col]
    );
    animateAlgo(visitedNodesInOrder, nodesInShortestPathOrder);
  };

  const visualiseAStarDiagonal = () => {
    const visitedNodesInOrder = astarDiagonal(
      grid,
      grid[start.row][start.col],
      grid[finish.row][finish.col]
    );
    setVisitedNodes(visitedNodesInOrder);
    const nodesInShortestPathOrder = getNodesInShortestPathOrderAStarDiagonal(
      grid[finish.row][finish.col]
    );
    console.log(nodesInShortestPathOrder.length);
    animateAlgo(visitedNodesInOrder, nodesInShortestPathOrder);
  };

  const visualiseAStar = () => {
    const visitedNodesInOrder = astarManhattan(
      grid,
      grid[start.row][start.col],
      grid[finish.row][finish.col]
    );
    //console.log(visitedNodesInOrder);
    setVisitedNodes(visitedNodesInOrder);
    const nodesInShortestPathOrder = getNodesInShortestPathOrderAStarManhattan(
      grid[finish.row][finish.col]
    );
    console.log(nodesInShortestPathOrder.length);
    animateAlgo(visitedNodesInOrder, nodesInShortestPathOrder);
  };

  const visualiseDfs = () => {
    let visitedNodesInOrder = dfs(
      grid,
      grid[start.row][start.col],
      grid[finish.row][finish.col]
    );
    setVisitedNodes(visitedNodesInOrder);
    const nodesInShortestPathOrder = getNodesInShortestPathOrderDfs(
      grid[finish.row][finish.col]
    );
    animateAlgo(visitedNodesInOrder, nodesInShortestPathOrder);
  };

  //For future development
  const visualiseWithoutAnimation = (row, col) => {
    // for (let i = 0; i < cols; i++) {
    //   for (let j = 0; j < rows; j++) {
    //     const node = grid[i][j];
    //     // console.log(grid);
    //     document.getElementById(
    //       `node-${node.row}-${node.col}`
    //     ).className = `node ${node.isWall ? "node-wall" : ""}`;
    //   }
    // }
    // let visitedNodesInOrder = dijkstra(
    //   grid,
    //   grid[start.row][start.col],
    //   grid[row][col]
    // );
    // const nodesInShortestPathOrder = getNodesInShortestPathOrder(
    //   grid[row][col]
    // );
    // for (let i = 0; i <= visitedNodesInOrder.length; i++) {
    //   if (i === visitedNodesInOrder.length) {
    //     for (let i = 0; i < nodesInShortestPathOrder.length; i++) {
    //       const node = nodesInShortestPathOrder[i];
    //       document.getElementById(`node-${node.row}-${node.col}`).className =
    //         " node node-visited-no-anim node-shortest-path-no-anim";
    //     }
    //     return;
    //   }
    //   const node = visitedNodesInOrder[i];
    //   const element = document.getElementById(`node-${node.row}-${node.col}`);
    //   if (!element.className.includes("node-visited"))
    //     element.className = "node node-visited-no-anim";
    // }
  };

  const clearBoard = () => {
    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < cols; j++) {
        setTimeout(() => {
          document.getElementById(`node-${i}-${j}`).className = `node ${
            document
              .getElementById(`node-${i}-${j}`)
              .classList.contains("node-wall")
              ? "node-wall"
              : ""
          }`;
        }, 50 * j);
      }
    }
    // for (let i = 0; i < visitedNodes.length; i++) {
    //   setTimeout(() => {
    //     document.getElementById(
    //       `node-${finish.row}-${finish.col}`).className ='node';
    //     const node = visitedNodes[i];
    //     setTimeout(() => {
    //       document.getElementById(
    //         `node-${node.row}-${node.col}`
    //       ).className = `node ${node.isWall ? "node-wall" : ""}`;
    //     }, 2 * i);
    //   });
    // }

    // if (
    //   document.getElementsByClassName("node node-visited node-shortest-path")
    //     .length !== 0
    // )
    //   document.getElementsByClassName(
    //     "node node-visited node-shortest-path"
    //   )[0].className = "node";

    setGrid((prevGrid) => {
      for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
          prevGrid[i][j].distance = Infinity;
          prevGrid[i][j].isVisited = false;
          prevGrid[i][j].previousNode = null;
        }
      }
      return prevGrid;
    });

    setDisable(false);
    setDisableClear(true);
  };

  const resetBoard = () => {
    clearBoard();
    dispatch(pathActions.setStart({ row: 14, col: 4 }));
    dispatch(pathActions.setFinish({ row: 14, col: 50 }));
    setGrid((prevGrid) => {
      for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
          prevGrid[i][j].isWall = false;
          prevGrid[i][j].distance = Infinity;
          prevGrid[i][j].isVisited = false;
          prevGrid[i][j].previousNode = null;
          prevGrid[i][j].weight = 1;
        }
      }
      return prevGrid;
    });
  };

  const speedHandler = (event, value) => {
    setSpeed(value);
  };

  const weightHandler = (event, value) => {
    setWeight(value);
  };

  const weightStartDragHandler = (e, weight) => {
    e.dataTransfer.setData("class", "weight");
    e.dataTransfer.setData("weight", weight);
  };

  const handleSelect = (e) => {
    setAlgo(e.target.value);
  };

  const runAlgo = () => {
    if (algo === "Dijkstra's Algorithm") visualiseDijkstra();
    else if (algo === "bfs") visualiseBfs();
    else if (algo === "dfs") visualiseDfs();
    else if (algo === "astar-diagonal") visualiseAStarDiagonal();
    else if (algo === "astar") visualiseAStar();
  };

  return (
    <>
    <Header algo={algo} handleSelect={handleSelect} runAlgo={runAlgo} disable={disable} disableClear={disableClear} resetBoard={resetBoard} clearBoard={clearBoard}/>
      <Box m="13vh" />
      <IntroModal />
      <NotFoundModal notFound={notFound} setNotFound={setNotFound} />
      <Grid
        container
        sx={{
        }}
        direction="row"
        justifyContent="space-evenly"
        alignItems="center"
        minWidth='1400px'
      >
        <Grid item xs={10}>
          <Grid item justifyContent="space-evenly" alignItems="flex-start">
            {grid.map((row, rowIdx) => (
              <div key={rowIdx}>
                {row.map((node, nodeIdx) => (
                  <Node
                    key={nodeIdx}
                    {...node}
                    disable={disable}
                    disableClear={disableClear}
                    visualiseWithoutAnimation={visualiseWithoutAnimation}
                    setGrid={setGrid}
                    getGridWithWeights={getGridWithWeights}
                    mouseDownHandler={mouseDownHandler}
                    mouseEnterHandler={mouseEnterHandler}
                    mouseUpHandler={mouseUpHandler}
                    // added mouseUp, mouseDown and mouseEnter
                  />
                ))}
              </div>
            ))}
          </Grid>
        </Grid>
        <Grid
          item
          xs={2}
          sx={{
           
            px: 2,
            
            borderRadius: 2,
          }}
        >
          {/* <FormControl variant="standard" fullWidth >
            <InputLabel id="demo-simple-select-label">
              Choose Algorithm
            </InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={algo}
              label="Algorithm"
              onChange={handleSelect}
              sx={{ mb: 2 }}
            >
              <MenuItem value="Dijkstra's Algorithm">
                Dijkstra's Algorithm
              </MenuItem>
              <MenuItem value="astar">A* Search Algorithm</MenuItem>
              <MenuItem value="best-first">
                Best First Search Algorithm
              </MenuItem>
              <MenuItem value="dfs">Depth First Search Algorithm</MenuItem>
              <MenuItem value="bfs">Breadth First Search Algorithm</MenuItem>
            </Select>
          </FormControl> */}
          {/* <Button
            onClick={runAlgo}
            variant="contained"
            disableElevation
            size="large"
            fullWidth
            color="success"
            disabled={disable || algo === ""}
          >
            Visualise
          </Button>
          <Grid container spacing={1}>
            <Grid item xs={6}>
              <Button
                onClick={clearBoard}
                variant="contained"
                disableElevation
                size="large"
                fullWidth
                color="error"
                disabled={disableClear}
                sx={{ mt: 2 }}
              >
                Clear Board
              </Button>
            </Grid>
            <Grid item xs={6}>
              <Button
                onClick={resetBoard}
                variant="outlined"
                disableElevation
                size="large"
                fullWidth
                disabled={
                  (disable || !disableClear) && (!disable || disableClear)
                }
                color="error"
                sx={{ mt: 2 }}
              >
                Reset
              </Button>
            </Grid>
          </Grid> */}
          <Grid sx={{ mt: 0 }}>
            <Typography>Speed</Typography>
            <Slider
              size="small"
              defaultValue={speed}
              value={speed}
              min={1}
              max={25}
              valueLabelDisplay="auto"
              onChange={speedHandler}
              disabled={disable}
            />
          </Grid>
          <Grid container sx={{ mt: 1}}>
            <Grid item xs={10}>
              <Typography >Weight</Typography>
              <Slider
                size="small"
                color="secondary"
                defaultValue={weight}
                value={weight}
                min={2}
                max={10}
                valueLabelDisplay="auto"
                onChange={weightHandler}
                disabled={disable}
              />
            </Grid>
            <Tooltip title="Drag & Drop" arrow followCursor>
              <Grid
                mt={2.5}
                ml={2}
                xs={1}
                draggable
                item
                justifyItems="center"
                alignItems="center"
                onDragStart={(e) => weightStartDragHandler(e, weight)}
                className="weight"
                id={`weight-${weight}`}
                sx={{ height: "25px" }}
              >
                <FitnessCenterIcon
                  htmlColor={`rgb(${255 - weight * 20},${255 - weight * 20},${
                    255 - weight * 20
                  })`}
                />
              </Grid>
            </Tooltip>
          </Grid>
          <Grid sx={{ mt: 1 }}>
            <Typography >Maze Density</Typography>
            <Slider
              size="small"
              color="primary"
              defaultValue={mazeDensity}
              value={mazeDensity}
              min={1}
              max={10}
              valueLabelDisplay="auto"
              onChange={(e, value) => {
                setMazeDensity(value);
              }}
              disabled={disable}
            />
          </Grid>
          <Grid container spacing={1}>
            <Grid item xs={12}>
              <Button
                onClick={generateRandomMaze}
                variant="contained"
                
                disableElevation
                disabled={disable}
                fullWidth
                sx={{ mt: 1 }}
              >
                Generate Wall Maze
              </Button>
            </Grid>
            <Grid item xs={12}>
              <Button
                onClick={generateRandomWeightMaze}
                variant="contained"
                disableElevation
                
                color="secondary"
                disabled={disable}
                fullWidth
                sx={{ mt: 0 }}
              >
                Generate Weight Maze
              </Button>
            </Grid>
            <Grid item xs={12}>
              <Button
                onClick={clearMaze}
                variant="outlined"
                disableElevation
                
                fullWidth
                disabled={disable}
                sx={{ mb: 0 }}
              >
                Clear Maze
              </Button>
            </Grid>
          </Grid>

          <Guide />
        </Grid>

      </Grid>
    </>
  );
};

export default PathFindingAlgorithms;
