import React, { Component } from 'react';
import { View, TouchableHighlight, Image, StyleSheet, Text } from 'react-native';
import * as libBoardTile from '@memory_game_lib/boardTile';

export default class BoardCell extends Component
{
  constructor(props)
  {
    super(props);
    //console.log(props);
  }

  render()
  {
    let renderedView = null;

    if (libBoardTile.IsTileBlocked(this.props.tileData))
    {
      renderedView = (
        <View style={{backgroundColor: 'red', flex:1}}>
          <TouchableHighlight onPress={this.props.onPress} style={styles.blockedCell}>
            <Text style={{flex: 1}}>{libBoardTile.GetTileNumber(this.props.tileData)}</Text>
          </TouchableHighlight>
        </View>
      );
    }
    else if (libBoardTile.IsTileFlipped(this.props.tileData))
    {
      //console.log(libBoardTile.GetTileImage(this.props.tileData));
      renderedView = (
        <View style={styles.flippedCell}>
          <Image style={{flex: 1}} source={{uri: libBoardTile.GetTileImage(this.props.tileData) }} />
        </View>
      );
    }
    else if (libBoardTile.IsTilePlayed(this.props.tileData))
    {
      renderedView = (
        <View style={styles.playedCell}>
        </View>
      );
    }

    return (
      <View style={styles.container}>
        {renderedView}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  cellClick: {
    flex: 1
  },
  blockedCell: {
    flex: 1
  },
  playedCell: {
    backgroundColor: '#333300',
    flex: 1
  },
  flippedCell: {
    flex: 1,
    backgroundColor:'transparent'
  },
  container: {
    flex: 1,
    alignItems: 'stretch'
  }
});
