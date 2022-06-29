export function bestFirst(grid, startNode, finishNode){
    startNode.distance = 0;
    //console.log(grid);
    const visitedNodesInOrder = [];
    const openSet = [];
    const closedSet = [];
    openSet.push(startNode);

    while(openSet.length>0){
        openSet.sort((nodeA, nodeB)=>nodeA.f - nodeB.f); // sorts the set according to the distance
      //  console.log({...openSet});
        const current = openSet.shift();
        // console.log(current);
        if(current.row === finishNode.row && current.col === finishNode.col)
        return visitedNodesInOrder;

        visitedNodesInOrder.push(current);
        // removes current from open set
        
        closedSet.push(current);
        const neighbors = getNeighbors(current,grid);
        // console.log(neighbors);
        for(const neighbor of neighbors){
            if(closedSet.includes(neighbor) || neighbor.isWall)
            continue;

            let tempDist = current.distance +  neighbor.weight;
           // console.log(tempDist);
            if(!openSet.includes(neighbor))
            openSet.push(neighbor);
            else if(tempDist>neighbor.distance)
            continue;
            
            neighbor.previousNode = current;
            neighbor.distance = tempDist;
            neighbor.f = heuristic(neighbor, finishNode, grid);
        }

    }
    return visitedNodesInOrder
}

function getNeighbors(current, grid){
    const neighbors = [];
  const { col, row } = current;
  if (col > 0) neighbors.push(grid[row][col - 1]);
  if (row > 0) neighbors.push(grid[row - 1][col]);
  if (row < grid.length - 1) neighbors.push(grid[row + 1][col]);
  if (col < grid[0].length - 1) neighbors.push(grid[row][col + 1]);
 // console.log(neighbors);
  return neighbors;
}

function heuristic( nodeA, nodeB, grid){
    let h = 0;
  if (nodeB.row > nodeA.row) {
    if (nodeA.col < nodeB.col) {
      for (let i = nodeA.row ; i <= nodeB.row; i++) {
        for (let j = nodeA.col ; j <= nodeB.col; j++) {
          h = h + grid[i][j].weight;
        }
      }
    }
    if (nodeA.col >= nodeB.col) {
        for (let i = nodeA.row ; i <= nodeB.row; i++) {
          for (let j = nodeB.col ; j <= nodeA.col; j++) {
            h = h + grid[i][j].weight;
          }
        }
      }
  }
  else if (nodeB.row <= nodeA.row) {
    if (nodeA.col < nodeB.col) {
      for (let i = nodeB.row; i <= nodeA.row; i++) {
        for (let j = nodeA.col; j <= nodeB.col; j++) {
          h = h + grid[i][j].weight;
        }
      }
    }
    if (nodeA.col >= nodeB.col) {
        for (let i = nodeB.row ; i <= nodeA.row; i++) {
          for (let j = nodeB.col ; j <= nodeA.col; j++) {
            h = h + grid[i][j].weight;
          }
        }
      }
  }
  return h;
   // return( Math.abs(nodeA.row - nodeB.row) + Math.abs(nodeA.col - nodeB.col));
}

export function getNodesInShortestPathOrderBestFirst(finishNode){
    const nodesInShortestPathOrder = [];
    let currentNode = finishNode;
    while (currentNode !== null) {
      nodesInShortestPathOrder.unshift(currentNode);
      currentNode = currentNode.previousNode;
    }
    return nodesInShortestPathOrder;
}
