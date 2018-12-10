import React, {Component} from 'react';
import {Text, View, ActivityIndicator, StyleSheet, ScrollView} from 'react-native';
import axios from 'axios';

class Reminders extends Component {
    constructor() {
        super();
        this.state = {
            users: null
        }
    }

    componentDidMount() {
        axios.get('https://rememberme-api-1.herokuapp.com/contacts').then((res) => {
            let users = [];
            console.log(res.data);
            if (res.data !== undefined) {
                res.data.map((user) => {
                    if (user.keywords) {
                        users.push(user)
                    }
                });
                this.setState({users: users})
            }
        }).catch((error) => {
            console.log(error);
        });
    }

    renderRow = (user) => {
        return (
            <View style={{flex: 1, alignSelf: 'stretch', flexDirection: 'row'}}>
                <View style={styles.row}>
                    <Text style={styles.rowText}>{user.name}</Text>
                </View>
                <View style={styles.row}>
                    <Text style={styles.rowText}>{user.notes}</Text>
                </View>
            </View>
        );
    };

    render() {

        if (!this.state.users) {
            return (
                <ActivityIndicator
                    animating={true}
                    style={styles.indicator}
                    size="large"
                />
            );
        }
        if (this.state.users === undefined) {
            return <Text>No Reminders</Text>
        }
        return (
            <ScrollView style={{backgroundColor: '#36485f'}}>
                <View style={{flex: 1, flexDirection: 'row'}}>
                    <View style={{flex: 1}}>
                        <Text style={styles.headings}>Users</Text>
                    </View>
                    <View style={{flex: 2}}>
                        <Text style={styles.headings}>Reminders</Text>
                    </View>
                </View>
                {this.state.users.map((user, index) => {
                    return (
                        <View key={index} style={styles.listContainer}>
                            {this.renderRow(user)}
                        </View>
                    );
                })}
            </ScrollView>
        )

    }
}

const styles = StyleSheet.create({
    indicator: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        height: 80
    },
    headings: {
        textAlign: 'center',
        fontWeight:'bold',
        fontSize:17,
        color:'#fff',
    },
    listContainer:{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingRight:20,
        paddingLeft:20
    },
    row: {
        flex: 1,
        alignSelf: 'stretch',
        borderRadius:5,
        borderColor:'#fff',
    },
    rowText:{
        color:'#fff',
        fontWeight:'bold',
        fontSize:17,
        marginTop:8
    }
});

export default Reminders