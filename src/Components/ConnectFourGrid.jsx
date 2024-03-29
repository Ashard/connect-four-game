import React, { useState } from "react";
import GridSpot from "./GridSpot";
import Controls from "./Controls";
import Scoreboard from "./Scoreboard";
import "../styles.css";
import "bootstrap/dist/css/bootstrap.min.css";

function ConnectFourGrid() {
  const playerOneColor = "#f5bc42";
  const playerTwoColor = "#CB4C4E";

  const [playerOneName, setPlayerOneName] = useState("Player1");
  const [playerTwoName, setPlayerTwoName] = useState("Player2");
  const [currentPlayer, setCurrentPlayer] = useState("player1");
  const [winner, setWinner] = useState(null);
  const [highlightIndex, setHighlightIndex] = useState(null);
  const [gridSpotStates, setGridSpotStates] = useState(() => {
    return initGridSpotStates();
  });

  function handlePlayerOneNameChange(e) {
    setPlayerOneName(e.target.value);
  }

  function handlePlayerTwoNameChange(e) {
    setPlayerTwoName(e.target.value);
  }

  function initGridSpotStates() {
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
  function handleGridSpotHover(rowNum, colNum) {
    // find the last spot in the column to highlight
    if (winner === null) {
      let validRowCol = getValidGridSpot(rowNum, colNum);
      if (validRowCol) {
        if (validRowCol[0] !== -1) {
          setHighlightIndex([validRowCol[0], validRowCol[1]]);
        }
      }
    }
  }

  function getValidGridSpot(rowNum, colNum) {
    let validRow = -1;
    let validCol = colNum;

    if (gridSpotStates) {
      gridSpotStates.forEach((row, index) => {
        let spot = row[colNum];
        if (spot !== "none") {
          return; // when the entire column is full
        } else {
          validRow = index;
        }
      });
    }

    if (validRow === -1) return null;
    return [validRow, validCol];
  }

  /**
   * OnClick callback when user clicks on an available slot
   */
  function handleGridSpotClick(row, column) {
    if (winner === null) {
      if (playerOneName === "" || playerTwoName === "") {
        alert("Please ensure player names are not empty");
      } else {
        let validGridSpot = getValidGridSpot(row, column);
        console.log(validGridSpot);
        if (validGridSpot) {
          if (highlightIndex) validGridSpot = highlightIndex;
          if (validGridSpot[1] === column) {
            let validRow = validGridSpot[0];
            let validCol = validGridSpot[1];
            if (gridSpotStates[validRow][validCol] === "none") {
              gridSpotStates[validRow][validCol] =
                currentPlayer === "player1" ? "player1" : "player2";
              setGridSpotStates(gridSpotStates);
              setHighlightIndex(null);
              if (checkWinCondition(validRow, validCol)) {
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
    }
  }

  /**
   *
   * @param {the row index the user clicked on} rowIndex
   * @param {the column index the user clicked on} columnIndex
   * @returns true if win condition exists, false otherwise
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
    let numColumnsRight = 7 - columnNumber;
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
    let rowsRemainingDownwards = 6 - (rowIndex + 1);
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
  function handleRestartGame() {
    setWinner(null);
    setGridSpotStates(initGridSpotStates());
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
          onHoverCallback={handleGridSpotHover}
          onClickCallback={handleGridSpotClick}
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
        <Controls
          playerOneName={playerOneName}
          playerOneColor={playerOneColor}
          playerTwoName={playerTwoName}
          playerTwoColor={playerTwoColor}
          handleRestartGame={handleRestartGame}
          handlePlayerOneNameChange={handlePlayerOneNameChange}
          handlePlayerTwoNameChange={handlePlayerTwoNameChange}
        ></Controls>
      </div>
    </div>
  );
}

export default ConnectFourGrid;
