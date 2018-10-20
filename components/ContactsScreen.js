import React , {Component} from 'react';
import {StyleSheet, View, Text, TouchableOpacity} from 'react-native'
import Micon from 'react-native-vector-icons/MaterialIcons';

export default class ContactsScreen extends Component {
    constructor(props){
        super(props);
    }
render(){
        return(
        <View style={styles.container}>
                <View style={styles.list}>
                   <TouchableOpacity onPress={()=>this.props.navigation.navigate('Profile', {name:'obama'})}>
                       <View style={styles.listItem}>
                           <Micon
                                name='person'
                                size={25}
                                style={styles.contact}>
                           </Micon>
                           <Text style={styles.contactName}>Barack Obama</Text>
                        </View>
                   </TouchableOpacity>
                    <TouchableOpacity onPress={()=>this.props.navigation.navigate('Profile',{name:'sanders'})}>
                        <View style={styles.listItem}>
                            <Micon
                                name='person'
                                size={25}
                                style={styles.contact}>
                            </Micon>
                            <Text style={styles.contactName}>Bernie Sanders</Text>
                        </View>
                    </TouchableOpacity>
                </View>
        </View>
        );
    }
}

const styles = StyleSheet.create({
   container:{
       flex:1,
   },
    list:{
        marginTop:15,
    },
    listItem:{
       marginBottom:15,
        paddingTop:1,
        backgroundColor:'#9B8892',
        alignItems:'center',
        flexDirection:'row',
        elevation:5,
    },

    contact:{
       backgroundColor:'#E5E5E5',
        borderRadius:25,
    },

    contactName:{
       paddingLeft:10,
       fontSize:20,
    },
});



