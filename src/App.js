import "./styles.css";
import React, { useState, useEffect } from "react";
import TeamList from "./components/TeamList/TeamList";
import Team from "./components/Team";
import { EXTRAPLAYERS, MINPLAYERS, MYTEAM, POSITION } from "./constants";
import {
  deletePlayer,
  getNationalitiesInMyTeam,
  getTotalPlayers,
  isPlayerOnMyTeam
} from "./helper";
import { Modal } from "./components/Shared/Modal";
import { getStoredTeam, storeTeam } from "./services/team";

export default function App() {
  const [myTeam, setMyTeam] = useState({});
  const totalPlayers = getTotalPlayers(myTeam);
  const [extraPositions, setExtraPositions] = useState(EXTRAPLAYERS);
  const coaches = [
    { name: "Pepe Guardiola", nationality: "Spain" },
    { name: "Hans Topo", nationality: "Germany" }
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
      <TeamList myTeam={myTeam} onTeamChange={onTeamChange} data-testid='teamList' />
    </div>
  );
}
