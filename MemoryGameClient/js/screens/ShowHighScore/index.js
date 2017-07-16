import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Text, Button, StyleSheet, ListView, ActivityIndicator } from 'react-native';
import autobind from 'autobind-decorator';
import HighScoreListItem from '@memory_game_components/HighScoreListItem';
import * as MemoryGameApi from '@memory_game_api/MemoryGameServer';
import { NavigationActions } from 'react-navigation';

const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

export default class ShowHighScore extends Component
{
  constructor(props)
  {
    super(props);

    this.state = {
      dataSource: ds.cloneWithRows([{
        score: 10,
        player_id: 'ABC'
      },
      {
        score: 9,
        player_id: 'DEF'
      }]),
      fetching: false,
      fetched: true,
      error: null
    };
  }

  @autobind
  fetchHighScores()
  {
    this.setState({
      fetching: true,
      fetched: false,
      error: null
    });

    MemoryGameApi.FetchHighScores()
    .then((scores) => {
      this.setState({
        dataSource: ds.cloneWithRows(scores),
        fetching: false,
        fetched: true,
        error: null
      });
    });
  }

  @autobind
  _renderItem(item)
  {
    return (
      <HighScoreListItem item={item} />
    );
  }

  @autobind
  goHomePress()
  {
    const resetAction = NavigationActions.reset({
      index: 0,
      actions: [
        NavigationActions.navigate({ routeName: 'Landing' })
      ]
    });
    this.props.navigation.dispatch(resetAction);
  }

  componentDidMount()
  {
    this.fetchHighScores();
  }

  render()
  {
    var view = (this.state.fetching) ?
    (
      <View style={styles.container}>
        <Text style={styles.heading}>
          {'Fetching high scores'}
        </Text>
        <ActivityIndicator size={'large'} color={'red'} />
      </View>
    ) :
    (
      <View style={{flex: 1, flexDirection: 'column'}}>
        <ListView
          dataSource={this.state.dataSource}
          renderRow={this._renderItem}
        />
        <View style={{paddingTop: 10}}>
          <Button
            style={styles.selectionButton}
            onPress={() => this.goHomePress()}
            title={'Go Home'} />
        </View>
      </View>
    );

    return view;
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
  selectionButton: {
    fontSize: 20,
    color: 'green'
  }
});
