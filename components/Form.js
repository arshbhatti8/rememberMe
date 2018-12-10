import React, {Component} from 'react';
import {StyleSheet, ScrollView} from 'react-native';
import { Button, FormLabel, FormInput } from 'react-native-elements';
import {connect} from 'react-redux'
import uuidv4 from 'uuid4';
import axios from 'axios';

import {addContact} from "../actions/index";

const mapDispatchToProps = dispatch => {
    return {
        addContact: user => dispatch(addContact(user))
    };
};

class RenderForm extends Component  {
    constructor() {
        super();
        this.state = {
            user: {
                id: uuidv4(),
                name: '',
                phoneNumber: '',
                emailAddress: '',
                company: '',
                linkedin: '',
                instagram: '',
                facebook: '',
                notes: '',
            }
        }
    }

    componentWillReceiveProps(nextProps){
        const {url} = nextProps.navigation.state.params;
        const nameRegex = /^([A-Z])\w+\s*\w*/g;
        const emailRegex= /\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+/g;
        const phoneNumberRegex=/^\d+/g;
        let user= {...this.state.user};
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
        if(user.name!==""){
            this.setState({user:user});
            alert('Don\'t forget to press Submit button to save these details');
        }
        else{
            alert('Name is a mandatory field!');
        }

    }

    camelize(str){
        return str.replace(/(?:^\w|[A-Z]|\b\w)/g, function(letter, index) {
            return index === 0 ? letter.toLowerCase() : letter.toUpperCase();
        }).replace(/\s+/g, '');
    }

    submitContact = (event) => {
        event.preventDefault();
        let {user} = {...this.state};
        if(this.state.user.name!==""&&this.state.user.phoneNumber!==""){
            user.flag = "false";
            user.notes===''? user.notes="notes":user.notes;
            axios.post('https://rememberme-api-1.herokuapp.com/contacts/add', user)
                .then((res)=>{
                    this.props.addContact(user);
                    alert(JSON.stringify('User added to backend'));
                    this.props.navigation.navigate('Contacts');
                }).catch((error)=>{
                alert(JSON.stringify(error));
            });
            this.setState({
                user: {
                    id: uuidv4(),
                    name: '',
                    phoneNumber: '',
                    emailAddress: '',
                    company: '',
                    linkedin: '',
                    instagram: '',
                    facebook: '',
                    notes: '',
                }
            });
        }
        else{
            alert('Name and Phone # is a mandatory field!');
        }

    };

    navigateToCamera = () => {
        this.props.navigation.navigate('Camera',{routedFrom:'AddContact'});
    };

    render(){
        return (
            <ScrollView contentContainerStyle={styles.contentContainer}>
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
                    onPress={this.navigateToCamera}
                    containerViewStyle={styles.submitButton}
                    raised
                    title='Scan QR'/>
            </ScrollView>
        );
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
    submitButton: {
        marginTop: 20,
    },
    contentContainer:{
        backgroundColor:'#36485f',
        paddingRight:60,
        paddingBottom:20,
    },
    header:{
        fontSize:17,
        color:'#fff'
    },
    formInput:{
        borderBottomWidth:1,
        borderBottomColor:'#199187',
    },
    inputText:{
        color:'#fff',
        fontSize:16
    },
});

const Form = connect(null, mapDispatchToProps)(RenderForm);
export default Form;