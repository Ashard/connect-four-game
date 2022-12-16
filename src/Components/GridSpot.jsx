import React, { useState } from "react";
import "../styles.css";

function GridSpot({row, column, onHoverCallback, state="unfilled"}) {
  function on_hover_callback() {
    onHoverCallback(row, column);
  }

  var background_color = "blue";
  if (state === "highlight") {
    background_color = "red";
  }

  // function
  return (
    <div
      className="grid-spot"
      onMouseEnter={on_hover_callback}
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
