import React, {Component} from 'react';
import {ScrollView, StyleSheet} from 'react-native';
import {Button, FormLabel, FormInput} from 'react-native-elements';
import {connect} from 'react-redux';
import {realmProfile} from '../database/schema';
import uuidv4 from 'uuid4';

import {addProfileInfo} from "../actions/index";
import {queryProfile} from "../database/schema";

mapDispatchToProps = (dispatch) => {
    return {
        addProfileInfo: info => dispatch(addProfileInfo(info))
    }
};

class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            profile: {
                id:uuidv4(),
                profileSubmitted:'false',
                linkedin: "",
                instagram: "",
                facebook: "",
                emailAddress: ""
            }
        };
        this.getData();
        realmProfile.addListener('change',()=>{
            this.getData();
        })
    }

    getData = () => {
        queryProfile().then(data => {
            const jsonData = JSON.parse(JSON.stringify(data));
            this.setState({
                profile: jsonData["0"]
            })
        }).catch((error) => {
            alert('Error occured while getting data:' + error);
        });
    };

    submitContact = (event) => {
        event.preventDefault();
        if(this.state.profile.profileSubmitted==='false'){
            if(this.state.profile.linkedin===""&&
                this.state.profile.instagram===""&&
                this.state.profile.facebook===""&&
                this.state.profile.emailAddress===""){
                alert('Please enter some info to submit');
            }
            else{
            const {profile} = this.state;
            this.props.addProfileInfo(profile);
            }

        }
        else{
            alert('If you need to edit this info, please press Edit Button');
            return 0;
        }
    };

    navigateToEditProfile=()=>{
        this.props.navigation.navigate('EditProfile', {...this.state.profile})
    };

    navigateToGenerateQR=()=>{
        this.props.navigation.navigate('GenerateQR', {...this.state.profile})
    };

    render() {
        return (
            <ScrollView contentContainerStyle={styles.contentContainer}>
                <FormLabel labelStyle={styles.header}>Linkedin</FormLabel>
                <FormInput
                    value={this.state.profile.linkedin}
                    onChangeText={(value) => this.setState({profile: {...this.state.profile, linkedin: value}})}
                    containerStyle={styles.formInput}
                    inputStyle={styles.inputText}/>
                <FormLabel labelStyle={styles.header}>Instagram</FormLabel>
                <FormInput
                    value={this.state.profile.instagram}
                    onChangeText={(value) => this.setState({profile: {...this.state.profile, instagram: value}})}
                    containerStyle={styles.formInput}
                    inputStyle={styles.inputText}/>
                <FormLabel labelStyle={styles.header}>Facebook</FormLabel>
                <FormInput
                    value={this.state.profile.facebook}
                    onChangeText={(value) => this.setState({profile: {...this.state.profile, facebook: value}})}
                    containerStyle={styles.formInput}
                    inputStyle={styles.inputText}/>
                <FormLabel labelStyle={styles.header}>Email Address</FormLabel>
                <FormInput
                    value={this.state.profile.emailAddress}
                    onChangeText={(value) => this.setState({profile: {...this.state.profile, emailAddress: value}})}
                    containerStyle={styles.formInput}
                    inputStyle={styles.inputText}/>
                <Button
                    onPress={this.submitContact}
                    containerViewStyle={styles.button}
                    raised
                    title='Submit'/>
                <Button
                    onPress={this.navigateToEditProfile}
                    containerViewStyle={styles.button}
                    raised
                    title='Edit Profile'/>
                <Button
                    onPress={this.navigateToGenerateQR}
                    containerViewStyle={styles.button}
                    raised
                    title='Generate QR'/>
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    button: {
        marginTop: 20,
    },
    contentContainer: {
        backgroundColor: '#36485f',
        paddingRight:50,
        paddingLeft:50,
        paddingBottom: 40,
    },
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
});

const profileScreen = connect(null,mapDispatchToProps)(Profile);
export default profileScreen;