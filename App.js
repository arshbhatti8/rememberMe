import React, {Component} from 'react';
import {AppRegistry, StyleSheet, View} from 'react-native';
import AppNavigator from './AppNavigator';

export default class App extends Component {
  render() {
    return (
        <AppNavigator style={styles.container}/>
    );
  }
}

const styles= StyleSheet.create({
   container:{
     flex:1
   }
});

AppRegistry.registerComponent('App', () => App);
