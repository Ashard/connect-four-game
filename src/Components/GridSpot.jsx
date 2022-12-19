import React, { useState } from "react";
import "../styles.css";

function GridSpot({
  row,
  column,
  onHoverCallback,
  onClickCallback,
  state = "unfilled",
}) {
  function on_hover_callback() {
    onHoverCallback(row, column);
  }

  var background_color = "blue";
  if (state === "highlight") {
    background_color = "red";
  } else if (state === "filled") {
    background_color = "green";
  }

  // function
  return (
    <div
      className="grid-spot"
      onMouseEnter={on_hover_callback}
      onClick={onClickCallback}
      style={{
        backgroundColor: background_color,
      }}
    >
      {row}
      {column}
    </div>
  );
}

export default GridSpot; // default export
