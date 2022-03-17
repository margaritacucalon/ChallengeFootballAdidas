import {isPlayerOnMyTeam, getTotalPlayers, deletePlayer, getNationalitiesInMyTeam} from '../helper';
import {player, myTeam} from './mocks/myTeamMock'

describe("helper",()=>{

    it('should return true when player is in my team', ()=>{
        const result= isPlayerOnMyTeam(player, myTeam);
        expect(result).toBeTruthy();
    })

    it('should return false when player not in my team', ()=>{
        const result= isPlayerOnMyTeam({...player, id:0}, myTeam);
        expect(result).toBeFalsy();
    })

    it.each([
        {team:myTeam, expected:12}, 
        {team:{}, expected:0}, 
    ])('should return the total number of players in my team',  ({team, expected})=>{
        const count= getTotalPlayers(team);
        expect(count).toBe(expected);
    })

    it('should delete the player from my team',  ()=>{
        const team=JSON.parse(JSON.stringify(myTeam));
        deletePlayer(team, 1, 'Defender')
        expect(isPlayerOnMyTeam({id:1}, team)).toBeFalsy();
    })

    it.each([
        {nationality:'Spain', expected:3},
        {nationality:'Malta', expected:0},
    ])
    ('should return the number of players of a given nationality',  ({nationality, expected})=>{
        const countNationalities=getNationalitiesInMyTeam(myTeam, nationality)
        expect(countNationalities).toBe(expected);
    })

})