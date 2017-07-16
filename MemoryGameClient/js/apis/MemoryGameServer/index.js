import ServerConfig from '@memory_game_config/server';

export function SubmitGameScore(player_id, score)
{
  var url = ServerConfig.ServerAddress;
  url += '?' + ServerConfig.SubmitScores;

  url = url.replace('@player_id', player_id);
  url = url.replace('@score', score);

  console.log(url);

  return fetch(url, { method: 'GET' })
  .then((response) => response.json())
  .then((responseJson) => responseJson.submission)
  .catch((err) => {
    console.log("Error at submitting the scores to the server");
    throw err;
  });
}

export function FetchHighScores()
{
  var url = ServerConfig.ServerAddress;
  url += '?' + ServerConfig.FetchHighScores;

  return fetch(url, { method: 'GET' })
  .then((response) => response.json())
  .catch((err) => {
    console.log("Error at submitting the scores to the server");
    throw err;
  });
}
