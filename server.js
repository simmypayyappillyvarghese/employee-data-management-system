//Importing the promot modules
const exp=require('./promptQueries');


const mysql=require('mysql2');
const cTable = require('console.table');


/* Based on the answer chosen by the user from the choice list,choicehandler
is executed with table object and action to be performed */

function displayMenu(){

  exp.prompt(exp.listQuestion)
  .then(answers=>{

      
        if(answers.choiceList=="View All Departments"){
         
          choicesHandler(exp.department,"view");
        }
        else if(answers.choiceList=="View All Roles"){

          choicesHandler(exp.role,"view");
        }
        else if(answers.choiceList=="View All Employees"){
          choicesHandler(exp.employee,"view-combined");
        }
        
        else if(answers.choiceList=="View Employees By The Manager"){

         exp.viewEmployeeByManagerPrompt(exp.viewEmpByManagerQuestion)
         .then(

          newRow=>{
            let managerName=newRow.managerNameList;
            choicesHandler(exp.employee,"viewEmpByManager",managerName);
          }
         )
         .catch(e=>console.log(e));


        }
        else if(answers.choiceList=="Add a Department"){
          
          exp.addDepartmentPrompt(exp.addDepQuestion)
            .then(
              newRow=>
              {
                let value=[newRow.depName];
                choicesHandler(exp.department,"add",value);
              }
              
              )
            .catch(e=>console.log(e));
            
          
        }
        else if(answers.choiceList=="Add a Role"){
          
          exp.addRolePrompt(exp.addRoleQuestion)
          .then(
            newRow=>
            {
              let value=[newRow.roleName,newRow.salary,newRow.departmentName];
              choicesHandler(exp.role,"add",value);
            }
            
            )
          .catch(e=>console.log(e));
          
        
      }
      else if(answers.choiceList=="Add an Employee"){

        exp.addEmployeePrompt(exp.addEmployeeQuestion)
        .then(
          newRow=>
          {
      
            let value=[newRow.firstName,newRow.lastName,newRow.roleName,newRow.managerName];
            choicesHandler(exp.employee,"add",value);
          }
          
          )
        .catch(e=>console.log(e));
      }
      else if(answers.choiceList=="Update an Employee Role"){

        exp.updateEmployeePrompt(exp.updateEmployeeQuestion)
        .then(
          newRow=>{
 
          choicesHandler(exp.employee,"update",newRow);
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


/* Function will call the table instance methods based on the action passed to it 
and print tge data in tabular format */

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
       const [result]= await tableName.viewCombinedData(exp.role,exp.department);
           console.log("\n");
           console.table(result);
           console.log("\n");
       
     }
   catch(err){
           console.log(err);
          } 

   displayMenu();
  }

  else if(action==="viewEmpByManager"){
    try{

     const [rows,fields] =await tableName.viewEmployeesByManagerName(newRow);
     console.log("\n");
     console.table(rows);
     console.log("\n");

    } catch(err){
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
   

   const {employeeName,roleList}=newRow;

   tableName.updateEmployeeByRole(employeeName,roleList)
   .then(
     result=>{
     console.log("\n");
     console.log(
       `Updated  employee ${employeeName} role to ${roleList} in ${tableName.name}.`);
     console.log("\n");``
     displayMenu();
  })
  .catch(e=>console.log(e))
  }


}



/* Starting Point of the Application */
function startApp(){

    console.log("\n");
    console.log("* Welcome to the Employee Data Management System *");
    console.log("\n");

    displayMenu();
}

startApp();


//TO DO ,add try catch ,add validation for the insert 