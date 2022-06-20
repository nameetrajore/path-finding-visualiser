import { React, useState } from "react";
import style from "./Node.css";
import CircleIcon from "@mui/icons-material/Circle";
import { useDispatch, useSelector } from "react-redux";
import { pathActions } from "../../app/store";

const Node = (props) => {
  const start = useSelector((state) => state.start);
  const finish = useSelector((state) => state.finish);

  const {
    row,
    col,
    isWeighted,
    distance,
    disable,
    disableClear,
    onMouseDown,
    onMouseEnter,
    visualiseWithoutAnimation,
    onMouseUp,
    isWall,
    mouseDownHandler,
    mouseEnterHandler,
    mouseUpHandler,
  } = props;

  const dispatch = useDispatch();

  const onDragStartHandler = (e) => {
    // console.log(e.target);
    e.dataTransfer.setData("class", e.target.className);
    e.dataTransfer.setData("row", row);
    e.dataTransfer.setData("col", col);
  };

  const onDragEnterHandler = (e) => {
    e.preventDefault();
    e.target.classList.add("outlined"); // to add the hover effect
    // if(disableClear)
    //visualiseWithoutAnimation(row,col);
    // future development
  };

  const onDragOverHandler = (e) => {
    // console.log({ row, col });
    // const sourceRow = e.dataTransfer.getData("row");
    // const sourceCol = e.dataTransfer.getData("col");
    // const className = e.dataTransfer.getData("class");

    // if (className === "start" || className === "finish")
    //   if (
    //     (sourceRow !== start.row && sourceCol !== start.col) ||
    //     (sourceRow !== finish.row && sourceCol !== finish.col)
    //   )
    e.preventDefault();
  };

  const onDragLeaveHandler = (e) => {
    e.target.classList.remove("outlined"); // to add the hover effect
  };

  const onDropHandler = (e) => {
    e.preventDefault();
    const className = e.dataTransfer.getData("class");
    const sourceRow = e.dataTransfer.getData("row");
    const sourceCol = e.dataTransfer.getData("col");
    console.log({ sourceRow, sourceCol });
    console.log({ row, col });
    // console.log(className);
    e.target.classList.remove("outlined");
    if (row === finish.row && col === finish.col) return;
    if (row === start.row && col === start.col) return;
    if (className === "start") dispatch(pathActions.setStart({ row, col }));
    if (className === "finish") dispatch(pathActions.setFinish({ row, col }));
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
      {start.col === col && start.row === row && (
        <div
          className="start"
          draggable={!disable || !disableClear}
          onDragStart={onDragStartHandler}
        >
          <CircleIcon
            color="success"
            sx={{ marginBottom: "1px", width: "1.4vmax" }}
          />
        </div>
      )}
      {finish.col === col && finish.row === row && (
        <div
          className="finish"
          draggable={!disable || !disableClear}
          onDragStart={onDragStartHandler}
        >
          <CircleIcon
            color="secondary"
            sx={{ marginBottom: "1px", width: "1.4vmax" }}
          />
        </div>
      )}
    </div>
  );
};

export default Node;
