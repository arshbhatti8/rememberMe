import React from 'react';
import {FormLabel, FormInput} from 'react-native-elements';
import {View} from 'react-native';

const FormItem = (props) => {
    return (
        <View>
            <FormLabel labelStyle={props.styles.header}>{props.item}</FormLabel>
            <FormInput
                onChangeText={(event)=>props.handleInputChange(event,props.item)}
                containerStyle={props.styles.formInput}
                inputStyle={props.styles.inputText}/>
        </View>
    );

};
export default FormItem;
