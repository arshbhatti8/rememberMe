import React, {Component} from 'react';
import {StyleSheet, Text, View, TouchableOpacity, TextInput} from 'react-native';
import QRCode from 'react-native-qrcode';
import Icon from 'react-native-vector-icons/AntDesign';
import Micon from 'react-native-vector-icons/MaterialIcons';


export default class HomeScreen extends Component {
    constructor(props){
        super(props);
        this.state = {
            text: 'http://facebook.github.io/react-native/',
        };
    }

    generateLinkedin(){
        this.setState({
            text:'www.linkedin.com'
        });
    }

    generateEmail(){
        this.setState({
            text:'www.gmail.com'
        });
    }

    generateFacebook(){
        this.setState({
            text:'www.facebook.com'
        });
    }

    generateInstagram(){
        this.setState({
            text:'www.instagram.com'
        });
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.body}>
                   <View style={styles.navBar}>
                       <TouchableOpacity
                           onPress={()=>this.generateLinkedin()}>
                           <Icon name='linkedin-square' size={30}/>
                       </TouchableOpacity>
                       <TouchableOpacity
                           onPress={()=>this.generateEmail()}>
                           <Icon name='mail' size={30}/>
                       </TouchableOpacity>
                       <TouchableOpacity
                           onPress={()=>this.generateFacebook()}>
                           <Icon name='facebook-square' size={30}/>
                       </TouchableOpacity>
                       <TouchableOpacity
                           onPress={()=>this.generateInstagram()}>
                           <Icon name='instagram' size={30}/>
                       </TouchableOpacity>
                   </View>
                    <View style={styles.qr}>
                        <QRCode
                            value={this.state.text}
                            size={200}
                            bgColor='black'
                            fgColor='white'/>
                        <Text>State:{this.state.text}</Text>
                    </View>
                </View>
                    <View style={styles.tabBar}>
                        <TouchableOpacity
                            style={styles.tabItem}
                            onPress={()=>this.props.navigation.navigate('Profile')}>
                            <Micon name='account-circle' size={25}/>
                            <Text>Profile</Text>
                        </TouchableOpacity>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container:{
        flex:1
    },
    navBar:{
        height:50,
        backgroundColor:'white',
        elevation:3,
        flexDirection:'row',
        justifyContent:'space-around',
        alignItems:'center',

    },
    body:{
        flex:1
    },
    qr:{
        marginTop:10,
        height:300,
        backgroundColor:'white',
        elevation:10,
        alignItems:'center',
    },
    tabBar:{
        backgroundColor:'white',
        height:60,
        borderColor:'#E5E5E5',
        borderTopWidth:0.5,
        flexDirection:'row',
        justifyContent:'space-around',

    },
    tabItem:{
        alignItems:'center',
        justifyContent:'center',
    },
    tabTitle:{
        fontSize:11,
        color:'#3c3c3c',

    }

});
