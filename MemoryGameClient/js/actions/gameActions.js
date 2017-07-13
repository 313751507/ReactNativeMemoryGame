import * as gameActionTypes from '@memory_game_action_types/gameActionTypes';
import Horizon from '@memory_game_api/HorizonClient'
import * as libBoardTile from '@memory_game_lib/boardTile';
import { MemoryGameError } from '@memory_game_lib/memoryGameError';
import BoardLibrary from '@memory_game_lib/board';
const scoreOnCardsMatch = 5;
const numTurnsPerPlayer = 2;
const maxNumOfPlayers = 2;

export function createNewGame(gameName, flickrImages, playerId)
{
  return {
    type: gameActionTypes.CREATE_NEW_GAME,
    payload: new Promise((resolve, reject) => {
      try
      {
        var board = BoardLibrary.prepareGameBoard(flickrImages);
        resolve({
          name: gameName,
          board: board,
          currentPlayer: playerId,
          players: [{
            id: playerId,
            score: 0
          }]
        });
      }
      catch (e)
      {
        reject(new MemoryGameError(
          'Error creating new game',
          'createNewGame',
          'actions/gameActions.js',
          { originalError: e }
        ));
      }
    })
  };
}

export function computeNextTurn(board, players, currentPlayerId)
{
  return {
    type: gameActionTypes.COMPUTE_NEXT_TURN,
    payload: new Promise(function(resolve, reject) {
      try
      {
        var cardsFlipped = board.reduce(function(a,b) { return a.concat(b);  })
             .filter(function(obj) { return libBoardTile.IsTileFlipped(obj); });

        var nextPlayer = currentPlayerId;

        if (cardsFlipped.length === 2)
        {
          var restOfThePlayers = players.filter(function(player){
            return player.id !== currentPlayerId;
          });

          if (restOfThePlayers.length === 1)
            nextPlayer = restOfThePlayers[0].id;
        }

        resolve(nextPlayer);
      }
      catch (e)
      {
        reject(new MemoryGameError(
          'Error computing next player turn',
          'computeNextTurn',
          'actions/gameActions.js',
          { originalError: e }
        ));
      }
    })
  };
}

export function analyzeBoardAndScores(board)
{
  return {
    type: gameActionTypes.ANALYZE_BOARD_AND_SCORES,
    payload: new Promise(function(resolve, reject) {
      try
      {
        var cardsFlipped = board.reduce(function(a,b) { return a.concat(b);  })
             .filter(function(obj) { return libBoardTile.IsTileFlipped(obj); });

        if (cardsFlipped.length === 2)
        {
          if (libBoardTile.GetTileImage(cardsFlipped[0]) === libBoardTile.GetTileImage(cardsFlipped[1]))
          {
            // Its a match score for the player
            // Cards need to be turned into played state
            resolve({
              action: 'played',
              score: scoreOnCardsMatch,
              cards: cardsFlipped
            });
          }
          else
          {
            resolve({
              action: 'blocked',
              cards: cardsFlipped
            });
          }
        }

        resolve({
          action: 'ignore'
        });
      }
      catch (e)
      {
        reject(new MemoryGameError(
          'Error analyzing board and computing scores',
          'analyzeBoardAndScores',
          'actions/gameActions.js',
          { originalError: e }
        ));
      }
    })
  };
}
