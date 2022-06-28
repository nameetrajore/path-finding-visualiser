import { dijkstra } from "./dijkstra";

export function bestFirst(grid, startNode, finishNode) {
  const visitedNodesInOrder = [];
  startNode.distance = 0;
  return bfs(startNode, grid.slice(), finishNode, visitedNodesInOrder);
}

function bfs(node, grid, finishNode, visitedNodesInOrder) {
  updateUnvisitedNeighborsDistance(node, grid); // updates the distances of the neighbouring unvisited nodes
  const unvisitedNeighbors = getUnvisitedNeighbors(node, grid); // fetches the neighbouring unvisited nodes in a sorted order according to the heuristics
  console.log(unvisitedNeighbors);
  sortNodesByHueristic(
    grid,
    finishNode,
    getUnvisitedNeighbors(node, grid)
  ); //sorts neighbors
  console.log(unvisitedNeighbors);
  for (let i = 0; i < unvisitedNeighbors.length; i++) {
    unvisitedNeighbors[i].previousNode = node;
    if (
      finishNode.row === unvisitedNeighbors[i].row &&
      finishNode.col === unvisitedNeighbors[i].col
    )
      return visitedNodesInOrder;
    else {
      visitedNodesInOrder.push(unvisitedNeighbors[i]);
      bfs(unvisitedNeighbors[i], grid, finishNode, visitedNodesInOrder);
    }
  }
  console.log(visitedNodesInOrder);
}

function sortNodesByHueristic(grid, finishNode, unvisitedNodes) {
  unvisitedNodes.sort(
    (nodeA, nodeB) =>
      nodeA.distance +
      weightedManhattanDistance(grid, nodeA, finishNode) -
      (nodeB.distance + weightedManhattanDistance(grid, nodeB, finishNode))
  );
}

function updateUnvisitedNeighborsDistance(node, grid) {
  const unvisitedNeighbors = getUnvisitedNeighbors(node, grid);
  for (const neighbor of unvisitedNeighbors)
    neighbor.distance = node.distance + neighbor.weight;
}

function getUnvisitedNeighbors(node, grid) {
  const neighbors = [];
  const { col, row } = node;
  if (col > 0) neighbors.push(grid[row][col - 1]);
  if (row > 0) neighbors.push(grid[row - 1][col]);
  if (row < grid.length - 1) neighbors.push(grid[row + 1][col]);
  if (col < grid[0].length - 1) neighbors.push(grid[row][col + 1]);
  return neighbors.filter((neighbor) => !neighbor.isVisited);
}

// Backtracks from the finishNode to find the shortest path.
// Only works when called *after* the dijkstra method above.
export function getNodesInShortestPathOrderBestFirst(finishNode) {
  const nodesInShortestPathOrder = [];
  let currentNode = finishNode;
  while (currentNode !== null) {
    nodesInShortestPathOrder.unshift(currentNode);
    currentNode = currentNode.previousNode;
  }
  console.log(nodesInShortestPathOrder);
  return nodesInShortestPathOrder;
}

function weightedManhattanDistance(grid, startNode, finishNode) {
  //   return dijkstra(gridCopy, { ...startNode }, { ...finishNode }).at(-1, -1).distance;
  return (
    Math.abs(startNode.row - finishNode.row) +
    Math.abs(finishNode.col - startNode.col)
  );
}
