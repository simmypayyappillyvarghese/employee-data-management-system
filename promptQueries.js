

const inquirer=require('inquirer');

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



/* Prompt module and queries for Updating the Employee option*/

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



/*Below Functions return the data from the table to be displayed as choice list for the prompt */

/*This will return all the department names */

async function viewDepartments(){
     
    const[rows,fields]= await department.viewAll();
    return rows;
  
  }
  
/*This will return all the role titles */  

async function viewRoles(){
     
    const[rows,fields]= await role.viewAll();
    let titles=[]
    rows.forEach((row)=>titles.push(row.title))
    return titles;
  
  }

/*This will return all the employee names */

async function viewEmployees(){

    const[rows,fields]= await employee.viewAll();
    let managerNames=[]
    rows.forEach((row)=>managerNames.push(row.first_name+" "+row.last_name))
    return managerNames;
  }

  module.exports = { prompt,listQuestion,addEmployeePrompt,addEmployeeQuestion,
                     addDepartmentPrompt,addDepQuestion,addRolePrompt,addRoleQuestion,
                     updateEmployeePrompt,updateEmployeeQuestion,
                     employee,role,department}