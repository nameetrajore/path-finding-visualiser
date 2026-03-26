import React from "react";
import { Typography, Chip, Box } from "@mui/material";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";

const ALGO_INFO = {
  "Dijkstra's Algorithm": {
    label: "Dijkstra's Algorithm",
    description:
      "Explores all nodes by increasing distance from the source. Guaranteed to find the shortest path in weighted graphs.",
    time: "O((V + E) log V)",
    space: "O(V)",
    weighted: true,
    optimal: true,
    complete: true,
  },
  astar: {
    label: "A* Manhattan",
    description:
      "Uses a Manhattan-distance heuristic to guide the search. Faster than Dijkstra in practice on grid maps while still guaranteeing the shortest path.",
    time: "O(E log V)",
    space: "O(V)",
    weighted: true,
    optimal: true,
    complete: true,
  },
  "astar-diagonal": {
    label: "A* Diagonal",
    description:
      "A* with a Chebyshev heuristic that accounts for diagonal moves. Typically visits fewer nodes than Manhattan A* on open grids.",
    time: "O(E log V)",
    space: "O(V)",
    weighted: true,
    optimal: true,
    complete: true,
  },
  bfs: {
    label: "Breadth-First Search",
    description:
      "Explores nodes level-by-level from the source. Guarantees the shortest path in unweighted graphs because it reaches each node via the fewest edges.",
    time: "O(V + E)",
    space: "O(V)",
    weighted: false,
    optimal: true,
    complete: true,
  },
  dfs: {
    label: "Depth-First Search",
    description:
      "Explores as deep as possible along each branch before backtracking. Very fast but does NOT guarantee the shortest path.",
    time: "O(V + E)",
    space: "O(V)",
    weighted: false,
    optimal: false,
    complete: true,
  },
};

const Badge = ({ label, value }) => (
  <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
    {value ? (
      <CheckCircleOutlineIcon fontSize="small" color="success" />
    ) : (
      <CancelOutlinedIcon fontSize="small" color="error" />
    )}
    <Typography variant="caption">{label}</Typography>
  </Box>
);

const AlgoInfo = ({ algo }) => {
  const info = ALGO_INFO[algo];
  if (!info) return null;

  return (
    <Box sx={{ mt: 2, p: 2, borderRadius: "10px", outline: "1px solid #C7C7C7" }}>
      <Typography variant="subtitle2" fontWeight={700} mb={1}>
        {info.label}
      </Typography>
      <Typography variant="body2" mb={1.5}>
        {info.description}
      </Typography>
      <Box sx={{ display: "flex", gap: 1, mb: 1.5, flexWrap: "wrap" }}>
        <Chip label={`Time: ${info.time}`} size="small" variant="outlined" />
        <Chip label={`Space: ${info.space}`} size="small" variant="outlined" />
      </Box>
      <Box sx={{ display: "flex", gap: 1.5, flexWrap: "wrap" }}>
        <Badge label="Weighted" value={info.weighted} />
        <Badge label="Optimal" value={info.optimal} />
        <Badge label="Complete" value={info.complete} />
      </Box>
    </Box>
  );
};

export default AlgoInfo;
