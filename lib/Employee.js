const Table=require('./Table');
const mysql = require('mysql2/promise');

class Employee  extends Table{

    constructor(connection,tableName){
        super(connection,tableName);
        this.columns=["id","first_name","last_name","role_id","manager_id"];
    }

    viewCombinedData(roleTable,departmentTable){

        const role=roleTable.name;
        const department=departmentTable.name;

        return  mysql.createConnection(this.connection)
           .then(
            conn =>
             conn.query(`select E.id as "Employee Id",E.first_name as "First Name",E.last_name as "Last Name",R.title as "Title",R.salary as "Salary",
             D.name as "Department Name",
             concat(M.first_name," ",M.last_name ) as "Manager"
             from 
             ${this.name} E 
             LEFT JOIN 
             ${role} R ON
             E.role_id=R.id 
             LEFT JOIN
             ${department} D ON
             D.id=R.department_id 
             LEFT JOIN
             ${this.name} M ON
             E.manager_id=M.id`));
    }

    add(data){
/*employee’s first name, last name, role, and manager */
        console.log(data);
        let [first_name,last_name,role_name,manager_name]=data;

        return  mysql.createConnection(this.connection)
                 .then(conn=>{
                    conn.query(
                    `INSERT INTO ${this.name}(${this.columns.slice(1).join(",")}) VALUES("${first_name}","${last_name}",(SELECT id from role where title="${role_name}"),(SELECT id from employee as E where E.first_name="${manager_name.split(" ")[0]}" AND E.last_name="${manager_name.split(" ")[1]}"))`)
                 })
                 .catch(error=>console.log(error));

     }

     updateEmployeeByRole(employeeName,roleName){

        return  mysql.createConnection(this.connection)
        .then(conn=>{
           conn.query(`UPDATE ${this.name} SET role_id = (select id from role where title="${roleName}") WHERE employee.first_name= "${employeeName.split(" ")[0]}" AND employee.last_name= "${employeeName.split(" ")[1]}"`)
        })
        .catch(error=>console.log(error));

     }
}

module.exports=Employee;