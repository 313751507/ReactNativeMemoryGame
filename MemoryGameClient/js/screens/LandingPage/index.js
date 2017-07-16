import React, { Component } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import FlickSearchApi from '@memory_game_api/FlickSearchApi';
import autobind from 'autobind-decorator';

export default class Landing extends Component
{
  static navigationOptions = {
    headerTitle: 'Welcome'
  };

  constructor(props)
  {
    super(props);
  }

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

  render()
  {
    return (
      <View style={styles.container}>
        <Text style={styles.heading}>
          Memory Game {'\n\n'}
        </Text>
        <View style={{paddingTop: 10}}>
          <Button
            style={styles.selectionButton}
            onPress={() => this.onJoinGamePress()}
            title={'Join Game'} />
        </View>
        <View style={{paddingTop: 10}}>
          <Button
            style={styles.selectionButton}
            onPress={() => this.onCreateGamePress()}
            title={'Create Game'} />
        </View>
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
