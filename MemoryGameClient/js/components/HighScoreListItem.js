import React, {Component} from 'react';
import ReactNative from 'react-native';
const { View, Text, StyleSheet } = ReactNative;
var _ = require('lodash');
import autobind from 'autobind-decorator';

export default class HighScoreListItem extends Component {
  @autobind
  getTrimmedId(id)
  {
    return _.truncate(id, {
      'length': 10,
    });
  }

  render() {
    return (
      <View style={styles.li}>
        <Text style={styles.liText}>{this.getTrimmedId(this.props.item.player_id)}</Text>
        <Text style={styles.liText}>{this.props.item.score}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  liText: {
    flex: 0.5,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ccccff',
    color: 'black'
  },
  li: {
    backgroundColor: '#ffff66',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row'
  }
});
