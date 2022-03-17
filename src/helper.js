export function isPlayerOnMyTeam(player, team) {
  return team[player.position]?.find(({ id }) => player.id === id);
}

export function getTotalPlayers(team) {
  return Object.keys(team).reduce((acc, position) => {
    if(position==='Coach') return acc;
    return acc + team[position].length;
  }, 0);
}

export function deletePlayer(myNewTeam, playerId, position) {
  var index = myNewTeam[position].findIndex(({ id }) => {
    return id === playerId;
  });
  if (index !== -1) {
    myNewTeam[position].splice(index, 1);
  }
}

export function getNationalitiesInMyTeam(team, nationality) {
  return Object.keys(team).reduce((acc, position) => {
    return (
      acc +
      team[position].filter((player) => player.nationality === nationality)
        .length
    );
  }, 0);
}

