const baseURL = "/";
const { REACT_APP_API_TOKEN } = process.env;

async function get(url) {
  const res = await fetch(`${baseURL}${url}`, {
    method: 'GET',
    headers: { "X-Auth-Token": REACT_APP_API_TOKEN },
    "Content-Type": "application/json",
  });
  return await res.json();
}

export async function getDivisions() {
  return await get("competitions");
}

export async function getTeams(divisionId) {
  return await get(`competitions/${divisionId}/teams`);
}

export async function getPlayers(teamId) {
  return await get(`teams/${teamId}`);
}
