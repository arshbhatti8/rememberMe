import React, { Component } from 'react';
import {StyleSheet} from 'react-native';
import QRCodeScanner from 'react-native-qrcode-scanner';

export default class ScanScreen extends Component {

    constructor(props){
        super(props);
        this.state = {
            url:"",
        };
    }

    onSuccess=(e)=> {
        console.log("Routed From:");
        console.log(this.props.navigation.state.params);
         this.props.navigation.state.params.routedFrom==='UserDetail' ? this.props.navigation.navigate('UserDetail',{url:e.data}) : this.props.navigation.navigate('AddContact',{url:e.data});
    };

    render() {
        return (
            <QRCodeScanner
                onRead={this.onSuccess}
            />
        );
    }
}

const styles = StyleSheet.create({
    centerText: {
        flex: 1,
        fontSize: 18,
        padding: 32,
        color: '#777',
    },
    textBold: {
        fontWeight: '500',
        color: '#000',
    },
    buttonText: {
        fontSize: 21,
        color: 'rgb(0,122,255)',
    },
    buttonTouchable: {
        padding: 16,
    },
});