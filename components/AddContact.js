import React, {Component} from 'react';
import {StyleSheet, View, Text, TextInput} from 'react-native';
import {Avatar} from 'react-native-elements';

export default class AddContact extends Component {
    constructor(){
        super();
        this.state={
            firstName:"First Name",
            lastName:"Last Name",
            phoneNumber:"Phone Number",
            emailAddress:"Email Address",
            company:"Company",
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.image}>
                    <Avatar
                        xlarge
                        raised
                        rounded
                        icon={{name:'person-add', color:'#3e86f9'}}
                    />
                </View>
                <View style={styles.inputContainer}>
                    <View style={styles.borderBottom}>
                        <TextInput
                            value={this.state.firstName}
                            onChangeText={(text)=>this.setState({firstName:text})}/>
                    </View>
                    <View style={styles.borderBottom}>
                        <TextInput
                            value={this.state.lastName}
                            onChangeText={(text)=>this.setState({lastName:text})}/>
                    </View>
                    <View style={styles.borderBottom}>
                        <TextInput
                            value={this.state.phoneNumber}
                            onChangeText={(text)=>this.setState({phoneNumber:text})}/>
                    </View>
                    <View style={styles.borderBottom}>
                        <TextInput
                            value={this.state.emailAddress}
                            onChangeText={(text)=>this.setState({emailAddress:text})}/>
                    </View>
                    <View style={styles.borderBottom}>
                        <TextInput
                            value={this.state.company}
                            onChangeText={(text)=>this.setState({company:text})}/>
                    </View>
                </View>
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
    }
});
