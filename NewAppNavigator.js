import React from 'react';
import {createBottomTabNavigator} from 'react-navigation';
import Micon from 'react-native-vector-icons/MaterialIcons';

import NewList from './components/NewList';
import ContactsScreen from './components/NewHomeScreen';
import SharingScreen from './components/HomeScreen';
import AddContact from './components/AddContact';

const NewAppNavigator = createBottomTabNavigator({
    Contacts: {
        screen: ContactsScreen,
        navigationOptions: {
            tabBarIcon: ({tintColor}) => (
                <Micon
                    name='contacts'
                    size={24}
                    color={tintColor}
                />
            )
        }
    },
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
    AddContact:{
        screen:AddContact,
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
    NewList:{
        screen:NewList,
        navigationOptions: {
            tabBarIcon: ({tintColor}) => (
                <Micon
                    name='access-point'
                    size={24}
                    color={tintColor}
                />
            )
        }
    }
});

export default NewAppNavigator;