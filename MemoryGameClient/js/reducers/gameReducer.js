import * as gameActionTypes from '@memory_game_action_types/gameActionTypes';
import * as libBoardTile from '@memory_game_lib/boardTile';

export default function reducer(state = {
  boardState: [],
  gameCreated: false,
  creatingGame: false,
  players: [],
  currPlayer: null,
  gameName: null,
  error: null,
  playing: false,
  analyzed: true,
  cardsSelected: 0,
  nextTurnComputed: true,
  gameFinished: false
}, action) {
  switch (action.type)
  {
    case gameActionTypes.CREATE_NEW_GAME + "_PENDING": {
      return {
        ...state,
        creatingGame: true
      };
    }
    case gameActionTypes.CREATE_NEW_GAME + "_REJECTED": {
      return {...state, creatingGame: false, error: action.payload};
    }
    case gameActionTypes.CREATE_NEW_GAME + "_FULFILLED": {
      return {
        ...state,
        creatingGame: false,
        gameCreated: true,
        gameName: action.payload.name,
        boardState: action.payload.board,
        players: action.payload.players,
        currPlayer: action.payload.currentPlayer
      };
    }
    case "TURN_TILE_PENDING": {
      return {
        ...state,
        playing: true
      };
    }
    case "TURN_TILE_FULFILLED": {
      var newState = {
        ...state,
        boardState: state.boardState.slice(0),
        playing: false,
        analyzed: false
      };
      var column = action.payload.column;
      var row = action.payload.row;
      var tileData = action.payload.tileData;
      var tileToAnalyze = newState.boardState[row][column];
      if (libBoardTile.GetTileNumber(tileToAnalyze) === libBoardTile.GetTileNumber(tileData))
      {
        newState.boardState[row][column] = libBoardTile.FlipTile(tileToAnalyze);
      }
      return newState;
    }

    case "ANALYZE_BOARD_AND_SCORES_FULFILLED": {
      var payload = action.payload;
      var board = state.boardState.slice(0);
      var cards = payload.cards || null;
      var cardsSel = 0;
      var players = state.players.slice(0);

      if (payload.action.localeCompare('ignore') !== 0)
      {
        for (var i = 0; i < board.length; i++)
        {
          for (var j = 0; j < board[i].length; j++)
          {
            if (libBoardTile.GetTileNumber(board[i][j]) === libBoardTile.GetTileNumber(cards[0])
                || libBoardTile.GetTileNumber(board[i][j]) === libBoardTile.GetTileNumber(cards[1]))
                {
                  if (payload.action.localeCompare('played') === 0)
                  {
                    libBoardTile.MakeTilePlayed(board[i][j]);
                  }
                  else if (payload.action.localeCompare('blocked') === 0)
                  {
                    libBoardTile.BlockTile(board[i][j]);
                  }
                }
          }
        }

        if (payload.action.localeCompare('played') === 0)
        {
          for (var i = 0; i < players.length; i++)
          {
            if (players[i].id == state.currPlayer)
            {
              players[i].score += payload.score;
            }
          }
        }
      }
      else
      {
        cardsSel = state.cardsSelected + 1;
      }

      var cardsRemaining = board.reduce(function(a,b) { return a.concat(b);  })
           .filter(function(obj) { return libBoardTile.IsTileBlocked(obj); });

      return {
        ...state,
        boardState: board,
        analyzed: true,
        cardsSelected: cardsSel,
        nextTurnComputed: false,
        players: players,
        gameFinished: (cardsRemaining.length === 0)
      };
    }

    case gameActionTypes.COMPUTE_NEXT_TURN + "_FULFILLED":
    {
      return {
        ...state,
        nextTurnComputed: true,
        currPlayer: action.payload
      };
    }
  }

  return state;
}
