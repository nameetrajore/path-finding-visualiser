export function astarManhattan(grid, startNode, finishNode){
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
            neighbor.f = neighbor.distance + heuristic(neighbor, finishNode, grid);
        
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
    return( Math.abs(nodeA.row - nodeB.row) + Math.abs(nodeA.col - nodeB.col));
}

export function getNodesInShortestPathOrderAStarManhattan(finishNode){
    const nodesInShortestPathOrder = [];
    let dist = 0;
    let currentNode = finishNode;
    while (currentNode !== null) {
      nodesInShortestPathOrder.unshift(currentNode);
      dist = dist + currentNode.weight;
      currentNode = currentNode.previousNode;
    }
    console.log(dist);
    return nodesInShortestPathOrder;
}