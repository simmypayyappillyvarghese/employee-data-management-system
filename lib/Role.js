const Table=require('./Table');
const mysql=require('mysql2/promise');

class Role extends Table{

    constructor(connection,tableName){
        super(connection,tableName);
        this.columns=["id","title","salary","department_id"];
    }


    view(){

        return  mysql.createConnection(this.connection)
                  .then(conn => conn.query(`SELECT title FROM ${this.name}`));

    }

    add(data){

        console.log(data);
        let [title,salary,department_name]=data;

        return  mysql.createConnection(this.connection)
                 .then(conn=>{
                    conn.query(
                    `INSERT INTO ${this.name}(${this.columns.slice(1).join(",")})
                     VALUES("${title}",${salary},(SELECT id from department where name="${department_name}"))`)
                 })
                 .catch(error=>console.log(error));

     }
}

module.exports=Role;