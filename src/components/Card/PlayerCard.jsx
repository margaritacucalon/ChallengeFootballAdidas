import { TiTick } from "react-icons/ti";
import { RiDeleteBinFill } from "react-icons/ri";
import React, { useState } from "react";
import "./playerCard.css";
import { IMAGEPLAYER } from "../../constants";

export default function PlayerCard({
  player,
  onPlayerSelected,
  isSelected,
  myTeamCard
}) {
  const { id, name, position, nationality } = player;
  const selectedClass = isSelected ? "addSelected" : "add";

  return (
    <div className="playerCard" onClick={() => onPlayerSelected(player)}>
      <img src={IMAGEPLAYER} alt="Player" className="playerImg"/>
      <div>{name}</div>
      <span>{nationality}</span>

      {myTeamCard && (
        <>
          <button className="delete">
            <RiDeleteBinFill />
          </button>
        </>
      )}

      {!myTeamCard && (
        <>
          
          {player.selected}
          <button className={selectedClass}>
            <TiTick />
          </button>
        </>
      )}
    </div>
  );
}
