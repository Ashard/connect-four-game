import { buildQueries } from "@testing-library/react";
import React, { useState } from "react";
import "../styles.css";

function GridSpot(props) {
  var row = props.row;
  var column = props.column;
  const [taken, setTaken] = useState(false);
  const [highlight, setHighlight] = useState(false);

  function on_hover_callback() {
    props.onHoverCallback(row, column);
  }

  // function
  return (
    <div
      className="grid-spot"
      onMouseEnter={on_hover_callback}
      style={{
        backgroundColor: highlight ? "blue" : "red",
      }}
    >
      {/* row={row} */}
      {/* column={column} */}
    </div>
  );
}

export default GridSpot; // default export
