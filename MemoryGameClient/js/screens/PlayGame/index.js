import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Text, Button, StyleSheet } from 'react-native';
import BoardCell from '@memory_game_components/BoardCell';
import * as playGameActions from './actions';
import * as gameActions from '@memory_game_actions/gameActions';
var timer = require('react-native-timer');

var {width, height} = require('Dimensions').get('window');

var CELL_SIZE = Math.floor(width * .25); // 25% of the screen width
var CELL_PADDING = Math.floor(CELL_SIZE * .05); // 5% of the cell size
var BORDER_RADIUS = CELL_PADDING * 2;
var TILE_SIZE = CELL_SIZE - CELL_PADDING * 2;

@connect((store) => {
  return {
    gameBoard: store.game.boardState,
    gamePlayers: store.game.players,
    currentGamePlayer: store.game.currPlayer,
    gameName: store.game.gameName,
    playing: store.game.playing,
    boardAnalyzed: store.game.analyzed,
    cardsSelected: store.game.cardsSelected,
    nextTurnComputed: store.game.nextTurnComputed,
    gameFinished: store.game.gameFinished
  };
})
export default class PlayGame extends Component
{
  static navigationOptions = ({ navigation }) => ({
    title: `${navigation.state.params.game_name}`,
  });

  constructor(props)
  {
    super(props);
    console.log("Tile Size: " + TILE_SIZE);
    this.getPlayerNames = this.getPlayerNames.bind(this);
  }

  componentWillUnmount()
  {
    timer.clearTimeout(this);
  }

  boardClickHandler(column, row, tileData)
  {
    if (this.props.navigation.state.params.player_id === this.props.currentGamePlayer)
    {
      if (this.props.boardAnalyzed && this.props.nextTurnComputed)
        this.props.dispatch(playGameActions.turnTile(column, row, tileData));
    }
  }

  componentWillReceiveProps(nextProps)
  {
    if (this.props.playing !== nextProps.playing && nextProps.playing === false)
    {
      if (nextProps.cardsSelected !== 0)
      {
        timer.setTimeout(
          this, 'analyzeBoard', () => {
            this.props.dispatch(gameActions.analyzeBoardAndScores(nextProps.gameBoard));
          }, 1000
        );
      }
      else
      {
        this.props.dispatch(gameActions.analyzeBoardAndScores(nextProps.gameBoard));
      }
    }
    else if (this.props.boardAnalyzed !== nextProps.boardAnalyzed && nextProps.boardAnalyzed === true)
    {
      this.props.dispatch(
        gameActions.computeNextTurn(this.props.gameBoard, this.props.gamePlayers, this.props.navigation.state.params.player_id)
      );
    }

    if (this.props.gameFinished !== nextProps.gameFinished && nextProps.gameFinished === true)
    {
      console.log("Game Finished! From PlayGame screen!");
      timer.setTimeout(
        this, 'gameFinished', () => {
          this.props.navigation.navigate('ShowGameScore', {
            players: this.props.gamePlayers,
            game_name: this.props.gameName,
            device_player: this.props.navigation.state.params.player_id
          });
        }, 1200
      );
    }
  }

  getPlayerNames(playerId)
  {
    return (playerId == this.props.navigation.state.params.player_id) ? "You" : "Other";
  }

  render()
  {
    return (
      <View style={styles.container}>
        <View style={styles.headerContainer}>
        <View style={{alignSelf: 'center', padding: 10}}>
          <Text>Current Turn</Text>
        </View>
        {this.props.gamePlayers.map((item, index) =>
          (item.id == this.props.currentGamePlayer) ?
          <View key={`player-${index}`} style={styles.playerHighlighted}>
            <Text style={{color: 'white'}}>{this.getPlayerNames(item.id)}</Text>
          </View>
          :
          <View key={`player-${index}`} style={styles.player}>
            <Text style={{color: 'white'}}>{this.getPlayerNames(item.id)}</Text>
          </View>
        )}
        </View>
        <View style={styles.boardContainer}>
          {this.props.gameBoard.map((item, cIndex) =>
            <View key={`column-${cIndex}`} style={styles.row}>
            {item.map((cell, rIndex) =>
              <View key={`cell-${rIndex}-${cIndex}`} style={styles.tile}>
                <BoardCell row={rIndex} column={cIndex}
                        onPress={this.boardClickHandler.bind(this, cIndex, rIndex, cell)}
                        tileData={cell} />
              </View>
            )}
            </View>
          )}
        </View>
        <View style={styles.footerContainer}>
          <View style={{alignSelf: 'center', padding: 10}}>
            <Text>Current Score</Text>
          </View>
          {this.props.gamePlayers.map((item, index) =>
            (item.id == this.props.currentGamePlayer) ?
            <View key={`player-${index}`} style={styles.scoreHighlighted}>
              <Text style={{color: 'white'}}>{this.getPlayerNames(item.id)}</Text>
              <Text style={{color: 'white'}}>{':'}</Text>
              <Text style={{color: 'white'}}>{item.score}</Text>
            </View>
            :
            <View key={`player-${index}`} style={styles.score}>
              <Text style={{color: 'white'}}>{this.getPlayerNames(item.id)}</Text>
              <Text style={{color: 'white'}}>{':'}</Text>
              <Text style={{color: 'white'}}>{item.score}</Text>
            </View>
          )}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 0,
    flexDirection: 'column',
    justifyContent: 'center'
  },
  headerContainer: {
    flex: .2,
    backgroundColor: 'transparent',
    flexDirection: 'row',
    alignItems: 'center'
  },
  player: {
    backgroundColor: '#b3c6ff',
    justifyContent: 'center',
    flexDirection: 'column',
    alignItems: 'center',
    height: 20
  },
  playerHighlighted: {
    backgroundColor: '#001a66',
    justifyContent: 'center',
    flexDirection: 'column',
    alignItems: 'center',
    height: 20
  },
  boardContainer: {
    flex: .6,
    padding: 10
  },
  footerContainer: {
    flex: .2,
    backgroundColor: 'orange',
    flexDirection: 'row',
    alignItems: 'center'
  },
  score: {
    backgroundColor: '#ffa64d',
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    height: 20
  },
  scoreHighlighted: {
    backgroundColor: '#b35900',
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    height: 20
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flex: 1
  },
  tile: {
    width: TILE_SIZE,
    height: TILE_SIZE,
    borderRadius: BORDER_RADIUS,
    backgroundColor: '#BEE1D2',
  },
});
