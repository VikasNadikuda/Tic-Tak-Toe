import Player from "./components/Player";
import GameBoard from "./components/GameBoard";
import React from "react";
import Log from "./components/Log";
import { WINNING_COMBINATIONS } from "./assets/winning_comb";
import GameOver from "./components/GameOver";
const initialBoard = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];
function getWinner(board) {
  for (combination of WINNING_COMBINATIONS) {
    let firstElement = board[combination[0].row][combination[0].column];
    let secondElement = board[combination[1].row][combination[1].column];
    let thirdElement = board[combination[2].row][combination[2].column];
    if (
      firstElement &&
      firstElement === secondElement &&
      firstElement === thirdElement
    ) {
      return firstElement;
    }
    return null;
  }
}
function getActivePlayer(turns) {
  let currentPlayer = "X";
  if (turns.length > 0 && turns[0].player == "X") {
    currentPlayer = "O";
  }
  return currentPlayer;
}
function App() {
  // const activePlayer = "X";
  // const [activePlayer, setActivePlayer] = React.useState("X");
  const [players, setPlayerName] = React.useState({
    X: "Player 1",
    O: "Player 2",
  });
  const [gameTurns, setGameTurns] = React.useState([]);
  const activePlayer = getActivePlayer(gameTurns);
  const board = [...initialBoard.map((array) => [...array])];
  if (gameTurns.length > 0) {
    for (turn of gameTurns) {
      const { square, player } = turn;
      const { row, col } = square;
      board[row][col] = player;
      //   board[turn["sqaure"]["row"]][turn["sqaure"]["col"]] = turn["player"];
    }
  }
  let winner = null;
  for (combination of WINNING_COMBINATIONS) {
    let firstElement = board[combination[0].row][combination[0].column];
    let secondElement = board[combination[1].row][combination[1].column];
    let thirdElement = board[combination[2].row][combination[2].column];
    if (
      firstElement &&
      firstElement === secondElement &&
      firstElement === thirdElement
    ) {
      winner = players[firstElement];
    }
  }
  const isDraw = gameTurns.length === 9 && !winner;
  console.log(winner, "winner");
  function changeActivePlayer(rowIndex, colIndex) {
    // setActivePlayer((player) => (player === "X" ? "O" : "X"));
    // const getActivePlayer(gameTurns);
    setGameTurns((turns) => {
      const currentPlayer = getActivePlayer(turns);
      // if (turns.length > 0 && turns[0].player == "X") {
      //   currentPlayer = "O";
      // }
      // getActivePlayer(turns);
      const updatedTurns = [
        { square: { row: rowIndex, col: colIndex }, player: currentPlayer },
        ...turns,
      ];
      return updatedTurns;
    });
  }
  function handleNameChange(symbol, name) {
    setPlayerName((prevPlayer) => {
      return {
        ...prevPlayer,
        [symbol]: name,
      };
    });
  }
  function restartMatch() {
    setGameTurns([]);
  }
  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <Player
            name="Player1"
            symbol="X"
            isActive={activePlayer === "X"}
            onNameChange={handleNameChange}
          />
          <Player
            name="Player2"
            symbol="O"
            isActive={activePlayer === "O"}
            onNameChange={handleNameChange}
          />
        </ol>
        {(winner || isDraw) && (
          <GameOver player={winner} onRematch={restartMatch} />
        )}
        <GameBoard
          onClickBox={changeActivePlayer}
          active={activePlayer}
          turns={gameTurns}
          board={board}
        />
      </div>
      <Log turns={gameTurns} />
    </main>
  );
}

export default App;
