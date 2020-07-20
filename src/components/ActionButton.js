import React from 'react'
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'

export default function (props) {


    return(
        <TouchableOpacity onPress={props.action}>
           <View style={styles.container}>
               <Icon name={props.icon} color='#C04848' size={25} />
           </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({

    container :{
        justifyContent:'center',
        alignItems:'center',
        width:70,
        height:35,
        borderRadius:6,
        elevation:9,
        marginTop:5,
        marginBottom:5,
        backgroundColor:'#FFF',
    }
})