import React from 'react'
import {View, Text, StyleSheet, TouchableOpacity, Alert} from 'react-native'
import moment from 'moment'
import Icon from 'react-native-vector-icons/FontAwesome'
import LinearGradient from 'react-native-linear-gradient'

import Swipeable from 'react-native-gesture-handler/Swipeable'


export default function ListDiary (props) {


    const renderzin = () => {

        return(
            <TouchableOpacity style={{width:'75%', flexDirection:'row'}} onPress={()=> {props.exclude && props.exclude(props.id)}}>
            <LinearGradient  start={{ x: 0, y: 1 }} end={{ x: 1, y: 1 }} style={{
                paddingRight:20,
                borderTopRightRadius:6,
                borderBottomRightRadius:6,
                width:'100%',                 
                flexDirection:'row',
                justifyContent:'flex-end',
                alignItems:'center',
                height:'88%'}} 
                colors={['#C04848','#e60']}>
                <Text style={{color:'#FFF',
                fontSize:20, fontWeight:'bold'}}>
                    DELETE DIARY
                </Text>
                <Icon name='trash' color='#FFF' size={35} style={{marginLeft:20}} />
            </LinearGradient>
            </TouchableOpacity>
       )
    }

    return(
        <Swipeable
        renderRightActions={renderzin}
        >
        <View style={styles.container} >
            <Text style={styles.date}>{moment(props.date).format('dddd MMMM DD YYYY')}</Text>
            <Text style={styles.description}>{props.description}</Text>
            <View style={{flexDirection:'row', justifyContent:'flex-end', alignItems:'center'}}>
            <Text style={{marginRight:10, fontSize:25, fontWeight:'bold', color:'#C04848'}}>{props.like}</Text>
            <Icon name='thumbs-up' color='#C04848' size={25} />
            </View>
        </View>
        </Swipeable>
    )
}

const styles = StyleSheet.create({

    container:{

        paddingVertical:15,
        paddingHorizontal:20,
        paddingBottom:10,
        backgroundColor:'#FFF',
        width:300,
        marginBottom:15,
        borderRadius:6,
        elevation:9
    },
    date:{
        fontWeight:'bold',
        color:'#777',
        paddingLeft:10
    },
    description:{
        marginTop:5
    }
})