import { Box, Button, Grid, Slider, Typography, FormControl, InputLabel, Select,MenuItem } from "@mui/material";
import React, { useState } from "react";
import { AppBar, Toolbar } from "@mui/material";
import { pathActions } from "../app/store";
import Node from "../ui/Node/Node";
import { getNodesInShortestPathOrder } from "../algorithms/dijkstra";
import { dijkstra } from "../algorithms/dijkstra";
import { useSelector, useDispatch } from "react-redux";

const PathFindingAlgorithms = () => {
  const dispatch = useDispatch();
  const start = useSelector((state) => state.start);
  const finish = useSelector((state) => state.finish);
  const [mouseIsPressed, setMouseIsPressed] = useState(false);

  const getNewGridWithWallToggled = (grid, row, col) => {
    const newGrid = grid.slice();
    const node = newGrid[row][col];
    const newNode = {
      ...node,
      isWall: !node.isWall,
    };
    newGrid[row][col] = newNode;
    return newGrid;
  };

  const mouseDownHandler = (e, row, col) => {
    // console.log(row, col);
    // console.log(finish, start);
    // console.log(e.target);
    console.log(e.target.closest("div"));
    if (disable) return;
    if (
      e.target.closest("div").className === "start" ||
      e.target.closest("div").className === "finish"
    )
      return;
    const newGrid = getNewGridWithWallToggled(grid, row, col);
    setGrid(newGrid);
    setMouseIsPressed(true);
  };

  const mouseEnterHandler = (row, col) => {
    if (!mouseIsPressed) return;

    console.log("executed");
    if (
      (start.row === row && start.col === col) ||
      (finish.col === col && finish.row === row)
    )
      return;
    const newGrid = getNewGridWithWallToggled(grid, row, col);
    setGrid(newGrid);
  };

  const mouseUpHandler = () => {
    setMouseIsPressed(false);
  };

  const createNode = (col, row) => {
    return {
      row,
      col,
      distance: Infinity,
      isVisited: false,
      isWall: false,
      previousNode: null,
      mouseDownHandler,
      mouseEnterHandler,
      mouseUpHandler,
    };
  };

  const getInitialGrid = () => {
    const grid = [];
    for (let i = 0; i < 30; i++) {
      let currentRow = [];
      for (let j = 0; j < 50; j++) {
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

  const animateDijkstra = (visitedNodesInOrder, nodesInShortestPathOrder) => {
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
      }, 50 * i);
    }
    setDisableClear(false);
  };

  const visualiseDijkstra = () => {
    let visitedNodesInOrder = dijkstra(
      grid,
      grid[start.row][start.col],
      grid[finish.row][finish.col]
    );
    setVisitedNodes(visitedNodesInOrder);
    const nodesInShortestPathOrder = getNodesInShortestPathOrder(
      grid[finish.row][finish.col]
    );
    animateDijkstra(visitedNodesInOrder, nodesInShortestPathOrder);
  };

  //For future development
  const visualiseWithoutAnimation = (row, col) => {
    for (let i = 0; i < 50; i++) {
      for (let j = 0; j < 30; j++) {
        const node = grid[i][j];
        console.log(grid);
        document.getElementById(
          `node-${node.row}-${node.col}`
        ).className = `node ${node.isWall ? "node-wall" : ""}`;
      }
    }
    let visitedNodesInOrder = dijkstra(
      grid,
      grid[start.row][start.col],
      grid[row][col]
    );
    const nodesInShortestPathOrder = getNodesInShortestPathOrder(
      grid[row][col]
    );

    for (let i = 0; i <= visitedNodesInOrder.length; i++) {
      if (i === visitedNodesInOrder.length) {
        for (let i = 0; i < nodesInShortestPathOrder.length; i++) {
          const node = nodesInShortestPathOrder[i];
          document.getElementById(`node-${node.row}-${node.col}`).className =
            " node node-visited-no-anim node-shortest-path-no-anim";
        }
        return;
      }
      const node = visitedNodesInOrder[i];
      const element = document.getElementById(`node-${node.row}-${node.col}`);
      if (!element.className.includes("node-visited"))
        element.className = "node node-visited-no-anim";
    }
  };

  const clearBoard = () => {
    for (let i = 0; i < visitedNodes.length; i++) {
      setTimeout(() => {
        const node = visitedNodes[i];
        setTimeout(() => {
          document.getElementById(
            `node-${node.row}-${node.col}`
          ).className = `node ${node.isWall ? "node-wall" : ""}`;
        }, 2 * i);
      });
    }

    setGrid((prevGrid) => {
      for (let i = 0; i < 30; i++) {
        for (let j = 0; j < 50; j++) {
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
    dispatch(pathActions.setStart({ row: 14, col: 4 }));
    dispatch(pathActions.setFinish({ row: 14, col: 45 }));
    clearBoard();
    setGrid((prevGrid) => {
      for (let i = 0; i < 30; i++) {
        for (let j = 0; j < 50; j++) {
          prevGrid[i][j].isWall = false;
          prevGrid[i][j].distance = Infinity;
          prevGrid[i][j].isVisited = false;
          prevGrid[i][j].previousNode = null;
        }
      }
      return prevGrid;
    });
  };

  const speedHandler = (event, value) => {
    setSpeed(value);
  };

  const handleSelect = (e)=>{
      setAlgo(e.target.value);
  }

  const runAlgo = () =>{
    if(algo==="Dijkstra's Algorithm")
    visualiseDijkstra();
  }

  return (
    <>
      <Box m="12vh" />
      <Grid
        container
       
        sx={{
          px: 4,
        }}
        direction="row"
        justifyContent="space-evenly"
        alignItems="center"
      >
        <Grid item xs={9.5}>
          <Grid item justifyContent="space-evenly" alignItems="center">
            {grid.map((row, rowIdx) => (
              <div key={rowIdx}>
                {row.map((node, nodeIdx) => (
                  <Node
                    key={nodeIdx}
                    {...node}
                    disable={disable}
                    disableClear={disableClear}
                    visualiseWithoutAnimation={visualiseWithoutAnimation}
                  />
                ))}
              </div>
            ))}
          </Grid>
        </Grid>

        <Grid item xs={2}>
          <FormControl variant="standard" fullWidth >
            <InputLabel id="demo-simple-select-label">Choose Algorithm</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={algo}
              label="Algorithm"
              onChange={handleSelect}
              sx={{mb:2}}
              
            >
              <MenuItem value="Dijkstra's Algorithm">Djikstra's Algorithm</MenuItem>
              {/* <MenuItem value={2}>Twenty</MenuItem>
              <MenuItem value={3}>Thirty</MenuItem> */}
            </Select>
          </FormControl>
          <Button
            onClick={runAlgo}
            variant="contained"
            disableElevation
            size="large"
            fullWidth
            color="success"
            disabled={disable}
          >
            Visualise
          </Button>
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
          <Button
            onClick={resetBoard}
            variant=""
            disableElevation
            size="large"
            fullWidth
            disabled={(disable || !disableClear) && (!disable || disableClear)}
            color="error"
            sx={{ mt: 2 }}
          >
            Reset
          </Button>
          <Grid sx={{ mt: 2 }}>
            <Typography>Speed</Typography>
            <Slider
              key="4"
              size="small"
              defaultValue={speed}
              value={speed}
              min={1}
              max={30}
              valueLabelDisplay="auto"
              onChange={speedHandler}
              disabled={disable}
            />
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};

export default PathFindingAlgorithms;
