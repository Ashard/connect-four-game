import React from "react";
import GridSpot from "./GridSpot";
import "../styles.css";

function ConnectFourGrid() {
  var grid_spots = [];
  for (var i = 0; i < 6; i++) {
    var row = [];
    for (var j = 0; j < 7; j++) {
      row.push(
        <GridSpot
          row={i + 1}
          column={j + 1}
          onHoverCallback={on_hover_callback}
        ></GridSpot>
      );
    }
    grid_spots.push(row);
  }

  function on_hover_callback(grid_spot) {
    // alert(grid_spot);
  }

  return (
    <div className="grid-position">
      <div className="grid-container">
        {grid_spots.map((row) => {
          return row.map((grid_spot_component) => {
            return grid_spot_component;
          });
        })}
      </div>
    </div>
  );
}

export default ConnectFourGrid;
