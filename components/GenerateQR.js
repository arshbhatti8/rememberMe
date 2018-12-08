import React, {Component} from 'react';
import {StyleSheet, View, Text, ScrollView} from 'react-native';
import QRCode from 'react-native-qrcode';
import {CheckBox} from 'react-native-elements';


export default class HomeScreen extends Component {
    constructor(props){
        super(props);
        const {name,phoneNumber,linkedin,instagram,facebook,emailAddress}=this.props.navigation.state.params;
        this.state = {
            qr:{
                text: '',
                name:name,
                linkedin:linkedin,
                instagram:instagram,
                facebook:facebook,
                emailAddress:emailAddress,
                phoneNumber:phoneNumber,
                nameFlag:false,
                linkedinFlag:false,
                instagramFlag:false,
                facebookFlag:false,
                emailAddressFlag:false,
                phoneNumberFlag:false,
            },

        };
    }

    addName=(event)=> {
        event.preventDefault();
        const regex = /(,[A-Z])\w+\s*\w*/g;
        if (!this.state.qr.nameFlag) {
            this.setState({
                qr:
                    {
                        ...this.state.qr,
                        nameFlag: !this.state.qr.nameFlag,
                        text: `${this.state.qr.text},${this.state.qr.name}`
                    }
            })
        }
        else {
            let text = '';
            this.state.qr.text===''?
                text = this.state.qr.text.replace
                (regex, ',') :
                text = this.state.qr.text.replace
                (regex, '');
            this.setState({
                qr:
                    {
                        ...this.state.qr,
                        nameFlag: !this.state.qr.nameFlag,
                        text: text
                    }
            })
        }
    };

    addLinkedin=(event)=> {
        event.preventDefault();
        const regex = /,https?:\/\/(www\.)?linkedin.com\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g;
        if (!this.state.qr.linkedinFlag) {
            this.setState({
                qr:
                    {
                        ...this.state.qr,
                        linkedinFlag: !this.state.qr.linkedinFlag,
                        text: `${this.state.qr.text},${this.state.qr.linkedin}`
                    }
            })
        }
        else {
            let text = '';
            this.state.qr.text===''?
            text = this.state.qr.text.replace
            (regex, ',') :
                text = this.state.qr.text.replace
                (regex, '');
            this.setState({
                qr:
                    {
                        ...this.state.qr,
                        linkedinFlag: !this.state.qr.linkedinFlag,
                        text: text
                    }
            })
        }
    };

    addInstagram=(event)=> {
        event.preventDefault();
        const regex = /,https?:\/\/(www\.)?instagram.com\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g;
        if (!this.state.qr.instagramFlag) {
            this.setState({
                qr:
                    {
                        ...this.state.qr,
                        instagramFlag: !this.state.qr.instagramFlag,
                        text: `${this.state.qr.text},${this.state.qr.instagram}`
                    }
            })
        }
        else {
            let text = '';
            this.state.qr.text===''?
                text = this.state.qr.text.replace
                (regex, ',') :
                text = this.state.qr.text.replace
                (regex, '');
            this.setState({
                qr:
                    {
                        ...this.state.qr,
                        instagramFlag: !this.state.qr.instagramFlag,
                        text: text
                    }
            })
        }
    };

    addFacebook=(event)=> {
        event.preventDefault();
        const regex = /,https?:\/\/(www\.)?facebook.com\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g;
        if (!this.state.qr.facebookFlag) {
            this.setState({
                qr:
                    {
                        ...this.state.qr,
                        facebookFlag: !this.state.qr.facebookFlag,
                        text: `${this.state.qr.text},${this.state.qr.facebook}`
                    }
            })
        }
        else {
            let text = '';
            this.state.qr.text===''?
                text = this.state.qr.text.replace
                (regex, ',') :
                text = this.state.qr.text.replace
                (regex, '');
            this.setState({
                qr:
                    {
                        ...this.state.qr,
                        facebookFlag: !this.state.qr.facebookFlag,
                        text: text
                    }
            })
        }
    };

