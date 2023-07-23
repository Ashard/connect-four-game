import React from "react";

function Scoreboard({ currentPlayer, winner }) {
  let text = winner ? winner + " wins!!" : currentPlayer + "'s turn";
  return <h2 className="scoreboard-text">{text}</h2>;
}

export default Scoreboard;
