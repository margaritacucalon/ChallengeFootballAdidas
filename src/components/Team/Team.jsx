
import PlayerCard from "../Card/PlayerCard";
import './Team.css';

export default function Team({ myTeam, totalPlayers, onPlayerRemove }) {

  return (
    <div data-testid='myTeam' className="myTeamContainer">
      <h1>My Team {totalPlayers}/16</h1>
      <div>
        <div className="rulesContainer">
          <h3>To create a team you need:</h3>
          <ul>
            <li>1 coach</li>
            <li>4 or more defenders</li>
            <li>4 or more midfielders</li>
            <li>2 or more attackers</li>
            <li>2 or more goalkeepers</li>
            <li>Max 16 players</li>
            <li>Max 4 players from the same national team</li>
          </ul>
        </div>
        <div>
          {Object.keys(myTeam).map((position) => {
            const players = myTeam[position];
            if (Array.isArray(players))
              return (
                <div key={position}>
                  {players.length > 0 && (
                    <h2>
                      {position}
                    </h2>
                  )}

                  <div className="player-grid">
                    {players.map((player) => {
                      return (
                        <PlayerCard
                          key={player.id}
                          player={player}
                          onPlayerSelected={() => onPlayerRemove(player)}
                          myTeamCard
                        />
                      );
                    })}
                  </div>
                </div>
              );
          })}
        </div>
      </div>
    </div>
  );
}
