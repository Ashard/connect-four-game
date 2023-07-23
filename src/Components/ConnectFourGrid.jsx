import React, { useState } from "react";
import GridSpot from "./GridSpot";
import ControlPanel from "./ControlPanel";
import Scoreboard from "./Scoreboard";
import "../styles.css";
import "bootstrap/dist/css/bootstrap.min.css";

const totalNumOfColumns = 7;
const totalNumOfRows = 6;

function ConnectFourGrid() {
  const playerOneColor = "#f5bc42";
  const playerTwoColor = "#CB4C4E";

  const [playerOneName, setPlayerOneName] = useState("Player1");
  const [playerTwoName, setPlayerTwoName] = useState("Player2");
  const [currentPlayer, setCurrentPlayer] = useState("player1");
  const [winner, setWinner] = useState(null);
  const [highlightIndex, setHighlightIndex] = useState(null);
  const [gridSpotStates, setGridSpotStates] = useState(() => {
    return initFilledGridSpots();
  });

  function handlePlayerOneNameChange(e) {
    setPlayerOneName(e.target.value);
  }

  function handlePlayerTwoNameChange(e) {
    setPlayerTwoName(e.target.value);
  }

  function initFilledGridSpots() {
    const grid = [];
    for (let i = 0; i < 6; i++) {
      grid.push(Array(7).fill("none"));
    }

    return grid;
  }

  /**
   *
   * @param {row index user is currently hovering} row_number
   * @param {column index user is currently hovering} column_number
   */
  function onHoverCallback(rowNum, colNum) {
    // find the last spot in the column to highlight
    if (winner === null) {
      let highlightRow = -1;
      let highlightColumn = colNum;

      if (gridSpotStates) {
        gridSpotStates.forEach((row, index) => {
          let spot = row[colNum];
          if (spot !== "none") {
            return; // when the entire column is full
          } else {
            highlightRow = index;
          }
        });
      }
      if (highlightRow !== -1) {
        setHighlightIndex([highlightRow, highlightColumn]);
      }
    }
  }

  /**
   * OnClick callback when user clicks on an available slot
   */
  function onClickCallback() {
    if (highlightIndex != null) {
      if (playerOneName === "" || playerTwoName === "") {
        alert("Please ensure player names are not empty");
      } else {
        var row = highlightIndex[0];
        var column = highlightIndex[1];
        if (gridSpotStates[row][column] === "none") {
          gridSpotStates[row][column] =
            currentPlayer === "player1" ? "player1" : "player2";
          setGridSpotStates(gridSpotStates);
          setHighlightIndex(null);
          if (checkWinCondition(row, column)) {
            setWinner(
              currentPlayer === "player1" ? playerOneName : playerTwoName
            );
          } else {
            if (currentPlayer === "player2") {
              setCurrentPlayer("player1");
            }
            if (currentPlayer === "player1") {
              setCurrentPlayer("player2");
            }
          }
        }
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
    let winConditionExists = false;

    // check if we have 3 spots to the right
    // 7 columns
    let columnNumber = columnIndex + 1;
    let numColumnsRight = totalNumOfColumns - columnNumber;
    // check if we have atleast 3 spots to the right, and then check
    if (numColumnsRight >= 3) {
      let winConditionRight = true;
      let lastIndex = columnIndex + 4;
      for (let i = columnIndex + 1; i < lastIndex; i++) {
        if (gridSpotStates[rowIndex][i] !== currentPlayer) {
          winConditionRight = false;
          break;
        }
      }

      if (winConditionRight) winConditionExists = true;
    }

    // check if we have 3 spots to the left
    if (columnNumber >= 4) {
      let lastIndex = columnIndex - 4;
      let winConditionLeft = true;
      for (let i = columnIndex - 1; i > lastIndex; i--) {
        if (gridSpotStates[rowIndex][i] !== currentPlayer) {
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
    let verticalWinExists = false;
    let rowsRemainingDownwards = totalNumOfRows - (rowIndex + 1);
    if (rowsRemainingDownwards >= 3) {
      let downwardWinExists = true;
      let lastIndex = rowIndex + 4;
      for (let i = rowIndex; i < lastIndex; i++) {
        if (gridSpotStates[i][columnIndex] !== currentPlayer) {
          downwardWinExists = false;
          break;
        }
      }

      if (downwardWinExists) verticalWinExists = true;
    }

    // check if there are 3 or more spots upwards from current highlighted index
    if (rowIndex >= 3) {
      let lastIndex = rowIndex - 4;
      let upwardWinConditionExists = true;
      for (let i = rowIndex; i > lastIndex; i--) {
        if (gridSpotStates[i][columnIndex] !== currentPlayer) {
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
    let currentRowIndex = rowIndex;
    let currentColumnIndex = columnIndex;
    while (currentRowIndex > 0 && currentColumnIndex > 0) {
      currentRowIndex -= 1;
      currentColumnIndex -= 1;
    }

    let winExists = false;

    let indicesWithCurrentPlayer = [];
    while (currentRowIndex <= 5 && currentColumnIndex <= 6) {
      if (
        gridSpotStates[currentRowIndex][currentColumnIndex] === currentPlayer
      ) {
        indicesWithCurrentPlayer.push(currentRowIndex);
      }
      currentRowIndex += 1;
      currentColumnIndex += 1;
    }

    if (indicesWithCurrentPlayer.length < 4) return false;

    let i = 0;
    let consecutiveCount = 0;

    while (i < indicesWithCurrentPlayer.length - 1 && consecutiveCount < 3) {
      let diff = Math.abs(
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
    let currentRowIndex = rowIndex;
    let currentColumnIndex = columnIndex;
    while (currentRowIndex > 0 && currentColumnIndex < 7) {
      currentRowIndex -= 1;
      currentColumnIndex += 1;
    }

    let winExists = false;

    let indicesWithCurrentPlayer = [];
    while (currentRowIndex <= 5 && currentColumnIndex >= 0) {
      if (
        gridSpotStates[currentRowIndex][currentColumnIndex] === currentPlayer
      ) {
        indicesWithCurrentPlayer.push(currentRowIndex);
      }
      currentRowIndex += 1;
      currentColumnIndex -= 1;
    }

    if (indicesWithCurrentPlayer.length < 4) return false;

    let i = 0;
    let consecutiveCount = 0;
    while (i < indicesWithCurrentPlayer.length - 1 && consecutiveCount < 3) {
      let diff = Math.abs(
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
   * Restart game callback
   */
  function restartGame() {
    setWinner(null);
    setGridSpotStates(initFilledGridSpots());
    setHighlightIndex(null);
    setCurrentPlayer("player1");
  }

  // creating GridSpot components with their states
  let gridSpots = [];
  for (let i = 0; i < 6; i++) {
    let row = [];

    for (let j = 0; j < 7; j++) {
      let key = i.toString() + j.toString();
      let gridSpotBgColor = "#6735fc";

      if (
        highlightIndex &&
        highlightIndex[0] === i &&
        highlightIndex[1] === j
      ) {
        gridSpotBgColor =
          currentPlayer === "player1" ? playerOneColor : playerTwoColor;
      } else {
        let currentGridSpotState = gridSpotStates[i][j];
        if (currentGridSpotState === "player1") {
          gridSpotBgColor = playerOneColor;
        } else if (currentGridSpotState === "player2") {
          gridSpotBgColor = playerTwoColor;
        }
      }

      row.push(
        <GridSpot
          key={key}
          row={i}
          column={j}
          onHoverCallback={onHoverCallback}
          onClickCallback={onClickCallback}
          backgroundColor={gridSpotBgColor}
        ></GridSpot>
      );
    }

    gridSpots.push(row);
  }

  return (
    <div className="page-column">
      <Scoreboard
        currentPlayer={
          currentPlayer === "player1" ? playerOneName : playerTwoName
        }
        winner={winner ? winner : null}
      ></Scoreboard>
      <div className="grid-position">
        <div className="grid-container">
          {gridSpots.map((row) => {
            return row.map((spot) => {
              return spot;
            });
          })}
        </div>
      </div>
      <div className="mt-3">
        <ControlPanel
          playerOneName={playerOneName}
          playerOneColor={playerOneColor}
          playerTwoName={playerTwoName}
          playerTwoColor={playerTwoColor}
          handleRestartGame={restartGame}
          handlePlayerOneNameChange={handlePlayerOneNameChange}
          handlePlayerTwoNameChange={handlePlayerTwoNameChange}
        ></ControlPanel>
      </div>
    </div>
  );
}

export default ConnectFourGrid;
