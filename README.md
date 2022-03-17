# ChallengeAdidas

## API Reference

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `X-Auth-Token` | `string` | **Required**. Your API key |

## Run Locally

Clone the project

```bash
  git clone https://link-to-project
```

Go to the project directory

```bash
  cd my-project
```

Install dependencies

```bash
  npm install
```

Add the following environment variables to your .env file

`REACT_APP_API_TOKEN`

Start the server

```bash
  npm run start
```

## Running Tests

To run tests, run the following command

```bash
  npm run test
```
    
## Improvements

What improvements I could make in my code? 

Optimize the onChangeTeam function.

Add some filters, for example by nationality or for search a player.

Save my team and display it in a list with all the teams I created.

Take the statistics from a match and use that to select the best player based on their performance (Eg. number of goals)

## Problems

The API didn't gave me all the data that I needed. for example, they didn't provide the coaches, so I had to mock them in order to accomplish that part of the requirements. The logic would be that each team has a coach. That way I could have get them from the team and display it together.