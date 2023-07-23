import React from "react";
import "../styles.css";

function GridSpot({
  row,
  column,
  onHoverCallback,
  onClickCallback,
  backgroundColor,
}) {
  function handleOnHoverCB() {
    onHoverCallback(row, column);
  }

  return (
    <div
      className="grid-spot"
      onMouseEnter={() => handleOnHoverCB()}
      onClick={onClickCallback}
      style={{
        backgroundColor: backgroundColor,
      }}
    ></div>
  );
}

export default GridSpot;
