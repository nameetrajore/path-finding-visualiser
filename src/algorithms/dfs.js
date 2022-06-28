export function dfs(grid, startNode, finishNode) {
  let visitedAllNodesInOrder = [];
  visitedAllNodesInOrder = dft(startNode, grid, visitedAllNodesInOrder);

  let visitedTillFinishNodesInOrder = [];
  for (let i = 0; i < visitedAllNodesInOrder.length; i++) {
    visitedTillFinishNodesInOrder.push(visitedAllNodesInOrder[i]);
    if (
      visitedAllNodesInOrder[i].row === finishNode.row &&
      visitedAllNodesInOrder[i].col === finishNode.col
    )
      break;
  }

  return visitedTillFinishNodesInOrder;
}

function dft(node, grid, visitedNodesInOrder) {
  visitedNodesInOrder.push(node);
  node.isVisited = true;

  if (
    node.col < grid[0].length - 1 &&
    !grid[node.row][node.col + 1].isVisited &&
    !grid[node.row][node.col + 1].isWall
  ) {
    dft(grid[node.row][node.col + 1], grid, visitedNodesInOrder);
    grid[node.row][node.col + 1].previousNode = node;
  }
  if (
    node.row < grid.length - 1 &&
    !grid[node.row + 1][node.col].isVisited &&
    !grid[node.row + 1][node.col].isWall
  ) {
    dft(grid[node.row + 1][node.col], grid, visitedNodesInOrder);
    grid[node.row + 1][node.col].previousNode = node;
  }
  if (
    node.col > 0 &&
    !grid[node.row][node.col - 1].isVisited &&
    !grid[node.row][node.col - 1].isWall
  ) {
    dft(grid[node.row][node.col - 1], grid, visitedNodesInOrder);
    grid[node.row][node.col - 1].previousNode = node;
  }
  if (
    node.row > 0 &&
    !grid[node.row - 1][node.col].isVisited &&
    !grid[node.row - 1][node.col].isWall
  ) {
    dft(grid[node.row - 1][node.col], grid, visitedNodesInOrder);
    grid[node.row - 1][node.col].previousNode = node;
  }
  return visitedNodesInOrder;
}

export function getNodesInShortestPathOrderDfs(finishNode){
  const nodesInShortestPathOrder = [];
  let currentNode = finishNode;
  while (currentNode !== null) {
    nodesInShortestPathOrder.unshift(currentNode);
    currentNode = currentNode.previousNode;
  }
  return nodesInShortestPathOrder;
}
