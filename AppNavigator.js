import {createStackNavigator} from 'react-navigation';
import HomeScreen from './components/HomeScreen';
import ProfileScreen from './components/ProfileScreen';
import ContactsScreen from './components/ContactsScreen';
const AppNavigator = createStackNavigator({
    Home:{screen:HomeScreen},
    Profile:{screen:ProfileScreen},
    Contacts:{screen:ContactsScreen},
});

export default AppNavigator;