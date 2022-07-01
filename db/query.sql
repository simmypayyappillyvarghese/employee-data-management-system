
/**** VIEW ALL EMPLOYEE DATA WITH DEPARTMENT NAME AND MANAGER NAME*******/

select E.id as "Employee Id",E.first_name as "First Name",E.last_name as "Last Name",R.title as "Title",R.salary as "Salary",
D.name as "Department Name",
concat(M.first_name," ",M.last_name ) as "Manager"
from 
employee E 
LEFT JOIN 
role R ON
E.role_id=R.id 
LEFT JOIN
department D ON
D.id=R.department_id 
LEFT JOIN
employee M ON
E.manager_id=M.id;
