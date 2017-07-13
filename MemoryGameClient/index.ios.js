/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */
//
// import React, { Component } from 'react';
// import {
//   AppRegistry,
//   StyleSheet,
//   Text,
//   View
// } from 'react-native';
//
// import FlickSearchApi from './js/FlickSearchApi';
//
// export default class MemoryGameClient extends Component {
//
//   componentDidMount()
//   {
//     console.log('Here it did Load!!!!');
//     FlickSearchApi.getKittenPhotos()
//     .then((result) => {
//       var photos = result.photos.photo;
//       for (let photo of photos)
//       {
//         console.log(JSON.stringify(FlickSearchApi.fetchPhotoUrl(photo)));
//       }
//     })
//     .catch((err) => {
//       console.log(err);
//     });
//   }
//
//   render() {
//     return (
//       <View style={styles.container}>
//         <Text style={styles.welcome}>
//           Welcome to React Native!
//         </Text>
//         <Text style={styles.instructions}>
//           To get started, edit index.ios.js
//         </Text>
//         <Text style={styles.instructions}>
//           Press Cmd+R to reload,{'\n'}
//           Cmd+D or shake for dev menu
//         </Text>
//       </View>
//     );
//   }
// }
//
// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: '#F5FCFF',
//   },
//   welcome: {
//     fontSize: 20,
//     textAlign: 'center',
//     margin: 10,
//   },
//   instructions: {
//     textAlign: 'center',
//     color: '#333333',
//     marginBottom: 5,
//   },
// });
//
// AppRegistry.registerComponent('MemoryGameClient', () => MemoryGameClient);

import { AppRegistry } from 'react-native';
import App from './js/App';

AppRegistry.registerComponent('MemoryGameClient', () => App);
