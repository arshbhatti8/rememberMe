import React, {Component} from 'react';
import {StyleSheet, ScrollView, TouchableHighlight, View} from 'react-native';
import {Tile, FormLabel, FormInput, Button, Text} from 'react-native-elements';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {connect} from 'react-redux';
import Voice from 'react-native-voice';
import axios from 'axios';

import {editContact,deleteContact} from "../actions/index";

const mapDispatchToProps = dispatch => {
    return {
        editContact: user => dispatch(editContact(user)),
        deleteContact: user =>dispatch(deleteContact(user))
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
            recognized: '',
            pitch: '',
            error: '',
            end: '',
            started: '',
            results: [],
            partialResults: [],
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
        Voice.onSpeechStart = this.onSpeechStart.bind(this);
        Voice.onSpeechRecognized = this.onSpeechRecognized.bind(this);
        Voice.onSpeechEnd = this.onSpeechEnd.bind(this);
        Voice.onSpeechError = this.onSpeechError.bind(this);
        Voice.onSpeechResults = this.onSpeechResults.bind(this);
        Voice.onSpeechPartialResults = this.onSpeechPartialResults.bind(this);
        Voice.onSpeechVolumeChanged = this.onSpeechVolumeChanged.bind(this);

    }

    componentWillReceiveProps(nextProps) {
        const {url} = nextProps.navigation.state.params;
        let user = {...this.state.user};
        const nameRegex = /^([A-Z])\w+\s*\w*/g;
        const emailRegex = /\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+/g;
        const phoneNumberRegex = /^\d+/g;
        if (url !== undefined) {
            let arr = url.split(',');
            arr.forEach(index => {
                if (nameRegex.exec(index) !== null || undefined) {
                    user.name = index;
                }
                if (phoneNumberRegex.exec(index)) {
                    user.phoneNumber = index;
                }
                if (emailRegex.exec(index) !== null || undefined) {
                    user.emailAddress = index;
                }
                if (index.includes('linkedin')) {
                    user.linkedin = index;
                }
                if (index.includes('instagram')) {
                    user.instagram = index;
                }
                if (index.includes('facebook')) {
                    user.facebook = index;
                }
            });
        }
        this.setState({user: user});
        alert('Don\'t forget to press Submit button to save these details');
    }

    submitContact = (event) => {
        event.preventDefault();
        const {user} = this.state;
        if(user.notes!==undefined){
                let state = {...this.state};
                state.partialResults.map((note) => {
                    user.notes = note;
                });
                axios.patch(`https://rememberme-api-1.herokuapp.com/contacts/${user.id}`,user)
                .then((res)=>{
                    this.props.editContact(user);
                    this.props.navigation.navigate('Contacts');
                    alert(JSON.stringify('User added to backend'));
                }).catch((error)=>{
                    alert(JSON.stringify(error));
                });
        }

    };

    deleteContact = (event)=>{
        event.preventDefault();
        const {user} = this.state;
        this.props.deleteContact(user);
        this.props.navigation.navigate('Contacts');
    };

    navigateToScanQR = () => {
        this.props.navigation.navigate('Camera', {routedFrom: 'UserDetail'});
    };

    onSpeechStart(e) {
        this.setState({
            started: '√',
        });
    }

    onSpeechRecognized(e) {
        this.setState({
            recognized: '√',
        });
    }

    onSpeechEnd(e) {
        this.setState({
            end: '√',
        });
    }

    onSpeechError(e) {
        this.setState({
            error: JSON.stringify(e.error),
        });
    }

    onSpeechResults(e) {
        this.setState({
            results: e.value,
        });
    }

    onSpeechPartialResults(e) {
        this.setState({
            partialResults: e.value,
        });
    }

    onSpeechVolumeChanged(e) {
        this.setState({
            pitch: e.value,
        });
    }

    async _startRecognizing(e) {
        this.setState({
            recognized: '',
            pitch: '',
            error: '',
            started: '',
            results: [],
            partialResults: [],
            end: '',
        });
        try {
            await Voice.start('en-US');
        } catch (e) {
            console.error(e);
        }
    }


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
                <FormLabel labelStyle={styles.header}>Typed Notes</FormLabel>
                <FormInput
                    value={this.state.user.notes}
                    onChangeText={(value) => this.setState({user: {...this.state.user, notes: value}})}
                    containerStyle={styles.formInput}
                    inputStyle={styles.inputText}/>
                <View style={{flex:1,flexDirection:'row'}}>
                    <View style={{flex:2, alignItems:'center'}}>
                        <TouchableHighlight style={{marginTop:10,}}
                        onPress={this._startRecognizing.bind(this)}>
                            <Icon style={{color: 'white'}}
                                  name='keyboard-voice' size={40}>
                            </Icon>
                        </TouchableHighlight>
                        <Text h6 style={[{
                            color: 'white',
                            marginTop: 10, marginBottom: 10, textAlign: 'center'}]}>
                            Tap to record notes
                        </Text>
                    </View>
                    <View style={{flex:2,alignItems:'center'}}>
                        <FormLabel labelStyle={styles.header}>Voice Notes:</FormLabel>
                            {this.state.partialResults.map((result, index) => {
                                return (
                                    <Text
                                        key={`partial-result-${index}`}
                                        style={styles.stat}>
                                        {result}
                                    </Text>
                                )
                            })}
                            </View>
                </View>
                <View style={styles.buttonContainer}>
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
                    <Button
                        onPress={this.deleteContact}
                        containerViewStyle={styles.submitButton}
                        raised
                        title='Delete Contact'/>
                </View>
            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    header: {
        fontSize: 17,
        color: '#fff',
        textAlign: 'center'

    },
    formInput: {
        borderBottomWidth: 1,
        borderBottomColor: '#199187',
    },
    inputText: {
        color: '#fff',
        fontSize: 16,
        textAlign: 'center'
    },
    contentContainer: {
        backgroundColor: '#36485f',
        paddingBottom: 20,
        textAlign: 'center',
    },
    submitButton: {
        marginTop: 20,
    },
    stat: {
        fontWeight: 'bold',
        textAlign: 'center',
        color: '#172058',
        backgroundColor:'white'
    },
    buttonContainer: {
        flex: 1,
        flexDirection: 'column'
    },

});

const DetailUser = connect(null, mapDispatchToProps)(UserDetail);
export default DetailUser;