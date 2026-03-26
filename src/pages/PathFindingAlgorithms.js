import {
  Box,
  Button,
  Slider,
  Typography,
  Tooltip,
  Select,
  MenuItem,
} from "@mui/material";
import Header from "../ui/Header";
import React, { useState, useRef, useCallback, useEffect } from "react";
import { pathActions } from "../app/store";
import Node from "../ui/Node/Node";
import { getNodesInShortestPathOrder, dijkstra } from "../algorithms/dijkstra";
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
import {
  astarManhattan,
  getNodesInShortestPathOrderAStarManhattan,
} from "../algorithms/astarManhattan";
import { recursiveDivision } from "../algorithms/mazes/recursiveDivision";
import { recursiveBacktracking } from "../algorithms/mazes/recursiveBacktracking";
import { primsAlgorithm } from "../algorithms/mazes/prims";
import AlgoInfo from "../ui/AlgoInfo";

const CELL_SIZE = 24;
const SIDEBAR_W = 240;
const H_OFFSET = SIDEBAR_W + 32 + 16;
const V_OFFSET = 88 + 32;

const calcDims = () => ({
  cols: Math.max(10, Math.floor((window.innerWidth - H_OFFSET) / CELL_SIZE)),
  rows: Math.max(5,  Math.floor((window.innerHeight - V_OFFSET) / CELL_SIZE)),
});

const createNode = (col, row) => ({
  row, col,
  distance: Infinity, weight: 1, isVisited: false,
  isWall: false, previousNode: null, f: 0,
});

const buildGrid = (rows, cols) =>
  Array.from({ length: rows }, (_, i) =>
    Array.from({ length: cols }, (_, j) => createNode(j, i))
  );

const defaultStart  = (rows)       => ({ row: Math.floor(rows / 2), col: 2 });
const defaultFinish = (rows, cols) => ({ row: Math.floor(rows / 2), col: cols - 3 });

