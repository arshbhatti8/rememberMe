import React, {Component} from 'react';
import {Text, View, ActivityIndicator, StyleSheet, ScrollView, Linking} from 'react-native';
import {Button} from 'react-native-elements';
import axios from 'axios';
import RNCalendarEvents from 'react-native-calendar-events'


class Reminders extends Component {
    constructor() {
        super();
        this.state = {
            users: null
        }
    }

    componentDidMount() {
        axios.get('https://rememberme-api-1.herokuapp.com/contacts').then((res) => {
            console.log(res.data);
            let users = [];
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
        RNCalendarEvents.authorizeEventStore()
            .then((out) => {
                if(out === 'authorized') {
                    // set the new status to the auth state
                    this.setState({ cal_auth: out })
                }
            })
            .catch(error => console.warn('Auth Error: ', error));
    }

    addToCalendar=(user)=>{
        const {keywords}=user;
        const startDate= '2018-12-11T17:26:00.000Z';
        const endDate= '2018-12-11T19:26:00.000Z';
        RNCalendarEvents.saveEvent(`${user.notes}`, {
            location:'Our Awesome Place City, State',
            notes: `Event with :${user.name}, contact them at ${user.phoneNumber}`,
            startDate:startDate,
            endDate:endDate,
            calendar: ['Calendar'],
            alarm: [{
                date:-1
            }],
        })
            .then(id => {
                alert('Event added to Calendar!');
            }).catch(error => console.log('Save Event Error: ',error));
    };

    renderRow = (user) => {
        return (
            <View style={{flex: 1, alignSelf: 'stretch', flexDirection: 'row'}}>
                <View style={styles.row}>
                    <Text style={styles.rowText}>{user.name}</Text>
                </View>
                <View style={styles.row}>
                    <Text style={styles.rowText}>{user.notes}</Text>
                </View>
                <View style={styles.row}>
                    <Button
                    onPress={()=>this.addToCalendar(user)}
                    containerViewStyle={styles.button}
                    raised
                    title='Add to Calendar'/>
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
                    <View style={{flex: 2}}>
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
        fontWeight:'bold',
        fontSize:17,
        color:'#fff',
    },
    listContainer:{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingRight:20,
    },
    row: {
        flex: 1,
        alignSelf: 'stretch',
        paddingTop:5,
    },
    rowText:{
        color:'#fff',
        fontWeight:'bold',
        fontSize:17,
        marginTop:8
    }
});

export default Reminders;