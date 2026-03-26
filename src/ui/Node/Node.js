import React from "react";
import "./Node.css";
import CircleIcon from "@mui/icons-material/Circle";
import FitnessCenterIcon from "@mui/icons-material/FitnessCenter";

const Node = React.memo((props) => {
  const {
    row,
    col,
    isStart,
    isFinish,
    disable,
    disableClear,
    setNodeWeight,
    weight,
    isWall,
    mouseDownHandler,
    mouseEnterHandler,
    mouseUpHandler,
    onDropStart,
    onDropFinish,
  } = props;

  const onDragStartHandler = (e) => {
    e.dataTransfer.setData("class", e.target.className);
    e.dataTransfer.setData("row", row);
    e.dataTransfer.setData("col", col);
  };

  const onDragEnterHandler = (e) => {
    e.preventDefault();
    e.target.classList.add("outlined");
  };

  const onDragOverHandler = (e) => {
    e.preventDefault();
  };

  const onDragLeaveHandler = (e) => {
    e.target.classList.remove("outlined");
  };

  const onDropHandler = (e) => {
    e.preventDefault();
    const className = e.dataTransfer.getData("class");
    e.target.classList.remove("outlined");
    if (isFinish) return;
    if (isStart) return;
    if (className === "start" && weight === 1 && !isWall)
      onDropStart(row, col);
    if (className === "finish" && weight === 1 && !isWall)
      onDropFinish(row, col);
    if (className === "weight")
      setNodeWeight(row, col, parseInt(e.dataTransfer.getData("weight")));
  };

  return (
    <div
      className={`node ${isWall ? "node-wall" : ""}`}
      id={`node-${row}-${col}`}
      onDragEnter={onDragEnterHandler}
      onDragOver={onDragOverHandler}
      onDragLeave={onDragLeaveHandler}
      onDrop={onDropHandler}
      onMouseDown={(e) => mouseDownHandler(e, row, col)}
      onMouseEnter={() => mouseEnterHandler(row, col)}
      onMouseUp={mouseUpHandler}
    >
      {isStart && (
        <div
          className="start"
          draggable={!disable || !disableClear}
          onDragStart={onDragStartHandler}
        >
          <CircleIcon
            color="success"
            sx={{ marginBottom: "-2px", width: "100%", marginTop: "-2px" }}
          />
        </div>
      )}
      {isFinish && (
        <div
          className="finish"
          draggable={!disable || !disableClear}
          onDragStart={onDragStartHandler}
        >
          <CircleIcon
            color="error"
            sx={{ marginBottom: "-2px", width: "100%", marginTop: "-2px" }}
          />
        </div>
      )}
      {!!(weight - 1) && (
        <div className={`weight-${weight}`}>
          <FitnessCenterIcon
            htmlColor={`rgb(${255 - weight * 20},${255 - weight * 20},${255 - weight * 20})`}
            sx={{ marginBottom: "-2px", width: "100%", marginTop: "-2px" }}
          />
        </div>
      )}
    </div>
  );
});

export default Node;
