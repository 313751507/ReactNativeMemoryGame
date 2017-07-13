import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Text, Button, StyleSheet } from 'react-native';
import FlickSearchApi from '@memory_game_api/FlickSearchApi';
import autobind from 'autobind-decorator';
import Horizon from '@memory_game_api/HorizonClient'

/*@connect((store) => {
  return {
  };
})*/
export default class Landing extends Component
{
  static navigationOptions = {
    headerTitle: 'Welcome'
  };

  @autobind
  onJoinGamePress()
  {
    this.props.navigation.navigate('JoinGame');
  }

  @autobind
  onCreateGamePress()
  {
    this.props.navigation.navigate('CreateGame');
  }

  componentDidMount()
  {
    /*console.log('Here it did Load!!!!');
    FlickSearchApi.getKittenPhotos()
    .then((result) => {
      var photos = result.photos.photo;
      for (let photo of photos)
      {
        console.log(JSON.stringify(FlickSearchApi.fetchPhotoUrl(photo)));
      }
    })
    .catch((err) => {
      console.log(err);
    });*/
    /*this.games = Horizon("games");
    this.games.store({
      id: "MyTemporaryGame10x1",
      board: []
    });*/
  }

  componentWillMount()
  {
    //this.props.dispatch(user.fetchUserFromEOLFulfilled());
  }

  render()
  {
    return (
      <View style={styles.container}>
        <Text style={styles.heading}>
          Memory Game {'\n\n'}
        </Text>
        <Button
          style={styles.selectionButton}
          styleDisabled={{color: 'red'}}
          onPress={() => this.onJoinGamePress()}
          title={'Join Game'} />
        <Button
          style={styles.selectionButton}
          styleDisabled={{color: 'red'}}
          onPress={() => this.onCreateGamePress()}
          title={'Create Game'} />
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
  selectionButton: {
    fontSize: 20,
    color: 'green'
  }
});
