export default function GameBoard({ onClickBox, active, turns, board }) {
  //   const [gameBoard, setGameBoard] = React.useState(initialBoard);

  //   function boxClicked(rowIndex, colIndex) {
  //     setGameBoard((board) => {
  //       const updatedBoard = [...board.map((innerArray) => [...innerArray])];
  //       updatedBoard[rowIndex][colIndex] = active;
  //       console.log(updatedBoard, active);
  //       return updatedBoard;
  //     });
  //     onClickBox();
  //   }

  return (
    <ol id="game-board">
      {board.map((row, rowIndex) => (
        <li key={rowIndex}>
          <ol>
            {row.map((symbol, colIndex) => (
              <li key={colIndex}>
                <button
                  className={symbol != undefined ? "disabledButton" : null}
                  onClick={() => onClickBox(rowIndex, colIndex)}
                  disabled={symbol !== null}
                >
                  {symbol}
                </button>
              </li>
            ))}
          </ol>
        </li>
      ))}
    </ol>
  );
}
