import React, {Component} from 'react';
import {View, StyleSheet, FlatList, ActivityIndicator, TouchableOpacity} from 'react-native';
import {ListItem, SearchBar} from 'react-native-elements';
import {realmUser} from '../database/schema';

import {queryAllUsers} from "../database/schema";

class NewList extends Component {
    constructor() {
        super();
        this.state = {
            users: null
        };
        this.getData();
        realmUser.addListener('change',()=>{
            this.getData();
        })
    }

    getData = () => {
        queryAllUsers().then(data => {
            this.setState({
                users: data
            })
        }).catch((error) => {
            alert('Error occured while adding' + error);
        });
    };

    componentDidMount() {
        this.getData();
    }

    renderSeparator = () => {
        return (
            <View
                style={{
                    height: 1,
                    width: '86%',
                    backgroundColor: '#CED0CE',
                    marginLeft: '14%'
                }}
            />
        );
    };

    renderHeader = () => {
        return (
            <SearchBar placeholder="Type Here..." lightTheme round/>
        );
    };

    renderFooter = () => {
        if (!this.state.loading) return null;
        return (
            <View style={{paddingVertical: 20, borderTopWidth: 1, borderTopColor: '#CED0CE'}}>
                <ActivityIndicator animating size="large"/>
            </View>);
    };

    navigateToDetails = (user) => {
        this.props.navigation.navigate('UserDetail', {...user})
    };

    render() {
        if(!this.state.users){
            return <ActivityIndicator
                animating={true}
                style={styles.indicator}
                size="large"
            />
        }
        return (
            <View style={styles.mainContainer}>
                <View style={[styles.mainContainer, styles.list]}>
                    <FlatList
                        automaticallyAdjustContentInsets={false}
                        contentInset={{bottom: 49}}
                        data={this.state.users}
                        renderItem={({item}) => (
                            <TouchableOpacity onPress={() => this.navigateToDetails(item)}>
                                <ListItem
                                    roundAvatar
                                    title={`${item.name}`}
                                    subtitle={item.company}
                                    avatar={{uri: 'https://randomuser.me/api/portraits/men/65.jpg'}}
                                    containerStyle={{borderBottomWidth: 0}}
                                />
                            </TouchableOpacity>
                        )}
                        keyExtractor={(item) => item.id}
                        ItemSeparatorComponent={this.renderSeparator}
                        ListHeaderComponent={this.renderHeader}
                        ListFooterComponent={this.renderFooter}
                    />
                </View>
            </View>
        )
    };
}

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
    },
    list: {
        flex: 8
    },
    footer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-around'
    },
    indicator: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        height: 80
    }
});


export default NewList;
