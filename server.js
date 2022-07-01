const inquirer=require('inquirer');
const mysql=require('mysql2');
const cTable = require('console.table');
const Department=require('./lib/Department.js');
const Role=require('./lib/Role.js');
const Employee=require('./lib/Employee.js');

const connection=
    {
        host:"localhost",
        user:"root",
        database:"employee_db",
        password:"Simmy@88"
    }

let department=new Department(connection,"department");
let role=new Role(connection,"role");
let employee=new Employee(connection,"employee");


/*Prompt Modules and Questions for the main menu */

const prompt=inquirer.createPromptModule();
let listQuestion=
[
    {
        type:'list',
        message:'What would you like to do ?',
        name:'choiceList',
        choices:["View All Departments","View All Roles","View All Employees",
                 "Add a Department","Add a Role","Add an Employee"
                 ,"Update an Employee Role","Quit"]
    }
];


/*Prompt Modules and Questions for Adding the Department*/

const addDepartmentPrompt=inquirer.createPromptModule();
let addDepQuestion=[

  {
    type:"input",
    message:"What is the name of the department ",
    name:"depName"
  }

]

/*Prompt Modules and Questions for Adding the Role*/

const addRolePrompt=inquirer.createPromptModule();
let addRoleQuestion=[

  {
    type:"input",
    message:"What is the name of the role ? ",
    name:"roleName"
  },
  {
    type:"number",
    message:"What is the salary of the role ?",
    name:"salary"

  },

  {
    type:"list",
    message:"Which department does the role belong to ? ",
    name:"departmentName",
    choices:viewDepartments
  }
]


async function viewDepartments(){
     
  const[rows,fields]= await department.viewAll();
  return rows;

}



/*Prompt Modules and Questions for Adding the Employee*/

const addEmployeePrompt=inquirer.createPromptModule();
let addEmployeeQuestion=[
  {
    type:"input",
    message:"What is the employee's first name ? ",
    name:"firstName"
  },
  {
    type:"input",
    message:"What is the employee's last name ? ",
    name:"lastName"
  },
  {
    type:"list",
    message:"What is the employee's role ? ",
    name:"roleName",
    choices:viewRoles
  },
  {
    type:"list",
    message:"Who is the employee's manager ? ",
    name:"managerName",
    choices:viewEmployees
  }


];

async function viewRoles(){
     
  const[rows,fields]= await role.viewAll();
  let titles=[]
  rows.forEach((row)=>titles.push(row.title))
  return titles;

}

async function viewEmployees(){

  const[rows,fields]= await employee.viewAll();
  let managerNames=[]
  rows.forEach((row)=>managerNames.push(row.first_name+" "+row.last_name))
  return managerNames;
}



/* select an employee to update and their new role and this information is updated in the database */
const updateEmployeePrompt=inquirer.createPromptModule();
let updateEmployeeQuestion=[
  
  {
    type:"list",
    message:"Which employee's role do you want to update ? ",
    name:"employeeName",
    choices:viewEmployees
  },
  {
    type:"list",
    message:"Which role do you want to assign the selected employee ? ",
    name:"roleList",
    choices:viewRoles
  },



];








function displayMenu(){

    prompt(listQuestion)
    .then(answers=>{

        
          if(answers.choiceList=="View All Departments"){
           
            choicesHandler(department,"view");
          }
          else if(answers.choiceList=="View All Roles"){

            choicesHandler(role,"view");
          }
          else if(answers.choiceList=="View All Employees"){
            choicesHandler(employee,"view-combined");
          }
          else if(answers.choiceList=="Add a Department"){
            
              addDepartmentPrompt(addDepQuestion)
              .then(
                newRow=>
                {
                  let value=[newRow.depName];
                  choicesHandler(department,"add",value);
                }
                
                )
              .catch(e=>console.log(e));
              
            
          }
          else if(answers.choiceList=="Add a Role"){
            
            addRolePrompt(addRoleQuestion)
            .then(
              newRow=>
              {
                let value=[newRow.roleName,newRow.salary,newRow.departmentName];
                choicesHandler(role,"add",value);
              }
              
              )
            .catch(e=>console.log(e));
            
          
        }
        else if(answers.choiceList=="Add an Employee"){

          addEmployeePrompt(addEmployeeQuestion)
          .then(
            newRow=>
            {
        
              let value=[newRow.firstName,newRow.lastName,newRow.roleName,newRow.managerName];
              choicesHandler(employee,"add",value);
            }
            
            )
          .catch(e=>console.log(e));
        }
        else if(answers.choiceList=="Update an Employee Role"){

          updateEmployeePrompt(updateEmployeeQuestion)
          .then(
            newRow=>{

            choicesHandler(employee,"update",newRow);
            }
          )
          .catch(e=>console.error(e))

          


        }
        else{
          console.log('\n');
          console.log("********* Exiting the Application **********");
          console.log('\n');
          return;
        }
          
        }
        
    )
    .catch(error=>console.log(error));
    

}




     async function choicesHandler(tableName,action,newRow=""){

      

       if(action==="view")
       {
      
      console.log(`\n`)
      console.log(`************${tableName.name.toUpperCase()} DATA************`);
      console.log(`\n`)

         tableName.viewAll()
          .then(  ([rows,fields])=>
                    {
                      console.table(rows)
                      
                    

                    displayMenu();}
                );
          
       
       } 
       
       else if(action=="view-combined")
       {
      console.log(`\n`)
      console.log(`************${tableName.name.toUpperCase()} DATA************`);
      console.log(`\n`)


        try{
            const [result]= await tableName.viewCombinedData(role,department);
                console.log("\n");
                console.table(result);
                console.log("\n");
            
          }
        catch(err){
                console.log(err);
               } 

        displayMenu();
       }

       else if(action==="add"){
        
          
        tableName.add(newRow)
        .then(result=>{
            console.log("\n")
            console.log(
              `Inserted ${newRow} to the table ${tableName.name}.`);
            console.log("\n")
            displayMenu();
           
        })
        .catch((error)=>{

            console.log("\n")
            console.log("Insertion Failed.Try again"+error);
            console.log("\n");
          

        })

          
          
           
       }
       else if(action==="update"){
        
        console.log(newRow);
        const {employeeName,roleList}=newRow;

        tableName.updateEmployeeByRole(employeeName,roleList)
        .then(
          result=>{
          console.log("\n");
          console.log(
            `Updated  employee ${employeeName}role to ${roleList} in ${tableName}.`);
          console.log("\n");
          displayMenu();
       })
       .catch(e=>console.log(e))
       }


    }


  
  
   




function startApp(){

   //TO DO Start Image
    // for(let i=0;i<5;i++){
    //     let row=" ";
    //     for(let j=0;j<5;j++){

    //         console.log(row+"-");
    //     }
    // }
    console.log("Welcome to the Employee Data Management System");
    displayMenu();
}

startApp();


//TO DO ,add try catch ,add validation for the insert 
//Reduce the server file size,put all prompts in another file