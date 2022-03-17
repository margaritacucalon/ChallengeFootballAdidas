import React, { useState, useEffect, useCallback } from "react";
import {MdArrowForwardIos} from "react-icons/md";
import { TIER_ONE } from "../../constants";
import { getDivisions, getPlayers, getTeams } from "../../services/football"
import "./TeamList.css";
import Squad from "../Squad/Squad";

export default function TeamList({ myTeam, onTeamChange }) {
  const [divisions, setDivisions] = useState([]);
  const [nationalTeams, setNationalTeams] = useState([]);
  const [players, setPlayers] = useState([]);
  const [divisionId, setDivisionId] = useState('');
  const [teamId, setTeamId] = useState('');


  const fetchdivisionsHandler = useCallback(async () => {
    const { competitions } = await getDivisions();
    setDivisions(competitions.filter(({ plan }) => plan === TIER_ONE));
  }, []);

  useEffect(() => {
    fetchdivisionsHandler();
  }, [fetchdivisionsHandler]);

  async function fetchTeamsHandler(divisionId) {
    try {
      const { teams } = await getTeams(divisionId);
      setNationalTeams(teams);
      setPlayers([]);
      setDivisionId(divisionId);
    } catch (err) {
      console.log(err, "wait a couple seconds before clicing another item");
    }
  }

  async function fetchPlayersHandler(teamId) {
    try {
      const { squad } = await getPlayers(teamId);
      setPlayers(squad);
      setTeamId(teamId);
    } catch (err) {
      console.log("error: ", err.name);
    }
  }

  return (
    <div className="list" data-testid='teamList' >
      <div className="listItems">
      <ul>
        {divisions.map(({ id, name }) => {
          const divisionClass = `btnList ${id===divisionId? 'active': ''}`
          return (
            <li key={id}>
              <button
                className={divisionClass}
                onClick={() => fetchTeamsHandler(id)}
                data-testid="divisionButton"
              >
                {name} <MdArrowForwardIos className="iconArrow"/>
              </button>
            </li>
          );
        })}
      </ul>

      <ul>
        {nationalTeams.map(({ id, name, crestUrl }) => {
          const teamClass = `btnList ${id===teamId? 'active': ''}`
          return (
            <li key={id}>
              <button className={teamClass} onClick={() => fetchPlayersHandler(id)}>
                <div>
                  <img src={crestUrl} alt="TeamLogo" />
                  {name}
                </div>
                <MdArrowForwardIos className="iconArrow"/>
              </button>
            </li>
          );
        })}
      </ul>
      </div>
      

      {players.length > 0 && (
        <Squad
          players={players}
          myTeam={myTeam}
          onPlayerSelected={onTeamChange}
        />
      )}
    </div>
  );
}
