/* SCHEMA file to create the tables and database*/


DROP DATABASE IF EXISTS employee_db;
CREATE DATABASE employee_db;

USE employee_db;

CREATE TABLE department
(id INT NOT NULL AUTO_INCREMENT PRIMARY KEY ,
name VARCHAR(30));

CREATE TABLE role
(id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
title VARCHAR(30) UNIQUE,
salary DECIMAL,
department_id INT,
FOREIGN KEY(department_id) REFERENCES department(id) ON DELETE SET NULL);

ALTER TABLE role AUTO_INCREMENT=200;

CREATE TABLE employee
(id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
first_name VARCHAR(30),
last_name VARCHAR(30),
role_id INT,
manager_id INT,
FOREIGN KEY(role_id) REFERENCES role(id) ON DELETE SET NULL,
FOREIGN KEY(manager_id) REFERENCES employee(id) ON DELETE SET NULL);

ALTER TABLE employee AUTO_INCREMENT=1000;

