import React, {Component} from 'react';
import {ScrollView} from 'react-native';
import {Tile, List, ListItem} from 'react-native-elements';

class UserDetail extends Component {
    render() {
        const user = this.props.navigation.state.params;
        return (
            <ScrollView>
                <Tile
                    imageSrc={{uri: 'https://randomuser.me/api/portraits/men/65.jpg'}}
                    featured
                    title={`${user.firstName.toUpperCase()} ${user.lastName.toUpperCase()}`}
                    caption={user.emailAddress}
                />
                <List>
                    <ListItem
                        title="Email"
                        rightTitle={user.emailAddress}
                        hideChevron/>

                    <ListItem
                        title="Phone"
                        rightTitle={user.phoneNumber}
                        hideChevron
                    />
                </List>
                <List>
                    <ListItem
                        title="Company"
                        rightTitle={user.company}
                        hideChevron
                    />
                </List>

            </ScrollView>
        );

    }
}

export default UserDetail
