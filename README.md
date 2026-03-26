# Path Finding Visualiser

An interactive visualiser for pathfinding algorithms and maze generation, built with React and Material UI.

**Live demo:** https://nameetrajore.github.io/path-finding-visualiser

---

## Algorithms

### Pathfinding

| Algorithm | Weighted | Shortest Path | Time Complexity |
|-----------|----------|---------------|-----------------|
| Dijkstra's | ✓ | ✓ | O((V + E) log V) |
| A\* Manhattan | ✓ | ✓ | O(E log V) |
| A\* Diagonal | ✓ | ✓ | O(E log V) |
| Breadth-First Search | ✗ | ✓ | O(V + E) |
| Depth-First Search | ✗ | ✗ | O(V + E) |

### Maze Generation

- **Random Wall** — places walls with a configurable density
- **Recursive Division** — recursively bisects chambers with a single gap per wall; always solvable
- **Recursive Backtracking** — DFS-based perfect maze carver; always solvable
- **Prim's Algorithm** — randomised Prim's maze carver; always solvable

---

## Features

- Draw walls by clicking and dragging on the grid
- Drag the start and finish nodes to reposition them
- Drop weighted nodes onto the grid and watch weighted algorithms route around them
- Animated maze generation with speed control
- Results panel showing nodes visited and path length after each run
- Algorithm info panel with complexity and guarantees for the selected algorithm
- Responsive grid — resizes with the browser window

---

## Getting Started

```bash
npm install
npm start
```

The app runs at `http://localhost:3000`.

```bash
npm run build   # production build
npm run deploy  # deploy to GitHub Pages
```

---

## Tech Stack

- **React 18** with hooks
- **Redux Toolkit** — start/finish node positions
- **Material UI v5** — components and theming
- **CSS animations** — visited node and shortest-path reveals

---

## Project Structure

```
src/
├── algorithms/
│   ├── dijkstra.js
│   ├── bfs.js
│   ├── dfs.js
│   ├── astarManhattan.js
│   ├── astarDiagonal.js
│   └── mazes/
│       ├── recursiveDivision.js
│       ├── recursiveBacktracking.js
│       └── prims.js
├── pages/
│   └── PathFindingAlgorithms.js   # grid state, animation, maze logic
├── ui/
│   ├── Node/                      # individual grid cell
│   ├── Header.js                  # algorithm selector + action buttons
│   ├── AlgoInfo.js                # per-algorithm info panel
│   └── Guide.js                   # legend
└── app/
    └── store.js                   # Redux store
```

## Performance Notes

Wall drawing is DOM-first — the grid does not re-render on every mouse move during drag. Changes are batched into a single state update on mouse release. Pathfinding and maze animations also bypass React state and write directly to the DOM for smooth frame rates.
