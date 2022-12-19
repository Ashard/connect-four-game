import React, { useState } from "react";
import GridSpot from "./GridSpot";
import "../styles.css";

function ConnectFourGrid() {
  const [highlight_index, setHighlightIndex] = useState(null);
  const [filled_grid_spots, setFilledGridSpots] = useState(null);

  if (filled_grid_spots == null) {
    var init_filled_grid_spots = [];
    for (var i = 0; i < 6; i++) {
      var filled_grid_spots_row = [];
      for (var j = 0; j < 7; j++) {
        filled_grid_spots_row.push(false);
      }
      init_filled_grid_spots.push(filled_grid_spots_row);
    }
    setFilledGridSpots(init_filled_grid_spots);
  }

  var grid_spots = [];

  for (var i = 0; i < 6; i++) {
    var row = [];

    for (var j = 0; j < 7; j++) {
      var state = "unfilled";
      if (highlight_index) {
        if (i === highlight_index[0] && j === highlight_index[1]) {
          state = "highlight";
        }
      }

      if (filled_grid_spots) {
        if (filled_grid_spots[i][j] === true) {
          state = "filled";
        }
      }

      var key = (i, j);
      row.push(
        <GridSpot
          key={key}
          row={i}
          column={j}
          onHoverCallback={on_hover_callback}
          onClickCallback={on_click_callback}
          state={state}
        ></GridSpot>
      );
    }

    grid_spots.push(row);
  }

  function on_hover_callback(row_number, column_number) {
    // find the last spot in the column to highlight
    var highlight_row = -1;
    var highlight_column = column_number;
    if (filled_grid_spots) {
      filled_grid_spots.forEach((row, index) => {
        var filled = row[column_number];
        if (filled) {
          return; // when the entire column is full
        } else if (!filled) {
          highlight_row = index;
        }
      });
    }

    if (highlight_row != -1) {
      setHighlightIndex([highlight_row, highlight_column]);
    }
  }

  function on_click_callback() {
    if (highlight_index != null) {
      var row = highlight_index[0];
      var column = highlight_index[1];
      filled_grid_spots[row][column] = true;
      setFilledGridSpots(filled_grid_spots);
    }
  }

  return (
    <div className="grid-position">
      <div className="grid-container">
        {grid_spots.map((row) => {
          return row.map((spot) => {
            return spot;
          });
        })}
      </div>
    </div>
  );
}

export default ConnectFourGrid;
