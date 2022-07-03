const mysql = require('mysql2/promise');

// Generic Table class
class Table{

     constructor(connection,tableName){

        this.name=tableName;
        this.connection=connection;
        this.columns=[];

    }

    
      /* Return all the column from the table */
      viewAll(){

                  return  mysql.createConnection(this.connection)
                  .then(conn => conn.query(`SELECT * FROM ${this.name}`));
 
      }

      /* Add the passed data into the table */
      add(data){

         let [parseValue]=data;
         parseValue=`"${parseValue}"`
         return  mysql.createConnection(this.connection)
                  .then(conn=>{
                     conn.query(`INSERT INTO ${this.name}(${this.columns.slice(1).join(",")}) VALUES(${parseValue})`)
                  })

      }

      /* Update the column of the table with the passed value */
      update(value){

         return  mysql.createConnection(this.connection)
         .then(conn=>{
            conn.query(`UPDATE ${this.name} SET ${column_to_update} = ${value} WHERE `)
         })

      }




}

module.exports=Table;