    addEmail=(event)=> {
        event.preventDefault();
        const regex = /,\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+/g;
        if (!this.state.qr.emailAddressFlag) {
            this.setState({
                qr:
                    {
                        ...this.state.qr,
                        emailAddressFlag: !this.state.qr.emailAddressFlag,
                        text: `${this.state.qr.text},${this.state.qr.emailAddress}`
                    }
            })
        }
        else {
            let text = '';
            this.state.qr.text===''?
                text = this.state.qr.text.replace
                (regex, ',') :
                text = this.state.qr.text.replace
                (regex, '');
            this.setState({
                qr:
                    {
                        ...this.state.qr,
                        emailAddressFlag: !this.state.qr.emailAddressFlag,
                        text: text
                    }
            })
        }
    };

    addPhoneNumber=(event)=> {
        event.preventDefault();
        const regex = /,\d+/g;
        if (!this.state.qr.phoneNumberFlag) {
            this.setState({
                qr:
                    {
                        ...this.state.qr,
                        phoneNumberFlag: !this.state.qr.phoneNumberFlag,
                        text: `${this.state.qr.text},${this.state.qr.phoneNumber}`
                    }
            })
        }
        else {
            let text = '';
            this.state.qr.text===''?
                text = this.state.qr.text.replace
                (regex, ',') :
                text = this.state.qr.text.replace
                (regex, '');
            this.setState({
                qr:
                    {
                        ...this.state.qr,
                        phoneNumberFlag: !this.state.qr.phoneNumberFlag,
                        text: text
                    }
            })
        }
    };

    render() {
        return (
            <ScrollView contentContainerStyle={styles.contentContainer}>
                <CheckBox
                    title='Name'
                    onPress={this.addName}
                    checked={this.state.qr.nameFlag}
                />
                <CheckBox
                    title='Linkedin'
                    onPress={this.addLinkedin}
                    checked={this.state.qr.linkedinFlag}
                />
                <CheckBox
                    title='Instagram'
                    onPress={this.addInstagram}
                    checked={this.state.qr.instagramFlag}
                />
                <CheckBox
                    title='Facebook'
                    onPress={this.addFacebook}
                    checked={this.state.qr.facebookFlag}
                />
                <CheckBox
                    title='Email Address'
                    onPress={this.addEmail}
                    checked={this.state.qr.emailAddressFlag}
                />
                <CheckBox
                    title='Phone Number'
                    onPress={this.addPhoneNumber}
                    checked={this.state.qr.phoneNumberFlag}
                />
                <View style={styles.qrContainer}>
                    <View style={styles.qr}>
                        <QRCode
                            value={this.state.qr.text}
                            size={200}
                            bgColor='#172058'
                            fgColor='white'
                        />
                    </View>
                </View>
                <Text>{this.state.qr.text}</Text>
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    contentContainer: {
        backgroundColor: '#36485f',
        paddingRight: 50,
        paddingLeft: 50,
        paddingBottom: 40,
    },
    navBar:{
        height:50,
        backgroundColor:'white',
        elevation:3,
        flexDirection:'row',
        justifyContent:'space-around',
        alignItems:'center',

    },
    body:{
        flex:1
    },
    qrContainer:{
        marginTop:30,
        height:300,
        backgroundColor:'white',
        elevation:10,
        alignItems:'center',
    },
    qr:{
        marginTop:30,
    },
    tabBar:{
        backgroundColor:'white',
        height:60,
        borderColor:'#E5E5E5',
        borderTopWidth:0.5,
        flexDirection:'row',
        justifyContent:'space-around',

    },
    tabItem:{
        alignItems:'center',
        justifyContent:'center',
    },
    tabTitle:{
        fontSize:11,
        color:'#3c3c3c',

    }

});
