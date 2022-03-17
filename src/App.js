import "./styles.css";
import React, { useState, useEffect } from "react";
import TeamList from "./components/TeamList/TeamList";
import Team from "./components/Team/Team";
import { EXTRAPLAYERS, MINPLAYERS } from "./constants";
import {
  deletePlayer,
  getNationalitiesInMyTeam,
  getTotalPlayers,
  isPlayerOnMyTeam
} from "./helper";
import { Modal } from "./components/Shared/Modal";
import { getStoredTeam, storeTeam } from "./services/team";
import Coach from "./components/Coach/Coach";

export default function App() {
  const [myTeam, setMyTeam] = useState({});
  const totalPlayers = getTotalPlayers(myTeam);
  const [extraPositions, setExtraPositions] = useState(EXTRAPLAYERS);
  const coaches = [
    { id:1, name: "Pep Guardiola", nationality: "Spain", position:'Coach' },
    { id:2, name: "Luis Enrique", nationality: "Spain", position:'Coach' },
    { id:3, name: "Jose Mourinho", nationality: "Portugal", position:'Coach' },
    { id:4, name: "Jurgen Klopp", nationality: "Germany", position:'Coach' },
    { id:5, name: "Joachim Low", nationality: "Germany", position:'Coach' },
    { id:6, name: "Zidane ", nationality: "France", position:'Coach' },
    { id:7, name: "Didier Deschamps", nationality: "France", position:'Coach' },
    { id:8, name: "Claudio Ranieri", nationality: "Italy", position:'Coach' },
    { id:9, name: "Massimiliano Allegri", nationality: "Italy", position:'Coach' },
    { id:10, name: "Gareth Southgate", nationality: "England", position:'Coach' }
  ];
  const [showModal, setShowModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    let counter = EXTRAPLAYERS;
    const team = getStoredTeam();
    setMyTeam(team ?? {});

    team &&
      Object.keys(team).forEach((position) => {
        if (team[position].length >= MINPLAYERS[position.toUpperCase()]) {
          counter -= team[position].length - MINPLAYERS[position.toUpperCase()];
        }
      });
    setExtraPositions(counter);
  }, []);

  function controlExtraPositions(myNewTeam, position, operation) {
    if (myNewTeam[position].length >= MINPLAYERS[position.toUpperCase()]) {
      setExtraPositions(
        operation === "add" ? extraPositions - 1 : extraPositions + 1
      );
    }
  }

  function handleShowMessage(message) {
    setErrorMessage(message);
    setShowModal(true);
  }

  function onTeamChange(player) {
    const myNewTeam = JSON.parse(JSON.stringify(myTeam));
    const position = player.position ?? "Unknown";
    if (!myNewTeam[position]) myNewTeam[position] = [];

    if (isPlayerOnMyTeam(player, myTeam)) {
      controlExtraPositions(myNewTeam, position, "delete");
      deletePlayer(myNewTeam, player.id, position);
      setMyTeam(myNewTeam);
      storeTeam(myNewTeam);
      return;
    }

    if(position==='Coach'){
      if( myTeam.Coach.length>0){
        handleShowMessage(
          `You already have a coach in your team`
        );
        return;
      }
      myNewTeam[position].push(player);
        setMyTeam(myNewTeam);
        storeTeam(myNewTeam);
        return;
    }
    if (getNationalitiesInMyTeam(myNewTeam, player.nationality) === 4) {
      handleShowMessage(
        `You already have 4 players from ${player.nationality}`
      );
      return;
    }

    if (
      extraPositions <= 0 &&
      myNewTeam[position].length >= MINPLAYERS[position.toUpperCase()]
    ) {
      handleShowMessage("Please make sure to complete the rest of the team");
    } else {
      controlExtraPositions(myNewTeam, position, "add");

      if (totalPlayers < 16) {
        console.log(extraPositions);

        myNewTeam[position].push(player);
        setMyTeam(myNewTeam);
        storeTeam(myNewTeam);
      } else {
        handleShowMessage("You can only have 16 players in your team");
      }
    }  
  }

  return (
    <div className="App">
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <p>{errorMessage}</p>
        </Modal>
      )}
      <Team
        myTeam={myTeam}
        totalPlayers={totalPlayers}
        onPlayerRemove={onTeamChange}
      />
      <Coach coaches={coaches} onPlayerSelected={onTeamChange} myTeam={myTeam}/>
      <TeamList myTeam={myTeam} onTeamChange={onTeamChange} data-testid='teamList' />
    </div>
  );
}
