import React, { useState } from "react";
import "../styles.css";

function GridSpot(props) {
  var row = props.row;
  var column = props.column;
  const [taken, setTaken] = useState(false);

  return (
    <div className="grid-spot">
      {/* row={row} */}
      {/* column={column} */}
    </div>
  );
}

export default GridSpot; // default export
