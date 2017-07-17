import React, { Component } from 'react';
import { View, Text, Button, StyleSheet, TextInput } from 'react-native';
const uniqueId = require('react-native-unique-id');

export default class CreateGame extends Component
{
  static navigationOptions = {
    headerTitle: 'Create New Game'
  };

  constructor(props) {
    super(props);
    this.state = { text: '' };
  }

  onCreateGamePress()
  {
    uniqueId()
      .then(id => {
        console.log(id);
        this.props.navigation.navigate('GameLoading', {
          method: 'create_game',
          game_name: this.state.text,
          player_id: id
        });
      })
      .catch(err => {
        let error = new Error('Error fetching unique id for you as a player');
        error.method = "onCreateGamePress";
        error.filename = "CreateGame/index.js";
        error.originalError = err;
        console.error(error);
        throw error;
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
          placeholder={'Enter a name for this game'}
        />
        <View style={{paddingTop: 10}}>
          <Button
            style={styles.selectionButton}
            styleDisabled={{color: 'red'}}
            onPress={this.onCreateGamePress.bind(this)}
            title={'Create game'} />
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
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginLeft: 30,
    marginRight: 30,
    textAlign: 'center',
    width: 200,
    alignSelf: 'center'
  },
  selectionButton: {
    fontSize: 20,
    color: 'green'
  }
});
