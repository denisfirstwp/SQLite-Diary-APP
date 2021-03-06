import React, { Component, Fragment } from 'react'
import {View, StyleSheet, Text, Alert, SafeAreaView, FlatList, LogBox} from 'react-native'
import LinearGradient from 'react-native-linear-gradient'
import SQLite from 'react-native-sqlite-storage'

import TextBox from './components/TextBox'
import ListDiary from './components/ListDiary'
import ActionButton from './components/ActionButton'
import sqlExecute from './my_exports/sqlExecute'

import vectors from './vectors'

const diarys = [...vectors]

let db

const initialState = {
    inputValue:'',
    list:[],
    sorted: true
}

export default class Main extends Component {

    state = {
        ...initialState
    }

    constructor(props){
        super(props)

        db = SQLite.openDatabase({name:'diarys_db', createFromLocation:2}, this.successConection, this.badConnection);
        //console.disableYellowBox= true;
        LogBox.ignoreAllLogs();
        console.warn= () =>{};
    }

    successConection = () => {

        
        db.transaction((tx)=>{
            tx.executeSql('CREATE TABLE "tbl_diarys" ( "id"	INTEGER, "date"	TEXT, "description"	TEXT, "likes" INTEGER, PRIMARY KEY("id" AUTOINCREMENT));', [], (tx,results =>{
                Alert.alert('', 'All the records were deleted !')
                console.log(results)
            }),(error)=> {console.log(error)})
        }) 

         this.loadList()
        
    }

    badConnection = (error) =>{

        Alert.alert('Ops, Something went wrong !', `${error}`)
    }

    actionInsertnewDiary = async () =>{

       await db.transaction((tx)=>{
            tx.executeSql("INSERT INTO tbl_diarys (date, 'description', 'likes') VALUES (?,?,?)", [`${new Date()}`, this.state.inputValue, 0], (tx,results =>{
            }),(error)=> {console.log(error)})
        })        

        this.loadList();
        this.setState({inputValue:''})
        

    }

    actionSortDiary = () => {

         this.setState({sorted: !this.state.sorted}, this.loadList)

        
    }

    askForDeleteDiary = (id) => {
        
        Alert.alert('Warning !', 'You are about to delete you diary record ! Are you sure you want to do this ?', 
        [{
            text:"No i don't want to delete !",
            onPress: ()=> this.loadList(),
            style: 'cancel'
        },
        {
            text:"Yes i want to delete !",
            onPress:()=> this.deletingDiary(id),
            style:'default'
        }
        ])
     }




    deletingDiary = async (id) => {
        db.transaction(async (tx)=>{
            
         await tx.executeSql("DELETE FROM tbl_diarys WHERE id=? ", [id], (tx,results =>{
                console.log(results)
            }),(error)=> {console.log(error)})
        })       

        
        this.loadList();     

        }

    actionDeleteAllDiary = async () => {


        Alert.alert(
            'Warning !',
            'This option will delete all of your diary records, Do you want to proceed ?',
            [
                {
                    text:'Cancel',
                    onPress: () =>false,
                    style: 'cancel'
                },
                {
                    text:'Yes, delete everything !',
                    onPress: () => deleteAllRecords(),
                    style:'default' 
                }
            ]
        )

        const deleteAllRecords = async ()=>{
        await db.transaction((tx)=>{
            tx.executeSql("DELETE FROM tbl_diarys", [], (tx,results =>{
                Alert.alert('', 'All the records were deleted !')
                console.log(results)
            }),(error)=> {console.log(error)})
        })       
        this.loadList();
        this.setState({inputValue:''})
    } 
    
        
    }

    updateInput = (value) => {

       this.setState({inputValue:value})

    }

    addLike = async (id) => {
        let likes
        //Using my promise

       await sqlExecute(db,'SELECT * FROM tbl_diarys WHERE id=?',[id]).then((item)=>{
            
          likes= item[0].likes


        }).catch((error)=>{
            Alert.alert('Some error had happened');
            console.log(error)
        })

        likes = likes + 1 // adding more one number to likes

        await sqlExecute(db, 'UPDATE tbl_diarys SET likes = ? WHERE id= ? ',[likes,id]).then((item)=>{
            console.log('Sucess ')
        }).catch((error)=>{
            Alert.alert('Some error had happened')
            console.log(error)
        })



        this.loadList();

    }

    loadList = () => {
        
      

        if(this.state.sorted === false) {
            //Alert.alert('entro aqui')
        db.transaction((tx)=>{
            tx.executeSql("SELECT * FROM tbl_diarys",[], (tx,results) =>{
                
              var len = results.rows.length;
              var vector = []

              for (let i = 0; i < len; i++) {
                  let row = results.rows.item(i);
                  vector.push(row)
                  }
                  this.setState({list: [...vector]})
            }),(error)=> {console.log(error)}
        })
    }else if (this.state.sorted===true){
        db.transaction((tx)=>{
            tx.executeSql("SELECT * FROM tbl_diarys ORDER BY id DESC",[], (tx,results) =>{
                
              var len = results.rows.length;
              var vector = []

              for (let i = 0; i < len; i++) {
                  let row = results.rows.item(i);
                  vector.push(row)
                  }
                  this.setState({list: vector})
            }),(error)=> {console.log(error)}
        })

    }

    }
  

    render(){
        return(

            <LinearGradient style={{flexGrow:1}} colors={['#C04848','#480048']}>

             <SafeAreaView style={styles.container} >
                <Text style={styles.title}>Diarys SQLite</Text>
                <TextBox update={this.updateInput} value={this.state.inputValue} />
                <View style={{flexDirection:'row', justifyContent:'space-around', width:'80%', marginBottom:15} }>
                <ActionButton icon='plus' action={this.actionInsertnewDiary} />
                <ActionButton icon='sort' action={this.actionSortDiary}  />
                <ActionButton icon='trash' action={this.actionDeleteAllDiary} />
                </View>
                <FlatList 
                style={{height:0}}
                data={this.state.list}
                keyExtractor={(item)=> `${item.id}` }
                renderItem={({item})=>  <ListDiary onLike={this.addLike} exclude={this.deletingDiary} {...item} />} 
                />
                

             </SafeAreaView>
             
           
            
            </LinearGradient>
           
            
         
           
        )
    }

}

const styles = StyleSheet.create({

    container:{
        flexGrow:1,
        width:'100%',
        paddingTop:20,
        alignItems:'center'
    },
    title:{
        color:'#FFF',
        fontSize:25,
        textAlignVertical:'center',
        fontWeight:'bold'
    }

})