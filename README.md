# EMPLOYEE DATA MANAGEMENT SYSTEM

## PROJECT DESCRIPTION

<br>

This is a CMS application that allows to view and manage employee data.Application is created using Node JS utilizing the npm packages like inquirer,mysql2.This command line application interact with uservia the inquirer package and interact with database using mysql2 package to get the requested data.

Application currently allow user to 

*   View All Departments
*   View All Roles
*   View All Employees
*   View Employees By The Manager
*   Add a Department
*   Add a Role
*   Add an Employee
*   Update an Employee Role
*   Quit


<br>

### User Story

AS A business owner
I WANT to be able to view and manage the departments, roles, and employees in my company
SO THAT I can organize and plan my business

### Acceptance Criteria

GIVEN a command-line application that accepts user input

*   WHEN I start the application THEN I am presented with the following options: view all departments, view all roles, view all employees, add a department, add a role, add an employee, and update an employee role
*   WHEN I choose to view all departments THEN I am presented with a formatted table showing department names and department ids
*   WHEN I choose to view all roles THEN I am presented with the job title, role id, the department that role belongs to, and the salary for that role
*   WHEN I choose to view all employees THEN I am presented with a formatted table showing employee data, including employee ids, first names, last names, job titles, departments, salaries, and managers that the employees report to
*   WHEN I choose to view all employees for a respective manager THEN I am prompted with a list of manager names to choose
*   WHEN I choose the manager name THEN I am presemted with the employees first_name and last_name
*   WHEN I choose to add a department THEN I am prompted to enter the name of the department and that department is added to the database
*   WHEN I choose to add a role THEN I am prompted to enter the name, salary, and department for the role and that role is added to the database
*   WHEN I choose to add an employee THEN I am prompted to enter the employee’s first name, last name, role, and manager, and that employee is added to the database
*   WHEN I choose to update an employee role THEN I am prompted to select an employee to update and their new role and this information is updated in the database

<br>

### LINKS

VIDEO URL : https://drive.google.com/file/d/1a_HdzZpL5c4oFaUINEUmtuEMqyXkZMvD/view?usp=sharing

Github Repo Link: https://github.com/simmypayyappillyvarghese/employee-data-management-system

<br>

### TECHNOLOGIES AND PACKAGES USED

* NODE JS
* INQUIRER
* MYSQL2 / PROMISE
* CONSOLE.TABLE

<br>

### Screenshots

<br>

![Screenshot of CLI terminal of employee tracker ](./assets/images/CLI%20screenshot-EmployeeTracker.png)