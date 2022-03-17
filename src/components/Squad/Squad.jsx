import React, { useState } from "react";
import PlayerCard from "../Card/PlayerCard";
import { isPlayerOnMyTeam } from "../../helper";

export default function Squad({ players, myTeam, onPlayerSelected }) {
  const positions = players.reduce((acc, player) => {
    const position = player.position ?? "Unknown";
    if (!acc[position]) acc[position] = [];
    acc[position].push(player);
    return acc;
  }, {});

  return (
    <div>
      {Object.keys(positions).map((position) => {
        const auxPlayers = positions[position];
        return (
          <div key={position}>
            <h2>{position}</h2>
            <div className="player-grid">
              {auxPlayers.map((player) => {
                return (
                  <PlayerCard
                    key={player.id}
                    player={player}
                    isSelected={isPlayerOnMyTeam(player, myTeam)}
                    onPlayerSelected={onPlayerSelected}
                  />
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
}
