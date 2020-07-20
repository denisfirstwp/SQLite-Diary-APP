import React from 'react'
import {View, Text, TextInput, StyleSheet} from 'react-native'


export default function (props) {


    return(
    <TextInput value={props.value} onChangeText={(value)=> props.update(value) } style={styles.textInput}  multiline={true} placeholder='Place your new diary here' />
    )
}

const styles = StyleSheet.create({
    textInput:{
        paddingTop:20,
        textAlignVertical:'top',
        marginTop:10,
        marginBottom:20,
        width:'80%',
        height:190,
        borderRadius:5,
        elevation:9,
        paddingLeft:15,
        backgroundColor:'#FFF',
        fontSize:18,
        color:'#777',        
    }
})