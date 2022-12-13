import React from "react";
import GridSpot from "./GridSpot";
import "../styles.css";

function ConnectFourGrid() {
  // 6 rows, 7 each
  var gridSpotRows = [];
  var gridSpotsColumns = [];

  for (var i = 1; i < 7; i++) {
    gridSpotRows.push(i);
  }

  for (var j = 1; j < 8; j++) {
    gridSpotsColumns.push(j);
  }
  return (
    <div className="grid-position">
      <div className="grid-container">
        {gridSpotRows.map((rowNumber) => {
          return gridSpotsColumns.map((columnNumber) => {
            return <GridSpot row={rowNumber} column={columnNumber}></GridSpot>;
          });
        })}
      </div>
    </div>
  );
}

export default ConnectFourGrid;
