import React from "react";
import { Container, Row, Col, Button } from "react-bootstrap";

function Controls({
  playerOneName,
  playerOneColor,
  playerTwoName,
  playerTwoColor,
  handleRestartGame,
  handlePlayerOneNameChange,
  handlePlayerTwoNameChange,
}) {
  return (
    <Container>
      <Row>
        {/*  player one column */}

        <Col className="my-auto" sm={4}>
          <input
            type="text"
            required
            className="player-name-input"
            defaultValue={playerOneName}
            onChange={(e) => handlePlayerOneNameChange(e)}
            style={{ backgroundColor: playerOneColor }}
          ></input>
        </Col>

        {/* restart game column */}
        <Col className="my-auto" sm={4}>
          <Button
            variant="dark primary-btn"
            onClick={handleRestartGame}
            className="w-100 my-1"
            style={{ whiteSpace: "nowrap" }}
          >
            RESTART GAME
          </Button>
        </Col>

        {/* player two column */}
        <Col className="my-auto" sm={4}>
          <input
            type="text"
            required
            className="player-name-input"
            defaultValue={playerTwoName}
            onChange={(e) => handlePlayerTwoNameChange(e)}
            style={{ backgroundColor: playerTwoColor }}
          ></input>
        </Col>
      </Row>
    </Container>
  );
}

export default Controls;
