INSERT INTO department
VALUES
("Sales"),                       ---1
("Engineering"),                 ---2
("Legal"),                       ---3
("Finance");                     ---4


/** Role ID starts from 200 **/

INSERT INTO role
VALUES
("Sales Lead",100000,1),         ---200
("Software Engineer",120000,2),  ---201
("Account Manager",160000,4),    ---202
("Legal Team Lead",250000,3),    ---203
("Lawyer",190000,3),             ---204
("Lead Engineer",150000,2),      ---205
("Accountant",125000,4),         ---206
("Salesperson",80000,1)          ---207
("VP-Sales & Legal",300000,1)    ---208
("VP-Engineering",400000,2)      ---209
("CEO",600000,NULL)              ---210


/** Employee ID starts from 1000 **/

INSERT INTO employee
VALUES
(first_name,last_name,role_id,manager_id),
("Simmy","Varghese",205,1010),     --1000
("John","Doe",200,1009),           --1001
("Mike","Chan",202,1009),          --1002
("Kunal","Singh",207,1001),        --1003
("Malia","Brown",206,1002),        --1004
("Sarah","Lourd",203,),            --1005
("Tom","Allen",204,1005),          --1006
("Sam","Kash",207,1001),           --1007
("Emma","Francis",201,1000),       --1008
("Kelly","Haager",208,1011),       --1009
("Labeeb","Ismail",209,1011),      --1010
("Sundar","Pichai",NULL,NULL)      --1011
