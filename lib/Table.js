const cTable = require('console.table');
const mysql = require('mysql2/promise');

class Table{

     constructor(connection,tableName){

        this.name=tableName;
        this.connection=connection;
        this.columns=[];

    }

    /* Method will fetch the data from the table and print it in table format */

      viewAll(){

                  return  mysql.createConnection(this.connection)
                  .then(conn => conn.query(`SELECT * FROM ${this.name}`));
 
      }

      add(data){

         let [parseValue]=data;
         parseValue=`"${parseValue}"`
         return  mysql.createConnection(this.connection)
                  .then(conn=>{
                     conn.query(`INSERT INTO ${this.name}(${this.columns.slice(1).join(",")}) VALUES(${parseValue})`)
                  })

      }
      




}

module.exports=Table;