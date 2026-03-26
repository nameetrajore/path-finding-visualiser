export function primsAlgorithm(rows, cols, startNode, finishNode) {
  const inMaze = Array.from({ length: rows }, () => Array(cols).fill(false));
  const passages = [];
  const frontier = [];

  const addFrontier = (r, c) => {
    if (r >= 0 && r < rows && c >= 0 && c < cols && !inMaze[r][c]) {
      frontier.push({ row: r, col: c });
    }
  };

  const sr = startNode.row % 2 === 0 ? startNode.row : startNode.row - 1;
  const sc = startNode.col % 2 === 0 ? startNode.col : startNode.col - 1;

  inMaze[sr][sc] = true;
  passages.push({ row: sr, col: sc });
  addFrontier(sr - 2, sc);
  addFrontier(sr + 2, sc);
  addFrontier(sr, sc - 2);
  addFrontier(sr, sc + 2);

  while (frontier.length) {
    const idx = Math.floor(Math.random() * frontier.length);
    const { row: r, col: c } = frontier.splice(idx, 1)[0];
    if (inMaze[r][c]) continue;

    const mazeNeighbors = [
      [r - 2, c],
      [r + 2, c],
      [r, c - 2],
      [r, c + 2],
    ].filter(
      ([nr, nc]) => nr >= 0 && nr < rows && nc >= 0 && nc < cols && inMaze[nr][nc]
    );

    if (!mazeNeighbors.length) continue;

    const [nr, nc] =
      mazeNeighbors[Math.floor(Math.random() * mazeNeighbors.length)];
    const wallR = (r + nr) / 2;
    const wallC = (c + nc) / 2;

    passages.push({ row: wallR, col: wallC });
    passages.push({ row: r, col: c });
    inMaze[r][c] = true;
    inMaze[wallR][wallC] = true;

    addFrontier(r - 2, c);
    addFrontier(r + 2, c);
    addFrontier(r, c - 2);
    addFrontier(r, c + 2);
  }

  // Same guarantee as backtracking: force-carve a neighbour if finish is at odd-odd.
  if (finishNode.row % 2 === 1 && finishNode.col % 2 === 1 && finishNode.col - 1 >= 0) {
    passages.push({ row: finishNode.row, col: finishNode.col - 1 });
  }

  return passages;
}
