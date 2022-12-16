import React, { useState } from "react";
import GridSpot from "./GridSpot";
import "../styles.css";

function ConnectFourGrid() {
  const [highlight_index, setHighlightIndex] = useState(null);
  var grid_spots = [];

  for (var i = 0; i < 6; i++) {
    var row = [];
    for (var j = 0; j < 7; j++) {
      var state = "unfilled";
      if (highlight_index) {
        if (i === highlight_index[0] - 1 && j === highlight_index[1] - 1) {
          state = "highlight";
        } 
      }

      var key = (i, j);
      row.push(
        <GridSpot
          key={key}
          row={i + 1}
          column={j + 1}
          onHoverCallback={on_hover_callback}
          state={state}
        ></GridSpot>
      );
    }
    grid_spots.push(row);
  }
  

  function on_hover_callback(row_number, column_number) {
    // find the last spot in the column to highlight
    var reversed = grid_spots.reverse();
    reversed.forEach((row) => {
      var grid_spot = row[column_number - 1];
    });
    grid_spots.forEach((spot) => {
      // if (spot.column_number)
    });
    setHighlightIndex([row_number, column_number]);
  }

  return (
    <div className="grid-position">
      <div className="grid-container">
        {grid_spots.map((row)=> {
          return row.map((spot) => {
            return spot;
          });
        })}
      </div>
    </div>
  );
}

export default ConnectFourGrid;
