import { render } from "@testing-library/react";
import userEvent from '@testing-library/user-event'
import React from "react";
import TeamList from "../components/TeamList/TeamList";
import { competitions } from "./mocks/competition";
import { mockPlayers } from "./mocks/players";
import { mockTeams } from "./mocks/teams";
import { getDivisions, getTeams, getPlayers } from "../services/football";

jest.mock("../services/football", () => ({
  getDivisions: jest.fn(),
  getTeams: jest.fn(),
  getPlayers: jest.fn()
}));

describe("TeamList", () => {
  it("should select a player from a team", async () => {
    getDivisions.mockResolvedValue({ competitions });
    getTeams.mockResolvedValue({teams:mockTeams});
    getPlayers.mockResolvedValue({squad:mockPlayers});
    const onTeamChange=jest.fn();
  
    const { findByText } = render(<TeamList myTeam={{}} onTeamChange={onTeamChange} />);

    expect(getDivisions).toHaveBeenCalled();

    const primeraDivisionBtn= await findByText(/Primera Division/i);

    await userEvent.click(primeraDivisionBtn);
    expect(getTeams).toHaveBeenCalledWith(2014);
    const athleticClubBtn= await findByText(/Athletic Club/i);
    await userEvent.click(athleticClubBtn);
    expect(getPlayers).toHaveBeenCalledWith(77);
    const playerSelected=await findByText(/Jokin Ezkieta/i);
    await userEvent.click(playerSelected);
    expect(onTeamChange).toHaveBeenCalledWith(mockPlayers[0]);
  });
});
