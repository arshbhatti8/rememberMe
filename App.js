import React, {Component} from 'react';
import {AppRegistry, StyleSheet, View} from 'react-native';
import {Provider} from 'react-redux';
import store from './store/index';

import {Root,BottomTabNavigator} from './AppNavigator';

export default class App extends Component {
    render() {
        return (
            <View style={styles.container}>
                <Provider store={store}>
                    <Root/>
                </Provider>
            </View>
        );
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
    }
});
AppRegistry.registerComponent('App', () => App);
