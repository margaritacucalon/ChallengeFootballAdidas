import {getDivisions, getPlayers, getTeams} from '../services/football';

describe("football",()=>{
    const { REACT_APP_API_TOKEN } = process.env;
    const fetchConfig={"Content-Type": "application/json", "headers": {"X-Auth-Token": REACT_APP_API_TOKEN}, "method": "GET"};

    beforeAll(() => jest.spyOn(window, 'fetch'))

    beforeEach(() => {
      
      fetch.mockClear();
      window.fetch.mockResolvedValueOnce({
        json: async () => ({success: true}),
      })
    });

    it('get all divisions', async ()=>{
        const division=await getDivisions();
        expect(division).toStrictEqual({success: true})
    })

    it('get all teams', async ()=>{
        const teams=await getTeams(77);
        
        expect(fetch).toHaveBeenCalledWith("/competitions/77/teams", fetchConfig)
        expect(teams).toStrictEqual({success: true})
    })

    it('get all players', async ()=>{
        const players=await getPlayers(45)
        expect(fetch).toHaveBeenCalledWith("/teams/45", fetchConfig)
        expect(players).toStrictEqual({success: true})
    })

})