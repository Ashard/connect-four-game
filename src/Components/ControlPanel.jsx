import React from "react";
import { Container, Row, Col, Button } from "react-bootstrap";

function ControlPanel({
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
        <Col sm={4}>
          <Row>
            <Col className="my-auto" sm={8}>
              <input
                type="text"
                required
                className="player-name-input"
                defaultValue={playerOneName}
                onChange={(e) => handlePlayerOneNameChange(e)}
              ></input>
            </Col>
            <Col sm={4}>
              <div
                className="player-color-indicator"
                style={{ backgroundColor: playerOneColor }}
              ></div>
            </Col>
          </Row>
        </Col>

        {/* restart game column */}
        <Col className="my-auto" sm={4}>
          <Button
            variant="dark primary-btn"
            onClick={handleRestartGame}
            className="w-100"
          >
            RESTART GAME
          </Button>
        </Col>

        {/* player two column */}
        <Col sm={4}>
          <Row>
            <Col className="my-auto" sm={8}>
              <input
                type="text"
                required
                className="player-name-input"
                defaultValue={playerTwoName}
                onChange={(e) => handlePlayerTwoNameChange(e)}
              ></input>
            </Col>
            <Col sm={4} className="align-items-center">
              <div
                className="player-color-indicator mx-auto"
                style={{ backgroundColor: playerTwoColor }}
              ></div>
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  );
}

export default ControlPanel;
