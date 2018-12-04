import React, {Component} from 'react';
import {StyleSheet, View, TextInput, Button} from 'react-native';
import {Avatar} from 'react-native-elements';
import { connect } from 'react-redux';
import uuidv4 from 'uuid4';

import {addContact} from "../actions/index";


const mapDispatchToProps = dispatch => {
    return {
        addContact: user => dispatch(addContact(user))
    };
};

class AddContact extends Component {

    constructor(){
        super();
        this.state={
            user: {
                id:uuidv4(),
                firstName: "First Name",
                lastName: "Last Name",
                phoneNumber: "Phone Number",
                emailAddress: "Email Address",
                company: "Company",
            }
        }
    }

    submitContact=(event)=>{
        event.preventDefault();
        const {user} = this.state;
        this.props.addContact(user);
    };


    render() {
        return (
            <View style={styles.container}>
                <View style={styles.image}>
                    <Avatar
                        xlarge
                        raised
                        rounded
                        icon={{name: 'person-add', color: '#3e86f9'}}
                    />
                </View>
                <View style={styles.inputContainer}>
                    <View style={styles.borderBottom}>
                        <TextInput
                            value={this.state.user.firstName}
                            onChangeText={(text) => this.setState({user:{...this.state.user,firstName:text}})}/>
                    </View>
                    <View style={styles.borderBottom}>
                        <TextInput
                            value={this.state.user.lastName}
                            onChangeText={(text) => this.setState({user:{...this.state.user,lastName: text}})}/>
                    </View>
                    <View style={styles.borderBottom}>
                        <TextInput
                            value={this.state.user.phoneNumber}
                            onChangeText={(text) => this.setState({user:{...this.state.user,phoneNumber: text}})}/>
                    </View>
                    <View style={styles.borderBottom}>
                        <TextInput
                            value={this.state.user.emailAddress}
                            onChangeText={(text) => this.setState({user:{...this.state.user,emailAddress: text}})}/>
                    </View>
                    <View style={styles.borderBottom}>
                        <TextInput
                            value={this.state.user.company}
                            onChangeText={(text) => this.setState({user:{...this.state.user,company: text}})}/>
                    </View>
                </View>
                <Button title='Submit' style={styles.submitButton} onPress={this.submitContact}/>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    image: {
        flex: 3,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 5,
    },
    inputContainer: {
        flex: 7,
        justifyContent: 'center',
        alignItems: 'center',
    },
    borderBottom: {
        borderBottomWidth: 1
    },
    submitButton:{
        marginTop:5,
    }
});

const ContactPage = connect(null, mapDispatchToProps)(AddContact);
export default ContactPage;