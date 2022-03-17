import { MYTEAM } from "../constants";
export function storeTeam(team){
    localStorage.setItem(MYTEAM, JSON.stringify(team));
}

export function getStoredTeam(){
   return JSON.parse(localStorage.getItem(MYTEAM));
}