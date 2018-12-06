import React from 'react';
import {createBottomTabNavigator, createStackNavigator} from 'react-navigation';
import Micon from 'react-native-vector-icons/MaterialIcons';

import NewList from './components/NewList';
import SharingScreen from './components/HomeScreen';
import AddContact from './components/Form';
import UserDetail from './components/UserDetail';

export const HomeStack = createStackNavigator({
    Home:{
        screen:NewList,
        navigationOptions:{
            title:'Home',
            header:null
        }
    },
    UserDetail:{
        screen:UserDetail
    }
});

export const BottomTabNavigator = createBottomTabNavigator({
    Share: {
        screen: SharingScreen,
        navigationOptions: {
            tabBarIcon: ({tintColor}) => (
                <Micon
                    name='share'
                    size={24}
                    color={tintColor}
                />
            )
        }
    },
    AddContact: {
        screen: AddContact,
        navigationOptions: {
            tabBarIcon: ({tintColor}) => (
                <Micon
                    name='person-add'
                    size={24}
                    color={tintColor}
                />
            )
        }
    },
    Home: {
        screen: HomeStack,
        navigationOptions: {
            tabBarIcon: ({tintColor}) => (
                <Micon
                    name='dialer-sip'
                    size={24}
                    color={tintColor}
                />
            )
        }
    }
});

export const Root = createStackNavigator({
        Tabs: {screen: BottomTabNavigator},
        Profile: {screen: HomeStack}
    },
    {
        mode: 'modal',
        headerMode: 'none',
    });

