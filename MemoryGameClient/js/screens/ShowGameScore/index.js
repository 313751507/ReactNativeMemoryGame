import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Text, Button, StyleSheet } from 'react-native';
import autobind from 'autobind-decorator';
import * as MemoryGameApi from '@memory_game_api/MemoryGameServer';
import { NavigationActions } from 'react-navigation';

export default class ShowGameScore extends Component
{
  constructor(props)
  {
    super(props);
    this.state = {
      winnerText: ''
    };
  }

  @autobind
  getPlayerNames(playerId)
  {
    return (playerId == this.props.navigation.state.params.device_player) ? "You" : "Other";
  }

  @autobind
  onPressHighScores()
  {
    const resetAction = NavigationActions.reset({
      index: 0,
      actions: [
        NavigationActions.navigate({ routeName: 'ShowHighScore', params: {
          game_name: this.props.gameName,
          device_player: this.props.navigation.state.params.player_id
        }})
      ]
    });
    this.props.navigation.dispatch(resetAction);

    // this.props.navigation.navigate('ShowHighScore', {
    //   game_name: this.props.gameName,
    //   device_player: this.props.navigation.state.params.player_id
    // });
  }

  @autobind
  updateScoresOnline(players)
  {
    var searchObj = [];
    for (var i = 0; i < players.length; i++)
    {
      MemoryGameApi.SubmitGameScore(players[i].id, players[i].score);
    }
  }

  componentWillMount()
  {
    var sortedPlayers = this.props.navigation.state.params.players.sort(
      (a, b) => {
        return a.score - b.score;
      }
    );

    this.updateScoresOnline(sortedPlayers);

    if (sortedPlayers[0].id == this.props.navigation.state.params.device_player)
    {
      this.setState({
        winnerText: 'You Won!'
      });
    }
    else
    {
      this.setState({
        winnerText: 'You Loose :('
      });
    }
  }

  render()
  {
    return (
      <View style={styles.container}>
        <Text style={styles.heading}>
          {'Scores\n\n'}
        </Text>
        <Text style={styles.winnerText}>
          {this.state.winnerText}
        </Text>
        <View style={{flexDirection: 'row'}}>
          {this.props.navigation.state.params.players.map((item, index) =>
            <View key={`player-${index}`} style={styles.scoreBox}>
              <Text style={styles.scoreText}>
                {this.getPlayerNames(item.id)}{' : '}{item.score}
              </Text>
            </View>
          )}
        </View>
        <Button
          style={styles.highScoreButton}
          styleDisabled={{color: 'red'}}
          onPress={() => this.onPressHighScores()}
          title={'Show High Scores'} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
    flexDirection: 'column',
    paddingTop: 100
  },
  heading: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
    color: '#c63939'
  },
  highScoreButton: {
    fontSize: 20,
    color: 'green',
    margin: 10
  },
  scoreBox: {
    backgroundColor: '#ff8080',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 10
  },
  scoreText: {
    fontSize: 14,
    textAlign: 'center',
    color: 'white'
  },
  winnerText: {
    fontSize: 30,
    textAlign: 'center',
    margin: 10,
    color: '#0066ff'
  }
});
