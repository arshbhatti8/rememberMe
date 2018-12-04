import React, {Component} from 'react';
import {StyleSheet, View, TextInput, Button, ScrollView} from 'react-native';
import {Avatar, Tile, List, ListItem} from 'react-native-elements';
import {connect} from 'react-redux';
import uuidv4 from 'uuid4';

import {addContact} from "../actions/index";


const mapDispatchToProps = dispatch => {
    return {
        addContact: user => dispatch(addContact(user))
    };
};

class AddContact extends Component {

    constructor() {
        super();
        this.props!==undefined ? this.state = {
            user: this.props.navigation.state.params
        } : this.state = {
            user: {
                id: uuidv4(),
                name: 'Full Name',
                phoneNumber: "Phone Number",
                emailAddress: "Email Address",
                company: "Company",
                linkedin: 'Linkedin',
                instagram: 'instagram',
                facebook: 'facebook',
                notes:'notes'
            }
        }
    }

    componentWillReceiveProps(nextProps){
        const user= nextProps.navigation.state.params;
        this.setState({
            ...this.state,
            user:user
        })
    }

    submitContact = (event) => {
        event.preventDefault();
        const {user} = this.state;
        this.props.addContact(user);
    };

    render() {
        return (
            <ScrollView>
                <Tile
                    imageSrc={{uri: 'https://randomuser.me/api/portraits/men/65.jpg'}}
                    featured
                    title={`${this.state.user.name.toUpperCase()}`}
                    caption={this.state.user.emailAddress}
                >
                </Tile>
                <List>
                    <ListItem
                        title="Email"
                        rightTitle={this.state.user.emailAddress}
                        hideChevron/>

                    <ListItem
                        title="Phone"
                        rightTitle={this.state.user.phoneNumber}
                        hideChevron
                    />
                </List>
                <List>
                    <ListItem
                        title="Company"
                        rightTitle={this.state.user.company}
                        hideChevron
                    />
                </List>
                <List>
                    <ListItem
                        title="LinkedIn"
                        rightTitle={this.state.user.linkedin}
                        hideChevron
                    />
                    <ListItem
                        title="Instagram"
                        rightTitle={this.state.user.instagram}
                        hideChevron
                    />
                    <ListItem
                        title="Facebook"
                        rightTitle={this.state.user.facebook}
                        hideChevron
                    />
                </List>
            </ScrollView>

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
    submitButton: {
        marginTop: 5,
    }
});

const ContactPage = connect(null, mapDispatchToProps)(AddContact);
export default ContactPage;