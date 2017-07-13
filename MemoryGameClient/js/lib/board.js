import * as libBoardTile from './boardTile';

const BOARD_SIZE = 4;

export default class BoardLibrary
{
  static shuffle(array)
  {
    var currentIndex = array.length, temporaryValue, randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {

      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;

      // And swap it with the current element.
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }
  }

  static prepareGameBoard(images)
  {
    var board = [
      new Array(BOARD_SIZE),
      new Array(BOARD_SIZE),
      new Array(BOARD_SIZE),
      new Array(BOARD_SIZE)
    ];

    var imageCount = 0;
    var tileNumber = 1;

    var tmpBoard = new Array(BOARD_SIZE * BOARD_SIZE);

    for (var i = 0; i < tmpBoard.length; i++)
    {
      tmpBoard[i] = libBoardTile.CreateTile(images[imageCount], tileNumber++);
      if (i % BOARD_SIZE == (BOARD_SIZE - 1))
      {
        imageCount++;
      }
    }

    BoardLibrary.shuffle(tmpBoard);

    for (var i = 0, k = 0; i < BOARD_SIZE; i++)
    {
      for (var j = 0; j < BOARD_SIZE; j++)
      {
        board[i][j] = tmpBoard[k++];
      }
    }

    return board;
  }
}
