import React from 'react';
import {Text,View} from 'react-native';
import {connect} from 'react-redux';

const mapStateToProps = state =>{
    return {user:state.user}
};

const NewList = ({user}) => {
    console.log(user);
    return (
        <View>
            <Text>
                {user.firstName}
            </Text>
        </View>
    );

};

const List = connect(mapStateToProps)(NewList);
export default List;
