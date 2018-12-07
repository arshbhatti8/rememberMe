import React, {Component} from 'react';
import {ScrollView, StyleSheet} from 'react-native';
import {Button, FormLabel, FormInput} from 'react-native-elements';
import {connect} from 'react-redux';

import {editProfileInfo} from "../actions/index";

mapDispatchToProps = (dispatch) => {
    return {
        editProfileInfo: info => dispatch(editProfileInfo(info))
    }
};

class EditProfile extends Component {
    constructor(props) {
        super(props);
        let {linkedin, instagram, facebook, emailAddress, id} = this.props.navigation.state.params;
        this.state = {
            info: {
                id: id,
                linkedin: linkedin,
                instagram: instagram,
                facebook: facebook,
                emailAddress: emailAddress
            }
        }
    }

    submitInfo = (event) => {
        event.preventDefault();
        const {info} = this.state;
        this.props.editProfileInfo(info);
    };

    render() {
        return (
            <ScrollView contentContainerStyle={styles.contentContainer}>
                <FormLabel labelStyle={styles.header}>Linkedin</FormLabel>
                <FormInput
                    value={this.state.info.linkedin}
                    onChangeText={(value) => this.setState({info: {...this.state.info, linkedin: value}})}
                    containerStyle={styles.formInput}
                    inputStyle={styles.inputText}/>
                <FormLabel labelStyle={styles.header}>Instagram</FormLabel>
                <FormInput
                    value={this.state.info.instagram}
                    onChangeText={(value) => this.setState({info: {...this.state.info, instagram: value}})}
                    containerStyle={styles.formInput}
                    inputStyle={styles.inputText}/>
                <FormLabel labelStyle={styles.header}>Facebook</FormLabel>
                <FormInput
                    value={this.state.info.facebook}
                    onChangeText={(value) => this.setState({info: {...this.state.info, facebook: value}})}
                    containerStyle={styles.formInput}
                    inputStyle={styles.inputText}/>
                <FormLabel labelStyle={styles.header}>Email Address</FormLabel>
                <FormInput
                    value={this.state.info.emailAddress}
                    onChangeText={(value) => this.setState({info: {...this.state.info, emailAddress: value}})}
                    containerStyle={styles.formInput}
                    inputStyle={styles.inputText}/>
                <Button
                    onPress={this.submitInfo}
                    containerViewStyle={styles.button}
                    raised
                    title='Submit'/>
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    headingContainer:{
      flex:1,
      flexDirection:'row',
    },
    button: {
        marginTop: 20,
    },
    contentContainer: {
        backgroundColor: '#36485f',
        paddingRight: 50,
        paddingLeft: 50,
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

const newProfile = connect(null, mapDispatchToProps)(EditProfile);
export default newProfile;