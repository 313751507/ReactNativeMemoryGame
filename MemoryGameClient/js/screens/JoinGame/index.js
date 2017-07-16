import React, { Component } from 'react';
import { View, Text, Button, StyleSheet, TextInput } from 'react-native';

export default class JoinGame extends Component
{
  static navigationOptions = {
    headerTitle: 'Join a Game'
  };

  constructor(props) {
    super(props);
    this.state = { text: 'Enter game name to join it' };
  }

  onJoinGamePress()
  {
    this.props.navigation.navigate('GameLoading', {
      method: 'join_game',
      game_name: this.state.text
    });
  }

  render()
  {
    return (
      <View style={styles.container}>
        <TextInput
          style={styles.input}
          onChangeText={(text) => this.setState({text})}
          value={this.state.text}
        />
        <Button
          style={styles.selectionButton}
          styleDisabled={{color: 'red'}}
          onPress={this.onJoinGamePress.bind(this)}
          title={'Join it!'} />
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
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginLeft: 30,
    marginRight: 30,
    textAlign: 'center'
  },
  selectionButton: {
    fontSize: 20,
    color: 'green'
  }
});
