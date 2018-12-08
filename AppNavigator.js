import React from 'react';
import {createBottomTabNavigator, createStackNavigator} from 'react-navigation';
import Micon from 'react-native-vector-icons/MaterialIcons';
import McIcon from 'react-native-vector-icons/MaterialCommunityIcons';

import Contacts from './components/ContactsList';
import AddContact from './components/Form';
import UserDetail from './components/UserDetail';
import Profile from './components/ProfileScreen';
import EditProfile from './components/EditProfile';
import GenerateQR from './components/GenerateQR';
import Camera from './components/CameraScreen';

export const HomeStack = createStackNavigator({
    Contacts:{
        screen:Contacts,
        navigationOptions:{
            title:'Contacts',
            headerTitleStyle :{textAlign: 'center',alignSelf:'center'},
        }
    },
    UserDetail:{
        screen:UserDetail,
        navigationOptions:{
            title:'User Detail',
            headerTitleStyle :{textAlign: 'center',alignSelf:'center'},
        }
    },
    Camera:{
        screen:Camera,
        navigationOptions:{
            title:'Point camera at QR',
            headerTitleStyle :{textAlign: 'center',alignSelf:'center'},
        }
    }

});



export const ProfileStack = createStackNavigator({
    Profile:{
        screen:Profile,
        navigationOptions:{
            title:'Profile',
            headerTitleStyle :{textAlign: 'center',alignSelf:'center'},
        }
    },
    EditProfile:{
        screen:EditProfile,
        navigationOptions:{
            title:'Edit Profile',
            headerTitleStyle :{textAlign: 'center',alignSelf:'center'},
        }
    },
    GenerateQR:{
        screen:GenerateQR,
        navigationOptions:{
            title:'Generate QR',
            headerTitleStyle :{textAlign: 'center',alignSelf:'center'},
        }
    }
});

export const AddContactStack = createStackNavigator({
    AddContact:{
        screen:AddContact,
        navigationOptions:{
            title:'Add Contact',
            headerTitleStyle :{textAlign: 'center',alignSelf:'center'},
        }
    },
    Camera:{
        screen:Camera,
        navigationOptions:{
            title:'Camera',
            headerTitleStyle :{textAlign: 'center',alignSelf:'center'},
        }
    },

});

export const BottomTabNavigator = createBottomTabNavigator({
    Contacts: {
        screen: HomeStack,
        navigationOptions: {
            tabBarIcon: ({tintColor}) => (
                <McIcon
                    name='account-multiple'
                    size={24}
                    color={tintColor}
                />
            )
        }
    },
    Profile:{
        screen:ProfileStack,
        navigationOptions: {
            tabBarIcon: ({tintColor}) => (
                <Micon
                    name='account-box'
                    size={24}
                    color={tintColor}
                />
            )
        }
    },
    AddContact: {
        screen: AddContactStack,
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
});

export const Root = createStackNavigator({
        Tabs: {screen: BottomTabNavigator},
        Profile: {screen: HomeStack}
    },
    {
        mode: 'modal',
        headerMode: 'none',
    });

