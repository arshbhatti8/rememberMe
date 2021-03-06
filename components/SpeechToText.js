import React, {Component} from 'react';
import {
    TextInput,
    Text,
    View,
    TouchableHighlight,
    Image,
    Button,
    StyleSheet,
    AppRegistry
    } from 'react-native';
import Voice from 'react-native-voice';
import Icon from 'react-native-vector-icons/MaterialIcons'


export default class UserDetailProfileScreen extends Component {
    constructor() {
        super();
        this.state = {
            recognized: '',
            pitch: '',
            error: '',
            end: '',
            started: '',
            results: [],
            partialResults: [],
            link:"http://",
        };

        Voice.onSpeechStart = this.onSpeechStart.bind(this);
        Voice.onSpeechRecognized = this.onSpeechRecognized.bind(this);
        Voice.onSpeechEnd = this.onSpeechEnd.bind(this);
        Voice.onSpeechError = this.onSpeechError.bind(this);
        Voice.onSpeechResults = this.onSpeechResults.bind(this);
        Voice.onSpeechPartialResults = this.onSpeechPartialResults.bind(this);
        Voice.onSpeechVolumeChanged = this.onSpeechVolumeChanged.bind(this);
    }

    componentWillReceiveProps(nextProps){
        const url= nextProps.navigation.state.params.url;
        console.log(url);
        this.setState({
            ...this.state,
            link:url
        })
    }

    onSpeechStart(e) {
        this.setState({
            started: '√',
        });
    }

    onSpeechRecognized(e) {
        this.setState({
            recognized: '√',
        });
    }

    onSpeechEnd(e) {
        this.setState({
            end: '√',
        });
    }

    onSpeechError(e) {
        this.setState({
            error: JSON.stringify(e.error),
        });
    }

    onSpeechResults(e) {
        this.setState({
            results: e.value,
        });
    }

    onSpeechPartialResults(e) {
        this.setState({
            partialResults: e.value,
        });
    }

    onSpeechVolumeChanged(e) {
        this.setState({
            pitch: e.value,
        });
    }

    async _startRecognizing(e) {
        this.setState({
            recognized: '',
            pitch: '',
            error: '',
            started: '',
            results: [],
            partialResults: [],
            end: ''
        });
        try {
            await Voice.start('en-US');
        } catch (e) {
            console.error(e);
        }
    }

    async _stopRecognizing(e) {
        try {
            await Voice.stop();
        } catch (e) {
            console.error(e);
        }
    }

    async _cancelRecognizing(e) {
        try {
            await Voice.cancel();
        } catch (e) {
            console.error(e);
        }
    }


    render() {

        const {params} = this.props.navigation.state;
        const name = params ? params.name: null;
        let image;
        if(name=='obama'){
            image = <Image  style={styles.profileImage} source={require('../assets/images/obama.jpg')}/>
        }
        else{
            image = <Image style={styles.profileImage} source={require('../assets/images/sanders.jpg')}/>
        }
        return (
            <View style={styles.container}>
                <View style={styles.body}>
                    {image}
                    <Text style={styles.link}>
                        Link:
                    </Text>
                    <TextInput value={this.state.link}/>
                    <Button
                        title="Press to scan QR"
                        onPress={()=>this.props.navigation.navigate('Camera')}/>
                    <TouchableHighlight
                        style={styles.mic}
                        onPress={this._startRecognizing.bind(this)}>
                        <Icon name='keyboard-voice' size={70}>
                        </Icon>
                    </TouchableHighlight>
                    <Text style={styles.welcome}>
                       Press button to start recording notes
                    </Text>
                    <TouchableHighlight
                        style={styles.mic}
                        onPress={this._stopRecognizing.bind(this)}>
                        <Icon name='done' size={70}>
                        </Icon>
                    </TouchableHighlight>
                    <Text style={styles.instructions}>
                        Press done after you're done.
                    </Text>
                    <View style={styles.results}>
                        <Text
                            style={styles.stat}>
                            Transcript:
                        </Text>
                        {this.state.partialResults.map((result, index) => {
                            return (
                                <Text
                                    key={`partial-result-${index}`}
                                    style={styles.stat}>
                                    {result}
                                </Text>
                            )
                        })}
                    </View>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5FCFF',
    },
    body:{
        height:200,
        alignItems:'center',
        marginTop:40,
    },
    link:{

    },
    mic:{
        marginTop:20,
    },
    insights:{
        backgroundColor:'#E5E5E5',
        height:50,
        width:250,
        elevation:4,
        marginTop:20,
        justifyContent:'space-between',
        flexDirection:'row',
        alignItems:'center',
    },
    results:{
        backgroundColor:'#E5E5E5',
        height:50,
        width:250,
        elevation:4,
        marginTop:20,
        alignItems:'center',
    },
    profileImage:{
        width:70,
        height:100
    },
    stat: {
        textAlign: 'center',
        color: '#B0171F',
        marginBottom: 1,
        marginLeft:2,
    },
    button: {
        width: 50,
        height: 50,
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
    action: {
        textAlign: 'center',
        color: '#0000FF',
        marginVertical: 5,
        fontWeight: 'bold',
    },
    instructions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5,
    },


});

AppRegistry.registerComponent('ProfileScreen', () => ProfileScreen);