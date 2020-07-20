import React from 'react'
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native'
import moment from 'moment'
import Icon from 'react-native-vector-icons/FontAwesome'

export default function ListDiary (props) {

    return(
        <View style={styles.container} >
            <Text style={styles.date}>{moment(props.date).format('MMMM dddd YYYY')}</Text>
            <Text style={styles.description}>{props.description}</Text>
            <View style={{flexDirection:'row', justifyContent:'flex-end', alignItems:'center'}}>
            <Text style={{marginRight:10, fontSize:25, fontWeight:'bold', color:'#C04848'}}>{props.like}</Text>
            <Icon name='thumbs-up' color='#C04848' size={25} />
            </View>
        </View>
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