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

  var background_color = "white";
  if (state === "player1") {
    background_color = "#f5bc42";
  } else if (state === "player2") {
    background_color = "#f54542";
  }

  return (
    <div
      className="grid-spot"
      onMouseEnter={on_hover_callback}
      onClick={onClickCallback}
      style={{
        backgroundColor: background_color,
      }}
    ></div>
  );
}

export default GridSpot; // default export
