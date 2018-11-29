import React, {Component} from 'react';
import {AppRegistry, StyleSheet, View} from 'react-native';
import AppNavigator from './NewAppNavigator';

export default class App extends Component {
  render() {
    return (
        <View style={styles.container}>
            <AppNavigator/>
        </View>
    );
  }
}
const styles = StyleSheet.create({
   container:{
       flex:1,
   }
});
AppRegistry.registerComponent('App', () => App);
