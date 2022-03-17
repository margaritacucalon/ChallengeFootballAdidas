
import PlayerCard from "../Card/PlayerCard";
import { isPlayerOnMyTeam } from "../../helper";
import './Coach.css'
import { useState } from "react";
import {MdArrowForwardIos} from "react-icons/md";

export default function Coach({ coaches, onPlayerSelected, myTeam }) {
  const [showCoaches, setShowCoaches] = useState(true);

  function setToHide(){
    setShowCoaches(showCoaches===true? false:true);
    console.log(showCoaches)
  }

  return (
    <div className="coachContainer">
      <div>
        <div className="dropBox" onClick={()=>setToHide()}>
          <h2>
            Coach
          </h2>
          <MdArrowForwardIos className="iconArrow"/>
        </div>
          
        <div className={`coach-grid ${showCoaches===true? 'active':''}`}>
          {coaches.map((coach) => {
            return (
              <PlayerCard
                key={coach.id}
                player={coach}
                isSelected={isPlayerOnMyTeam(coach, myTeam)}
                onPlayerSelected={onPlayerSelected}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}
