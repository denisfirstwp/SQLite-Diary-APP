import React from 'react'
import {View, TouchableOpacity} from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'

export default function AddDiary () {

    return(
        
        <View style={{
            position:'absolute',
            bottom:30,
            right:30,
            height:65,
            width:65,
            backgroundColor:'#C04848',
            elevation:9,
            zIndex:62,
            borderRadius:35,
            justifyContent:'center',
            alignItems:'center'
        }}>

              <Icon name='plus' size={40} color='#FFF' /> 
        </View>
        
    )
}