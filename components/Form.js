import React, {Component} from 'react';
import {StyleSheet, ScrollView, View} from 'react-native';
import { Button} from 'react-native-elements';
import {connect} from 'react-redux'
import uuidv4 from 'uuid4';

import FormItem from './FormItem';
import {addContact} from "../actions/index";

const mapDispatchToProps = dispatch => {
    return {
        addContact: user => dispatch(addContact(user))
    };
};

class RenderForm extends Component  {
    constructor() {
        super();
        this.state = {
            user: {
                id: uuidv4(),
                name: 'Name',
                phoneNumber: 'Phone Number',
                emailAddress: 'Email Address',
                company: 'Company',
                linkedin: 'Linkedin',
                instagram: 'Instagram',
                facebook: 'Facebook',
                notes: 'Notes',
            }
        }
    }

    handleInputChange=(text,item)=>{
      this.stateChange(text,item);
    };

    componentWillReceiveProps(nextProps) {
        console.log('Next Props: ');
        console.log(nextProps);
        const user = nextProps.navigation.state.params;
        this.setState({
            ...this.state,
            user: user
        })
    }

    camelize(str){
        return str.replace(/(?:^\w|[A-Z]|\b\w)/g, function(letter, index) {
            return index === 0 ? letter.toLowerCase() : letter.toUpperCase();
        }).replace(/\s+/g, '');
    }

    stateChange=(text,reference)=>{
        let stateKey = this.camelize(reference);
        this.setState({
            ...this.state,
            user:{...this.state.user,
                [stateKey]:text}
        });
    };

    submitContact = (event) => {
        event.preventDefault();
        const {user} = this.state;
        this.props.addContact(user);
    };

    render(){
        const labels=['Name','Phone Number','Email Address','Company'
            ,'Linkedin', 'Instagram', 'Facebook', 'Notes'];
        return (
            <ScrollView contentContainerStyle={styles.contentContainer}>
                {labels.map((item,index)=>(
                    <View key={index}>
                        <FormItem
                            item={item}
                            styles={styles}
                            handleInputChange={this.handleInputChange}/>
                    </View>
                ))}
                <Button
                    onPress={this.submitContact}
                    containerViewStyle={styles.submitButton}
                    raised
                    title='Submit'/>
            </ScrollView>
        );
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
        marginTop: 20,
    },
    contentContainer:{
        backgroundColor:'#36485f',
        paddingRight:60,
        paddingBottom:20,
    },
    header:{
        fontSize:17,
        color:'#fff'
    },
    formInput:{
        borderBottomWidth:1,
        borderBottomColor:'#199187',
    },
    inputText:{
        color:'#fff',
        fontSize:16
    },
});

const Form = connect(null, mapDispatchToProps)(RenderForm);
export default Form;