import App from '../App'
import { render, waitFor } from "@testing-library/react";
import userEvent from '@testing-library/user-event'
import React from "react";
import { competitions } from "./mocks/competition";
import { mockPlayers } from "./mocks/players";
import { mockTeams } from "./mocks/teams";
import { getDivisions, getTeams, getPlayers } from "../services/football";
import {within} from '@testing-library/dom';
import '@testing-library/jest-dom/extend-expect';
import { storeTeam } from '../services/team';
import { POSITION } from "../constants";

jest.mock("../services/football", () => ({
  getDivisions: jest.fn(),
  getTeams: jest.fn(),
  getPlayers: jest.fn()
}));

describe("App", () => {

  beforeEach(()=>{
    jest.clearAllMocks();
    storeTeam({});
    getDivisions.mockResolvedValue({ competitions });
    getTeams.mockResolvedValue({teams:mockTeams});
    getPlayers.mockResolvedValue({squad:mockPlayers});
  })
  
  
  it("should add a player from a team", async () => {
    const { findByTestId } = render(<App />);
    const teamListContainer = await findByTestId('teamList');
    const {findByText} = within(teamListContainer);
    const primeraDivisionBtn= await findByText(/Primera Division/i);
    await userEvent.click(primeraDivisionBtn);
    const athleticClubBtn= await findByText(/Athletic Club/i);
    await userEvent.click(athleticClubBtn);
    const playerSelected=await findByText(/Jokin Ezkieta/i);
    await userEvent.click(playerSelected);
    const myTeamContainer = await findByTestId('myTeam');
    await within(myTeamContainer).findByText(/Jokin Ezkieta/i);
  });

  it("should delete a player from my team", async () => {
    storeTeam({[POSITION.GOALKEEPER]:[mockPlayers[0]]})
    const { findByTestId } = render(<App />);
    const myTeamContainer = await findByTestId('myTeam');
    const player = await within(myTeamContainer).queryByText(/Jokin Ezkieta/i);
    await userEvent.click(player);
    await waitFor(()=>expect(player).not.toBeInTheDocument());
  });

  it("should delete a player from the list team", async () => {
    storeTeam({[POSITION.GOALKEEPER]:[mockPlayers[0]]})
    const { findByTestId } = render(<App />);
    const teamListContainer = await findByTestId('teamList');
    const {findByText} = within(teamListContainer);
    const primeraDivisionBtn= await findByText(/Primera Division/i);
    await userEvent.click(primeraDivisionBtn);
    const athleticClubBtn= await findByText(/Athletic Club/i);
    await userEvent.click(athleticClubBtn);
    const playerSelected=await findByText(/Jokin Ezkieta/i);
    await userEvent.click(playerSelected);
    const myTeamContainer = await findByTestId('myTeam');
    const player = within(myTeamContainer).queryByText(/Jokin Ezkieta/i);
    expect(player).toBeFalsy();
  });
});
