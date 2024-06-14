import React from "react";

export default function Player({
  name,
  symbol,
  isActive,
  inputChanged,
  onNameChange,
}) {
  const [isEdit, setEdit] = React.useState(true);
  const [playerName, setPlayerName] = React.useState(name);
  console.log(isActive);
  let editSave = "Edit";
  if (!isEdit) {
    editSave = "Save";
  }
  function handleEditSave() {
    setEdit((edit) => !edit);
    if (!isEdit) {
      onNameChange(symbol, playerName);
    }
  }
  function inputChanged(event) {
    setPlayerName(event.target.value);
  }
  return (
    <li className={isActive ? "active" : undefined}>
      <span className="player">
        {isEdit ? (
          <span className="player-name">{playerName}</span>
        ) : (
          <input
            type="text"
            required
            value={playerName}
            onChange={inputChanged}
          />
        )}
        <span className="player-symbol">{symbol}</span>
      </span>
      <button onClick={handleEditSave}>{editSave}</button>
    </li>
  );
}
