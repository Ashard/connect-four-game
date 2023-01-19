import React, { useState } from "react";
import GridSpot from "./GridSpot";
import "../styles.css";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

/**
 * Todo:
 * 1) add the consecutiveCount variable to the other diagonal function as well
 * 2) showing which player is currently playing by showing the player
 * color before the player score
 *
 */
const totalNumOfColumns = 7;
const totalNumOfRows = 6;

function ConnectFourGrid() {
  const [showWinDialog, setShowWinDialog] = useState(true);
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

  /**
   *
   * @param {row index user is currently hovering} row_number
   * @param {column index user is currently hovering} column_number
   */
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

  /**
   * OnClick callback when user clicks on an available slot
   */
  function on_click_callback() {
    if (highlight_index != null) {
      var row = highlight_index[0];
      var column = highlight_index[1];
      filled_grid_spots[row][column] = currentPlayer;
      setFilledGridSpots(filled_grid_spots);
      if (checkWinCondition(row, column)) {
        // show who won and bring up the dialog to play again
        console.log(currentPlayer + "WON");
      } else {
        console.log("win condition not met for " + currentPlayer);
      }
      if (currentPlayer === "player1") {
        setCurrentPlayer("player2");
      }
      if (currentPlayer === "player2") {
        setCurrentPlayer("player1");
      }
    }
  }

  /**
   *
   * @param {the row index the user clicked on} rowIndex
   * @param {the column index the user clicked on} columnIndex
   * @returns the number of points the current player gets
   */
  function checkWinCondition(rowIndex, columnIndex) {
    if (checkHorizontalWinCondition(rowIndex, columnIndex)) {
      return true;
    }
    if (checkVerticalWinCondition(rowIndex, columnIndex)) {
      return true;
    }
    if (checkNorthWestToSouthEastDiagonalWins(rowIndex, columnIndex)) {
      return true;
    }
    if (checkNorthEastToSouthWestDiagonalWins(rowIndex, columnIndex)) {
      return true;
    }
    return false;
  }

  /**
   *
   * @param {the row index the user clicked on} rowIndex
   * @param {the column index the user clicked on} columnIndex
   * @returns true if there is a win condition in the horizontal direction
   */
  function checkHorizontalWinCondition(rowIndex, columnIndex) {
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

    return winConditionExists;
  }

  /**
   *
   * @param {the row index the user clicked on} rowIndex
   * @param {the column index the user clicked on} columnIndex
   * @returns true if there is a win condtion in the vertical direction
   */
  function checkVerticalWinCondition(rowIndex, columnIndex) {
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

    // check if there are 3 or more spots upwards from current highlighted index
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

    return verticalWinExists;
  }

  /**
   *
   * @param {the row index the user clicked on} rowIndex
   * @param {the column index the user clicked on} columnIndex
   * @returns true if there is a win condition from North West to South East direction
   */
  function checkNorthWestToSouthEastDiagonalWins(rowIndex, columnIndex) {
    var currentRowIndex = rowIndex;
    var currentColumnIndex = columnIndex;
    while (currentRowIndex > 0 && currentColumnIndex > 0) {
      currentRowIndex -= 1;
      currentColumnIndex -= 1;
    }

    var winExists = false;

    var indicesWithCurrentPlayer = [];
    while (currentRowIndex <= 5 && currentColumnIndex <= 6) {
      if (
        filled_grid_spots[currentRowIndex][currentColumnIndex] === currentPlayer
      ) {
        indicesWithCurrentPlayer.push(currentRowIndex);
      }
      currentRowIndex += 1;
      currentColumnIndex += 1;
    }

    if (indicesWithCurrentPlayer.length < 4) return false;

    var i = 0;
    var consecutiveCount = 0;

    while (i < indicesWithCurrentPlayer.length - 1 && consecutiveCount < 3) {
      var diff = Math.abs(
        indicesWithCurrentPlayer[i] - indicesWithCurrentPlayer[i + 1]
      );

      if (diff === 1) {
        consecutiveCount += 1;
      } else {
        consecutiveCount = 0;
      }

      i++;
    }

    if (consecutiveCount >= 3) {
      winExists = true;
    }

    return winExists;
  }

  /**
   *
   * @param {the row index the user clicked on} rowIndex
   * @param {the column index the user clicked on} columnIndex
   * @returns true if there is a win condition in the North East To South West diagonal
   */
  function checkNorthEastToSouthWestDiagonalWins(rowIndex, columnIndex) {
    var currentRowIndex = rowIndex;
    var currentColumnIndex = columnIndex;
    while (currentRowIndex > 0 && currentColumnIndex < 7) {
      currentRowIndex -= 1;
      currentColumnIndex += 1;
    }

    var winExists = false;

    var indicesWithCurrentPlayer = [];
    while (currentRowIndex <= 5 && currentColumnIndex >= 0) {
      if (
        filled_grid_spots[currentRowIndex][currentColumnIndex] === currentPlayer
      ) {
        indicesWithCurrentPlayer.push(currentRowIndex);
      }
      currentRowIndex += 1;
      currentColumnIndex -= 1;
    }

    if (indicesWithCurrentPlayer.length < 4) return false;

    var i = 0;
    var consecutiveCount = 0;
    while (i < indicesWithCurrentPlayer.length - 1 && consecutiveCount < 3) {
      var diff = Math.abs(
        indicesWithCurrentPlayer[i] - indicesWithCurrentPlayer[i + 1]
      );

      if (diff === 1) {
        consecutiveCount += 1;
      } else {
        consecutiveCount = 0;
      }

      i++;
    }

    if (consecutiveCount >= 3) {
      winExists = true;
    }

    return winExists;
  }

  /**
   * Handle close of the win dialog
   */
  function handleClose() {
    setShowWinDialog(false);
  }

  return (
    <div>
      <Modal show={showWinDialog} onHide={handleClose}>
        <div className="winDialogHeadingText">{currentPlayer} wins!</div>
        <Modal.Body>
          <div className="playAgainBtnFlexBox">
            <Button className="playAgainBtn">Play again</Button>
          </div>
        </Modal.Body>
      </Modal>

      <div className="scoreboard">
        <div className="playerColorFlex">
          player 1:
          <div className="playerOneColor"></div>
        </div>

        <div className="playerColorFlex">
          player 2:
          <div className="playerTwoColor"></div>
        </div>
      </div>

      <div className="grid-position">
        <div className="grid-container">
          {grid_spots.map((row) => {
            return row.map((spot) => {
              return spot;
            });
          })}
        </div>
      </div>
    </div>
  );
}

export default ConnectFourGrid;
