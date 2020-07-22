const { Alert } = require("react-native")

const sqlExecute = async (dbConection,sqlQuery,arg,)=> {

    return new Promise((resolve, reject)=> {
        let resultSQL= [];
        let test = 'x'

        dbConection.transaction((tx)=> {
            tx.executeSql(sqlQuery,arg,(tx,results)=>{
                
                var len = results.rows.length;
                var vectorResults = []

                for(let i=0; i<len; i++){
                    let row = results.rows.item(i);
                    vectorResults.push(row)
                }
                test= 'y';
                resultSQL = [...vectorResults];

                resolve(resultSQL); /// RETURNING THE RESULTS SQL TO MY PROMISE
            }, (error)=>{
                reject(error);
            });
        });
    });

}


    
    
    
    


module.exports=sqlExecute