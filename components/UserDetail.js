import React, {Component} from 'react';
import {StyleSheet, ScrollView, TouchableHighlight} from 'react-native';
import {Tile, FormLabel, FormInput, Button, Text} from 'react-native-elements';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {connect} from 'react-redux';

import {editContact} from "../actions/index";

const mapDispatchToProps = dispatch => {
    return {
        editContact: user => dispatch(editContact(user))
    };
};


class UserDetail extends Component {

    constructor(props) {
        super(props);
        let {
            id, name, phoneNumber, emailAddress, company, linkedin,
            instagram, facebook, notes
        } = this.props.navigation.state.params;
        this.state = {
            user: {
                id: id,
                name: name,
                phoneNumber: phoneNumber,
                emailAddress: emailAddress,
                company: company,
                linkedin: linkedin,
                instagram: instagram,
                facebook: facebook,
                notes: notes,
            }
        };

    }

    componentWillReceiveProps(nextProps) {
        const {url} = nextProps.navigation.state.params;
        let user= {...this.state.user};
        const nameRegex = /^([A-Z])\w+\s*\w*/g;
        const emailRegex= /\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+/g;
        const phoneNumberRegex=/^\d+/g;
        if (url !== undefined) {
            let arr = url.split(',');
            arr.forEach(index => {
                if (nameRegex.exec(index) !== null || undefined) {
                    user.name = index;
                }
                if (phoneNumberRegex.exec(index)) {
                    user.phoneNumber = index;
                }
                if (emailRegex.exec(index)!==null||undefined) {
                    user.emailAddress = index;
                }
                if (index.includes('linkedin')) {
                    user.linkedin= index;
                }
                if (index.includes('instagram')) {
                    user.instagram = index;
                }
                if (index.includes('facebook')) {
                    user.facebook = index;
                }
            });
        }
        this.setState({user:user});
        alert('Don\'t forget to press Submit button to save these details');
    }

    submitContact = (event) => {
        event.preventDefault();
        const {user} = this.state;
        this.props.editContact(user);
    };

    navigateToScanQR = () => {
        this.props.navigation.navigate('Camera',{routedFrom:'UserDetail'});
    };

    render() {
        return (
            <ScrollView contentContainerStyle={styles.contentContainer}>
                <Tile
                    imageSrc={{uri: 'https://randomuser.me/api/portraits/men/65.jpg'}}
                    featured
                    title={`${this.state.user.name.toUpperCase()}`}
                    caption={`${this.state.user.emailAddress}`}>
                </Tile>
                <FormLabel labelStyle={styles.header}>Name</FormLabel>
                <FormInput
                    value={this.state.user.name}
                    onChangeText={(value) => this.setState({user: {...this.state.user, name: value}})}
                    containerStyle={styles.formInput}
                    inputStyle={styles.inputText}/>
                <FormLabel labelStyle={styles.header}>Phone Number</FormLabel>
                <FormInput
                    value={this.state.user.phoneNumber}
                    onChangeText={(value) => this.setState({user: {...this.state.user, phoneNumber: value}})}
                    containerStyle={styles.formInput}
                    inputStyle={styles.inputText}/>
                <FormLabel labelStyle={styles.header}>Email Address</FormLabel>
                <FormInput
                    value={this.state.user.emailAddress}
                    onChangeText={(value) => this.setState({user: {...this.state.user, emailAddress: value}})}
                    containerStyle={styles.formInput}
                    inputStyle={styles.inputText}/>
                <FormLabel labelStyle={styles.header}>Company</FormLabel>
                <FormInput
                    value={this.state.user.company}
                    onChangeText={(value) => this.setState({user: {...this.state.user, company: value}})}
                    containerStyle={styles.formInput}
                    inputStyle={styles.inputText}/>
                <FormLabel labelStyle={styles.header}>Linkedin</FormLabel>
                <FormInput
                    value={this.state.user.linkedin}
                    onChangeText={(value) => this.setState({user: {...this.state.user, linkedin: value}})}
                    containerStyle={styles.formInput}
                    inputStyle={styles.inputText}/>
                <FormLabel labelStyle={styles.header}>Instagram</FormLabel>
                <FormInput
                    value={this.state.user.instagram}
                    onChangeText={(value) => this.setState({user: {...this.state.user, instagram: value}})}
                    containerStyle={styles.formInput}
                    inputStyle={styles.inputText}/>
                <FormLabel labelStyle={styles.header}>Facebook</FormLabel>
                <FormInput
                    value={this.state.user.facebook}
                    onChangeText={(value) => this.setState({user: {...this.state.user, facebook: value}})}
                    containerStyle={styles.formInput}
                    inputStyle={styles.inputText}/>
                <FormLabel labelStyle={styles.header}>Notes</FormLabel>
                <FormInput
                    value={this.state.user.notes}
                    onChangeText={(value) => this.setState({user: {...this.state.user, notes: value}})}
                    containerStyle={styles.formInput}
                    inputStyle={styles.inputText}/>
                <Button
                    onPress={this.submitContact}
                    containerViewStyle={styles.submitButton}
                    raised
                    title='Submit'/>
                <Button
                    onPress={this.navigateToScanQR}
                    containerViewStyle={styles.submitButton}
                    raised
                    title='Scan QR'/>
                <TouchableHighlight
                    style={styles.mic}>
                    <Icon style={{color:'white'}} name='keyboard-voice' size={70}>
                    </Icon>
                </TouchableHighlight>
                <Text h4 style={[{color:'white',
                    marginTop:10, marginBottom:10,textAlign:'center'}]} >Tap to Start Recording Notes</Text>
            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    header: {
        fontSize: 17,
        color: '#fff'
    },
    formInput: {
        borderBottomWidth: 1,
        borderBottomColor: '#199187',
    },
    inputText: {
        color: '#fff',
        fontSize: 16
    },
    contentContainer: {
        backgroundColor: '#36485f',
        paddingBottom: 20,
    },
    submitButton: {
        marginTop: 20,
    },
    mic:{
        alignItems:'center',
        marginTop:30,
    },
});

const DetailUser = connect(null, mapDispatchToProps)(UserDetail);
export default DetailUser;