import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import * as GameActions from '@memory_game_actions/gameActions';
import * as FlickrActions from '@memory_game_actions/flickrActions';

@connect((store) => {
  return {
    game: store.game,
    flickr: store.flickr
  };
})
export default class GameLoading extends Component
{
  static navigationOptions = {
    header: null
  };

  constructor(props) {
    super(props);
  }

  componentWillReceiveProps(nextProps)
  {
    if (
      this.props.navigation.state.params.method.localeCompare("create_game") == 0 &&
      nextProps.flickr.fetched !== this.props.flickr.fetched &&
      nextProps.flickr.fetched === true
    )
    {
      //console.log('Dispatching create game!');
      this.props.dispatch(GameActions.createNewGame(
          this.props.navigation.state.params.game_name,
          nextProps.flickr.photos,
          this.props.navigation.state.params.player_id
        )
      );
    }
    else if (nextProps.game.gameCreated !== this.props.game.gameCreated && nextProps.game.gameCreated === true)
    {
      this.props.navigation.navigate('PlayGame', {
        player_id: this.props.navigation.state.params.player_id,
        game_name: this.props.navigation.state.params.game_name
      });
    }
  }

  componentWillMount()
  {
    var { state } = this.props.navigation;
    switch (state.params.method) {
      case "join_game": {
        //GameActions
      }
      break;
      case "create_game": {
        this.props.dispatch(FlickrActions.fetchKittenPhotos());
      }
      break;
    }
  }

  componentDidMount()
  {
  }

  render()
  {
    var messageToShow = 'Trying to lookup game \n\n';

    if (this.props.flickr.fetching)
    {
      messageToShow = 'Fetching flickr photos to prepare cards \n\n';
    }

    if (this.props.flickr.error !== null)
    {
      messageToShow = 'Fetching flickr photos failed...! \n\n';
    }

    if (this.props.game.creatingGame)
    {
      messageToShow = 'Preparing game board for you \n\n';
    }

    return (
      <View style={styles.container}>
        <Text style={styles.heading}>
          {messageToShow}
        </Text>
        <ActivityIndicator size={'large'} color={'red'} />
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
  }
});
