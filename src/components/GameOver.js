export default function GameOver({ player, onRematch }) {
  return (
    <div id="game-over">
      <h2>Game Over!</h2>
      {player && <p>{player} won!</p>}
      {!player && <p>Match is drawn</p>}
      <button onClick={onRematch}> Rematch</button>
    </div>
  );
}
