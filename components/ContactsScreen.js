import React , {Component} from 'react';
import {StyleSheet, View, Text, TouchableOpacity} from 'react-native';
import Micon from 'react-native-vector-icons/MaterialIcons';

export default class ContactsScreen extends Component {
    constructor(){
        super();
        this.state={
            contacts:[
            "Barack Obama",
            "Bernie Sanders"
        ]
        }
    }
    render() {
        // let url="";
        // if(this.props.navigation.state.params.url ){
        //     url=this.props.navigation.state.params.url;
        // }
        // url="http";


        let renderContacts= this.state.contacts.map(contact=>{
            return(
                <View>
                    <TouchableOpacity
                        onPress={()=>this.props.navigation.navigate('Profile', {name:contact})}
                        key={contact}>
                        <View style={styles.listItem}>
                            <Micon
                            name='person'
                            size={25}
                            style={styles.contact}>
                            </Micon>
                            <Text style={styles.contactName}>{contact}</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            );
        });

        return (
            <View style={styles.container}>
                <View style={styles.list}>
                    {renderContacts}
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



