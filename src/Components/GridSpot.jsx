import React from "react";
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
  if (state === "player1") {
    background_color = "yellow";
  } else if (state === "player2"){
    background_color = "green";
  }
    
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
