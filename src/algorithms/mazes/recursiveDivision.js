export function recursiveDivision(rows, cols, startNode, finishNode) {
  const walls = [];

  // Solid border — skip start/finish cells
  for (let c = 0; c < cols; c++) {
    if (!(0 === startNode.row && c === startNode.col) && !(0 === finishNode.row && c === finishNode.col))
      walls.push({ row: 0, col: c });
    const last = rows - 1;
    if (!(last === startNode.row && c === startNode.col) && !(last === finishNode.row && c === finishNode.col))
      walls.push({ row: last, col: c });
  }
  for (let r = 1; r < rows - 1; r++) {
    if (!(r === startNode.row && 0 === startNode.col) && !(r === finishNode.row && 0 === finishNode.col))
      walls.push({ row: r, col: 0 });
    const last = cols - 1;
    if (!(r === startNode.row && last === startNode.col) && !(r === finishNode.row && last === finishNode.col))
      walls.push({ row: r, col: last });
  }

  divide(1, rows - 2, 1, cols - 2, walls, startNode, finishNode, new Set());
  return walls;
}

// `reserved` — cells that must stay open because they neighbour a parent passage.
// Without this, a sub-chamber wall placed at the same row/col as a parent passage
// column/row can wall off the only orthogonal entry to that passage.
function divide(rStart, rEnd, cStart, cEnd, walls, start, finish, reserved) {
  if (rEnd - rStart < 1 || cEnd - cStart < 1) return;

  const horizontal =
    rEnd - rStart > cEnd - cStart
      ? true
      : rEnd - rStart < cEnd - cStart
      ? false
      : Math.random() < 0.5;

  if (horizontal) {
    const wallRow = rStart + Math.floor(Math.random() * (rEnd - rStart));
    const passageCol = cStart + Math.floor(Math.random() * (cEnd - cStart + 1));

    for (let c = cStart; c <= cEnd; c++) {
      if (
        c !== passageCol &&
        !reserved.has(`${wallRow},${c}`) &&
        !(wallRow === start.row && c === start.col) &&
        !(wallRow === finish.row && c === finish.col)
      ) {
        walls.push({ row: wallRow, col: c });
      }
    }

    // Reserve the cells on both sides of the passage so sub-chambers cannot wall them.
    const next = new Set(reserved);
    next.add(`${wallRow - 1},${passageCol}`);
    next.add(`${wallRow + 1},${passageCol}`);

    divide(rStart, wallRow - 1, cStart, cEnd, walls, start, finish, next);
    divide(wallRow + 1, rEnd, cStart, cEnd, walls, start, finish, next);
  } else {
    const wallCol = cStart + Math.floor(Math.random() * (cEnd - cStart));
    const passageRow = rStart + Math.floor(Math.random() * (rEnd - rStart + 1));

    for (let r = rStart; r <= rEnd; r++) {
      if (
        r !== passageRow &&
        !reserved.has(`${r},${wallCol}`) &&
        !(r === start.row && wallCol === start.col) &&
        !(r === finish.row && wallCol === finish.col)
      ) {
        walls.push({ row: r, col: wallCol });
      }
    }

    const next = new Set(reserved);
    next.add(`${passageRow},${wallCol - 1}`);
    next.add(`${passageRow},${wallCol + 1}`);

    divide(rStart, rEnd, cStart, wallCol - 1, walls, start, finish, next);
    divide(rStart, rEnd, wallCol + 1, cEnd, walls, start, finish, next);
  }
}
