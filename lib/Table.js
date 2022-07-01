const mysql = require('mysql2/promise');

class Table{

     constructor(connection,tableName){

        this.name=tableName;
        this.connection=connection;
        this.columns=[];

    }


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

      update(value){

         return  mysql.createConnection(this.connection)
         .then(conn=>{
            conn.query(`UPDATE ${this.name} SET ${column_to_update} = ${value} WHERE `)
         })

      }




}

module.exports=Table;