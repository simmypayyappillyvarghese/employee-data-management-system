const Table=require('./Table');
const mysql=require('mysql2/promise');

//Class for Role Table
class Role extends Table{

    constructor(connection,tableName){
        super(connection,tableName);
        this.columns=["id","title","salary","department_id"];
    }


    /*This will return title in the role table */
    
    // view(){

    //     return  mysql.createConnection(this.connection)
    //               .then(conn => conn.query(`SELECT title FROM ${this.name}`));

    // }
    

    /* This will add title ,salary and department id(fetched based on the department name) to the role table */
    add(data){

        
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