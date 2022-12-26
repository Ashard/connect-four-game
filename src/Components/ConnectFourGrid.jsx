import React, { useState } from "react";
import GridSpot from "./GridSpot";
import "../styles.css";

/**
 * Todo:
 * 1) checking for connect four conditions
 *    a) How to stop counting multiple win conditions.. probably store the wins and see if it has already
 *       been counted
 * 2) showing player scores
 * 3) showing which player is currently playing
 * 4)  making sure the game is refreshed/updated after the player
 * clicks on a spot instead of waiting for the mouse to move again.
 */

const horizontalWinRows = [];
const verticalWinColumns = [];
const totalNumOfColumns = 7;
const totalNumOfRows = 6;

function ConnectFourGrid() {
  const [currentPlayer, setCurrentPlayer] = useState("player1");
  const [highlight_index, setHighlightIndex] = useState(null);
  const [filled_grid_spots, setFilledGridSpots] = useState(() => {
    var init_filled_grid_spots = [];
    for (var i = 0; i < 6; i++) {
      var filled_grid_spots_row = [];
      for (var j = 0; j < 7; j++) {
        filled_grid_spots_row.push("none");
      }
      init_filled_grid_spots.push(filled_grid_spots_row);
    }

    return init_filled_grid_spots;
  });

  var grid_spots = [];

  for (var i = 0; i < 6; i++) {
    var row = [];

    for (var j = 0; j < 7; j++) {
      var state = "unfilled";
      if (highlight_index) {
        if (i === highlight_index[0] && j === highlight_index[1]) {
          state = currentPlayer;
        }
      }

      if (filled_grid_spots[i][j] !== "none") {
        var player = filled_grid_spots[i][j];
        state = player;
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
        var spot = row[column_number];
        if (spot !== "none") {
          return; // when the entire column is full
        } else {
          highlight_row = index;
        }
      });
    }

    if (highlight_row !== -1) {
      setHighlightIndex([highlight_row, highlight_column]);
    }
  }

  function on_click_callback() {
    if (highlight_index != null) {
      var row = highlight_index[0];
      var column = highlight_index[1];
      filled_grid_spots[row][column] = currentPlayer;
      setFilledGridSpots(filled_grid_spots);
      var win = checkWinCondition(row, column);
      console.log("win--->" + win);
      if (currentPlayer === "player1") setCurrentPlayer("player2");
      if (currentPlayer === "player2") setCurrentPlayer("player1");
    }
  }

  function checkWinCondition(rowIndex, columnIndex) {
    // checkHorizontalWinCondition(rowIndex, columnIndex);
    return checkVerticalWinCondition(rowIndex, columnIndex);
    // return checkHorizontalWinCondition(rowIndex, columnIndex);
  }

  function checkHorizontalWinCondition(rowIndex, columnIndex) {
    if (horizontalWinRows.includes(rowIndex)) {
      return false;
    }

    var winConditionExists = false;

    // check if we have 3 spots to the right
    // 7 columns
    var columnNumber = columnIndex + 1;
    var numColumnsRight = totalNumOfColumns - columnNumber;
    // check if we have atleast 3 spots to the right, and then check
    if (numColumnsRight >= 3) {
      var winConditionRight = true;
      var lastIndex = columnIndex + 4;
      for (var i = columnIndex + 1; i < lastIndex; i++) {
        if (filled_grid_spots[rowIndex][i] !== currentPlayer) {
          winConditionRight = false;
          break;
        }
      }

      if (winConditionRight) winConditionExists = true;
    }

    // check if we have 3 spots to the left
    if (columnNumber >= 4) {
      var lastIndex = columnIndex - 4;
      var winConditionLeft = true;
      for (var i = columnIndex - 1; i > lastIndex; i--) {
        if (filled_grid_spots[rowIndex][i] !== currentPlayer) {
          winConditionLeft = false;
          break;
        }
      }

      if (winConditionLeft) winConditionExists = true;
    }

    if (winConditionExists) {
      horizontalWinRows.push(rowIndex);
    }

    return winConditionExists;
  }

  function checkVerticalWinCondition(rowIndex, columnIndex) {
    if (verticalWinColumns.includes(columnIndex)) return false;
    // check if there are 3 more spots downwards from current highlighted index
    var verticalWinExists = false;
    var rowsRemainingDownwards = totalNumOfRows - (rowIndex + 1);
    if (rowsRemainingDownwards >= 3) {
      var downwardWinExists = true;
      var lastIndex = rowIndex + 4;
      for (var i = rowIndex; i < lastIndex; i++) {
        if (filled_grid_spots[i][columnIndex] !== currentPlayer) {
          downwardWinExists = false;
          break;
        }
      }

      if (downwardWinExists) verticalWinExists = true;
    }

    // check if there are 3 or more spots upwards frm current highlighted index
    if (rowIndex >= 3) {
      var lastIndex = rowIndex - 4;
      var upwardWinConditionExists = true;
      for (var i = rowIndex; i > lastIndex; i--) {
        if (filled_grid_spots[i][columnIndex] !== currentPlayer) {
          upwardWinConditionExists = false;
          break;
        }
      }
      if (upwardWinConditionExists) verticalWinExists = true;
    }

    if (verticalWinExists) {
      verticalWinColumns.push(columnIndex);
    }

    return verticalWinExists;
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