const PathFindingAlgorithms = () => {
  const dispatch = useDispatch();
  const start  = useSelector((state) => state.start);
  const finish = useSelector((state) => state.finish);
  const [mazeDensity, setMazeDensity] = useState(5);
  const [mazeType, setMazeType]       = useState("random-wall");

  const [dims, setDims] = useState(calcDims);
  const { cols, rows } = dims;

  const [grid, setGrid]               = useState(() => buildGrid(dims.rows, dims.cols));
  const [speed, setSpeed]             = useState(10);
  const [disable, setDisable]         = useState(false);
  const [disableClear, setDisableClear] = useState(true);
  const [algo, setAlgo]               = useState("");
  const [weight, setWeight]           = useState(2);
  const [notFound, setNotFound]       = useState(false);
  const [stats, setStats]             = useState(null);

  useEffect(() => {
    let timeout;
    const handleResize = () => {
      clearTimeout(timeout);
      timeout = setTimeout(() => setDims(calcDims()), 150);
    };
    window.addEventListener("resize", handleResize);
    return () => { window.removeEventListener("resize", handleResize); clearTimeout(timeout); };
  }, []);

  useEffect(() => {
    dispatch(pathActions.setStart(defaultStart(rows)));
    dispatch(pathActions.setFinish(defaultFinish(rows, cols)));
    setGrid(buildGrid(rows, cols));
    setDisable(false);
    setDisableClear(true);
    setStats(null);
  }, [rows, cols, dispatch]);

  const mouseIsPressedRef = useRef(false);
  const disableRef        = useRef(disable);
  const startRef          = useRef(start);
  const finishRef         = useRef(finish);
  const pendingWallsRef   = useRef({});
  disableRef.current = disable;
  startRef.current   = start;
  finishRef.current  = finish;

  const mouseDownHandler = useCallback((e, row, col) => {
    if (disableRef.current) return;
    if (
      e.target.closest("div").className === "start" ||
      e.target.closest("div").className === "finish"
    ) return;
    if (e.target.closest("div").className.indexOf("weight") >= 0) {
      setGrid(prev => {
        const newGrid = prev.slice();
        newGrid[row][col] = { ...prev[row][col], isWall: false, weight: 1 };
        return newGrid;
      });
      return;
    }
    const el = document.getElementById(`node-${row}-${col}`);
    if (!el) return;
    const isWall = el.classList.contains("node-wall");
    if (isWall) {
      el.classList.remove("node-wall");
      pendingWallsRef.current[`${row}-${col}`] = false;
    } else {
      el.classList.add("node-wall");
      pendingWallsRef.current[`${row}-${col}`] = true;
    }
    mouseIsPressedRef.current = true;
  }, []);

  const mouseEnterHandler = useCallback((row, col) => {
    if (!mouseIsPressedRef.current) return;
    const s = startRef.current;
    const f = finishRef.current;
    if ((s.row === row && s.col === col) || (f.row === row && f.col === col)) return;
    const el = document.getElementById(`node-${row}-${col}`);
    if (!el || el.classList.contains("node-wall")) return;
    el.classList.add("node-wall");
    pendingWallsRef.current[`${row}-${col}`] = true;
  }, []);

  const mouseUpHandler = useCallback(() => {
    mouseIsPressedRef.current = false;
    const changes = pendingWallsRef.current;
    if (Object.keys(changes).length === 0) return;
    pendingWallsRef.current = {};
    setGrid(prev => {
      const newGrid = prev.map(r => r.slice());
      for (const [key, isWall] of Object.entries(changes)) {
        const [r, c] = key.split("-").map(Number);
        newGrid[r][c] = { ...newGrid[r][c], isWall, weight: 1 };
      }
      return newGrid;
    });
  }, []);

  const setNodeWeight = useCallback((row, col, w) => {
    setGrid(prev => {
      const newGrid = prev.slice();
      newGrid[row][col] = { ...prev[row][col], weight: w };
      return newGrid;
    });
  }, []);

  const onDropStart  = useCallback((row, col) => dispatch(pathActions.setStart({ row, col })), [dispatch]);
  const onDropFinish = useCallback((row, col) => dispatch(pathActions.setFinish({ row, col })), [dispatch]);

  const clearMaze = () => {
    setGrid(grid.map(row => row.map(node => ({ ...node, isWall: false, weight: 1 }))));
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        const el = document.getElementById(`node-${r}-${c}`);
        if (el && el.classList.contains("node-wall")) el.classList.remove("node-wall");
      }
    }
  };

  const generateRandomMaze = () => {
    setGrid(
      grid.map((row, j) =>
        row.map((node, i) => ({
          ...node,
          isWall:
            !(start.row === j && start.col === i) &&
            !(finish.row === j && finish.col === i) &&
            Math.random() < 0.033 * mazeDensity,
          weight: 1,
        }))
      )
    );
  };

  const generateRandomWeightMaze = () => {
    setGrid(
      grid.map((row, j) =>
        row.map((node, i) => {
          const isStart  = start.row === j && start.col === i;
          const isFinish = finish.row === j && finish.col === i;
          const w = Math.floor(Math.random() * 10) + 2;
          return {
            ...node,
            isWall: false,
            weight: !isStart && !isFinish && Math.random() < 0.05 * mazeDensity ? w : 1,
          };
        })
      )
    );
  };

  const animateMaze = (operations, mode) => {
    setDisable(true);

    if (mode === "add-walls") {
      setGrid(buildGrid(rows, cols));
      for (let r = 0; r < rows; r++)
        for (let c = 0; c < cols; c++) {
          const el = document.getElementById(`node-${r}-${c}`);
          if (el) el.className = "node";
        }
    } else {
      setGrid(prev =>
        prev.map((row, r) =>
          row.map((node, c) => ({
            ...node,
            isWall: !(r === start.row && c === start.col) && !(r === finish.row && c === finish.col),
            weight: 1,
          }))
        )
      );
      for (let r = 0; r < rows; r++)
        for (let c = 0; c < cols; c++) {
          const el = document.getElementById(`node-${r}-${c}`);
          if (!el) continue;
          el.className =
            (r === start.row && c === start.col) || (r === finish.row && c === finish.col)
              ? "node"
              : "node node-wall";
        }
    }

    const delay = Math.max(5, 100 / speed);

    operations.forEach((op, i) => {
      setTimeout(() => {
        const el = document.getElementById(`node-${op.row}-${op.col}`);
        if (!el) return;
        el.className = mode === "add-walls" ? "node node-wall" : "node";
        if (i === operations.length - 1) {
          setGrid(prev =>
            prev.map((row, r) =>
              row.map((node, c) => {
                const el2 = document.getElementById(`node-${r}-${c}`);
                return { ...node, isWall: el2 ? el2.classList.contains("node-wall") : node.isWall, weight: 1 };
              })
            )
          );
          setDisable(false);
        }
      }, delay * i);
    });

    if (operations.length === 0) setDisable(false);
  };

  const generateMaze = () => {
    if (mazeType === "random-wall") {
      generateRandomMaze();
    } else if (mazeType === "recursive-division") {
      animateMaze(recursiveDivision(rows, cols, start, finish), "add-walls");
    } else if (mazeType === "recursive-backtracking") {
      animateMaze(recursiveBacktracking(rows, cols, start, finish), "carve");
    } else if (mazeType === "prims") {
      animateMaze(primsAlgorithm(rows, cols, start, finish), "carve");
    }
  };

  const animateShortestPath = (nodesInShortestPathOrder, visitedCount, animSpeed) => {
    if (nodesInShortestPathOrder.length === 1) {
      setDisableClear(false);
      setNotFound(true);
      setStats({ visited: visitedCount, pathLength: 0 });
      return;
    }
    for (let i = 0; i < nodesInShortestPathOrder.length; i++) {
      setTimeout(() => {
        const node = nodesInShortestPathOrder[i];
        document.getElementById(`node-${node.row}-${node.col}`).className =
          "node node-visited node-shortest-path";
        if (i === nodesInShortestPathOrder.length - 1) {
          setDisableClear(false);
          setStats({ visited: visitedCount, pathLength: nodesInShortestPathOrder.length - 1 });
        }
      }, (100 / animSpeed) * i);
    }
  };

  const animateAlgo = (visitedNodesInOrder, nodesInShortestPathOrder) => {
    setDisable(true);
    setStats(null);
    const animSpeed = speed;
    for (let i = 0; i <= visitedNodesInOrder.length; i++) {
      if (i === visitedNodesInOrder.length) {
        setTimeout(() => {
          animateShortestPath(nodesInShortestPathOrder, visitedNodesInOrder.length, animSpeed);
        }, (100 / animSpeed) * i);
        return;
      }
      setTimeout(() => {
        const node = visitedNodesInOrder[i];
        const element = document.getElementById(`node-${node.row}-${node.col}`);
        if (!element.className.includes("node-visited"))
          element.className = "node node-visited";
      }, (100 / animSpeed) * i);
    }
  };

  const clearBoard = () => {
    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < cols; j++) {
        setTimeout(() => {
          const el = document.getElementById(`node-${i}-${j}`);
          el.className = `node ${el.classList.contains("node-wall") ? "node-wall" : ""}`;
        }, 50 * j);
      }
    }
    setGrid(prevGrid =>
      prevGrid.map(row =>
        row.map(node => ({ ...node, distance: Infinity, isVisited: false, previousNode: null, f: 0 }))
      )
    );
    setDisable(false);
    setDisableClear(true);
    setStats(null);
  };

  const resetBoard = () => {
    clearBoard();
    dispatch(pathActions.setStart(defaultStart(rows)));
    dispatch(pathActions.setFinish(defaultFinish(rows, cols)));
    setGrid(buildGrid(rows, cols));
  };

  const runAlgo = () => {
    const s = grid[start.row][start.col];
    const f = grid[finish.row][finish.col];
    if (algo === "Dijkstra's Algorithm")
      animateAlgo(dijkstra(grid, s, f), getNodesInShortestPathOrder(f));
    else if (algo === "bfs")
      animateAlgo(bfs(grid, s, f), getNodesInShortestPathOrderBfs(f));
    else if (algo === "dfs")
      animateAlgo(dfs(grid, s, f), getNodesInShortestPathOrderDfs(f));
    else if (algo === "astar-diagonal")
      animateAlgo(astarDiagonal(grid, s, f), getNodesInShortestPathOrderAStarDiagonal(f));
    else if (algo === "astar")
      animateAlgo(astarManhattan(grid, s, f), getNodesInShortestPathOrderAStarManhattan(f));
  };

  return (
    <>
      <Header
        algo={algo}
        handleSelect={(e) => setAlgo(e.target.value)}
        runAlgo={runAlgo}
        disable={disable}
        disableClear={disableClear}
        resetBoard={resetBoard}
        clearBoard={clearBoard}
      />
      <IntroModal />
      <NotFoundModal notFound={notFound} setNotFound={setNotFound} />
      <Box sx={{ display: "flex", flexDirection: "column", height: "100vh", overflow: "hidden" }}>
        <Box sx={{ height: "88px", flexShrink: 0 }} />
        <Box
          sx={{ flex: 1, display: "flex", alignItems: "stretch", gap: 2, px: 2, py: 1, minHeight: 0 }}
          style={{ "--cell-size": `${CELL_SIZE}px` }}
        >
          <Box sx={{ lineHeight: 0, alignSelf: "flex-start" }}>
            {grid.map((row, rowIdx) => (
              <div key={rowIdx} style={{ display: "flex" }}>
                {row.map((node, nodeIdx) => (
                  <Node
                    key={nodeIdx}
                    {...node}
                    isStart={start.row === rowIdx && start.col === nodeIdx}
                    isFinish={finish.row === rowIdx && finish.col === nodeIdx}
                    disable={disable}
                    disableClear={disableClear}
                    setNodeWeight={setNodeWeight}
                    mouseDownHandler={mouseDownHandler}
                    mouseEnterHandler={mouseEnterHandler}
                    mouseUpHandler={mouseUpHandler}
                    onDropStart={onDropStart}
                    onDropFinish={onDropFinish}
                  />
                ))}
              </div>
            ))}
          </Box>

          {/* Sidebar */}
          <Box sx={{ width: SIDEBAR_W, flexShrink: 0, alignSelf: "stretch", overflowY: "auto", px: 1 }}>
            <Box sx={{ mb: 1 }}>
              <Typography>Speed</Typography>
              <Slider
                size="small"
                value={speed}
                min={1} max={25}
                valueLabelDisplay="auto"
                onChange={(_, v) => setSpeed(v)}
                disabled={disable}
              />
            </Box>

            <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1 }}>
              <Box sx={{ flex: 1 }}>
                <Typography>Weight</Typography>
                <Slider
                  size="small"
                  color="secondary"
                  value={weight}
                  min={2} max={10}
                  valueLabelDisplay="auto"
                  onChange={(_, v) => setWeight(v)}
                  disabled={disable}
                />
              </Box>
              <Tooltip title="Drag & Drop" arrow followCursor>
                <Box
                  draggable
                  onDragStart={(e) => {
                    e.dataTransfer.setData("class", "weight");
                    e.dataTransfer.setData("weight", weight);
                  }}
                  className="weight"
                  id={`weight-${weight}`}
                  sx={{ mt: 2, cursor: "grab" }}
                >
                  <FitnessCenterIcon
                    htmlColor={`rgb(${255 - weight * 20},${255 - weight * 20},${255 - weight * 20})`}
                  />
                </Box>
              </Tooltip>
            </Box>

            <Box sx={{ mb: 1 }}>
              <Typography>Maze Density</Typography>
              <Slider
                size="small"
                value={mazeDensity}
                min={1} max={10}
                valueLabelDisplay="auto"
                onChange={(_, v) => setMazeDensity(v)}
                disabled={disable}
              />
            </Box>

            <Box sx={{ mb: 2 }}>
              <Typography gutterBottom>Maze Type</Typography>
              <Select
                value={mazeType}
                onChange={(e) => setMazeType(e.target.value)}
                size="small"
                fullWidth
                disabled={disable}
              >
                <MenuItem value="random-wall">Random Wall</MenuItem>
                <MenuItem value="recursive-division">Recursive Division</MenuItem>
                <MenuItem value="recursive-backtracking">Recursive Backtracking</MenuItem>
                <MenuItem value="prims">Prim's Algorithm</MenuItem>
              </Select>
            </Box>

            <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
              <Button onClick={generateMaze} variant="contained" disableElevation disabled={disable} fullWidth>
                Generate Maze
              </Button>
              <Button onClick={generateRandomWeightMaze} variant="contained" disableElevation color="secondary" disabled={disable} fullWidth>
                Generate Weight Maze
              </Button>
              <Button onClick={clearMaze} variant="outlined" disableElevation fullWidth disabled={disable}>
                Clear Maze
              </Button>
            </Box>

            <AlgoInfo algo={algo} />

            <Guide />

            {stats && (
              <Box sx={{ mt: 2, p: 2, borderRadius: "10px", outline: "1px solid #C7C7C7" }}>
                <Typography variant="subtitle2" fontWeight={700} mb={1}>Results</Typography>
                <Typography variant="body2">
                  Nodes visited: <strong>{stats.visited}</strong>
                </Typography>
                <Typography variant="body2">
                  Path length:{" "}
                  <strong>{stats.pathLength === 0 ? "Not found" : stats.pathLength}</strong>
                </Typography>
              </Box>
            )}
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default PathFindingAlgorithms;
