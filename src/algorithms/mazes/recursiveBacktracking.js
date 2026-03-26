export function recursiveBacktracking(rows, cols, startNode, finishNode) {
  const visited = Array.from({ length: rows }, () => Array(cols).fill(false));
  const passages = [];

  const startR = startNode.row % 2 === 0 ? startNode.row : startNode.row - 1;
  const startC = startNode.col % 2 === 0 ? startNode.col : startNode.col - 1;

  dfsCarve(startR, startC, visited, passages, rows, cols);

  // If finish is at odd-row, odd-col it's between rooms and might never be carved.
  // Force-carve the cell to its left (odd-row, even-col) so finish is always reachable.
  if (finishNode.row % 2 === 1 && finishNode.col % 2 === 1 && finishNode.col - 1 >= 0) {
    passages.push({ row: finishNode.row, col: finishNode.col - 1 });
  }

  return passages;
}

function dfsCarve(r, c, visited, passages, rows, cols) {
  visited[r][c] = true;
  passages.push({ row: r, col: c });

  const dirs = shuffle([
    [0, 2],
    [0, -2],
    [2, 0],
    [-2, 0],
  ]);

  for (const [dr, dc] of dirs) {
    const nr = r + dr;
    const nc = c + dc;
    if (nr >= 0 && nr < rows && nc >= 0 && nc < cols && !visited[nr][nc]) {
      passages.push({ row: r + dr / 2, col: c + dc / 2 }); // wall between
      dfsCarve(nr, nc, visited, passages, rows, cols);
    }
  }
}

function shuffle(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}
