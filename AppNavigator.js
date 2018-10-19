import {createStackNavigator} from 'react-navigation';
import HomeScreen from './components/HomeScreen';
import ProfileScreen from './components/ProfileScreen';

const AppNavigator = createStackNavigator({
    Home:{screen:HomeScreen},
    Profile:{screen:ProfileScreen}
});

export default AppNavigator;