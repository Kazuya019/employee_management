DROP DATABASE IF EXISTS employeeSystem;

CREATE DATABASE employeeSystem;

USE employeeSystem;

CREATE TABLE employees (
  ID varchar(45) NOT NULL,
  FName varchar(45) NOT NULL,
  LName varchar(45) NOT NULL,
  email varchar(45) NOT NULL,
  password varchar(45) NOT NULL,
  ComfPassword varchar(45) NOT NULL,
  PRIMARY KEY (ID),
  UNIQUE KEY ID_UNIQUE (ID)
);
INSERT INTO employees VALUES ('1', 'Sandy', 'Williams', 'sandy.williams@company.com', 'abc123#', 'abc123#');
INSERT INTO employees VALUES ('6', 'Cynthia', 'Garcia', 'cynthia.garcia@company.com', 'abc123#', 'abc123#');
INSERT INTO employees VALUES ('9', 'Anthony', 'Tran', 'anthony.tran@company.com', 'abc123#', 'abc123#');
INSERT INTO employees VALUES ('16', 'Darryl', 'Thompson', 'darryl.thompson@company.com', 'abc123#', 'abc123#');
INSERT INTO employees VALUES ('19', 'Elizabeth', 'Smith', 'elizabeth.smith@company.com', 'abc123#', 'abc123#');
INSERT INTO employees VALUES ('21', 'Derek', 'Otter', 'derek.otter@company.com', 'abc123#', 'abc123#');
INSERT INTO `employees` (`ID`, `FName`, `LName`, `email`, `password`, `ComfPassword`) VALUES ('40', 'Roosevelt', 'Reeves', 'roosevelt.reeves@company.com', 'abc123#', 'abc123#');
INSERT INTO `employees` (`ID`, `FName`, `LName`, `email`, `password`, `ComfPassword`) VALUES ('11', 'Rio ', 'Fowler', 'rio.fowler@company.com', 'abc123#', 'abc123#');
INSERT INTO `employees` (`ID`, `FName`, `LName`, `email`, `password`, `ComfPassword`) VALUES ('5', 'Hamzah ', 'Sims', 'hamzah.sims@company.com', 'abc123#', 'abc123#');
INSERT INTO `employees` (`ID`, `FName`, `LName`, `email`, `password`, `ComfPassword`) VALUES ('31', 'Maariyah ', 'Vance', 'maariyah.vance@company.com', 'abc123#', 'abc123#');
INSERT INTO `employees` (`ID`, `FName`, `LName`, `email`, `password`, `ComfPassword`) VALUES ('36', 'Suzanne ', 'Guerrero', 'suzanne.guerrero@company.com', 'abc123#', 'abc123#');
INSERT INTO `employees` (`ID`, `FName`, `LName`, `email`, `password`, `ComfPassword`) VALUES ('15', 'Rafe ', 'Blair', 'rafe.blair@company.com', 'abc123#', 'abc123#');
INSERT INTO `employees` (`ID`, `FName`, `LName`, `email`, `password`, `ComfPassword`) VALUES ('3', 'Cerys ', 'Landry', 'cerys.landry@company.com', 'abc123#', 'abc123#');
INSERT INTO `employees` (`ID`, `FName`, `LName`, `email`, `password`, `ComfPassword`) VALUES ('24', 'Elijah ', 'Drake', 'elijah.drake@company.com', 'abc123#', 'abc123#');
INSERT INTO `employees` (`ID`, `FName`, `LName`, `email`, `password`, `ComfPassword`) VALUES ('26', 'Asa ', 'Shepherd', 'asa.shepherd@company.com', 'abc123#', 'abc123#');
INSERT INTO `employees` (`ID`, `FName`, `LName`, `email`, `password`, `ComfPassword`) VALUES ('2', 'Vanessa ', 'Spence', 'vanessa.spence@company.com', 'abc123#', 'abc123#');

CREATE TABLE company_info (ID INT NOT NULL UNIQUE, manager varchar(45) NOT NULL, position VARCHAR(20) NOT NULL, department VARCHAR(30) NOT NULL, salary INT NOT NULL, PRIMARY KEY (ID));
INSERT INTO company_info VALUES ('0', '0', 'CEO', 'Operations Management', 1000000);
INSERT INTO company_info VALUES ('1', '0', 'Director', 'Human Resources', 800000);
INSERT INTO company_info VALUES ('2', '0', 'Director', 'Operations Management', 800000);
INSERT INTO company_info VALUES ('3', '0', 'Director', 'Marketing', 800000);
INSERT INTO company_info VALUES ('4', '0', 'Director', 'Finance', 800000);
INSERT INTO company_info VALUES ('5', '0', 'Director', 'IT', 800000);
INSERT INTO company_info VALUES ('6', '1', 'Manager', 'Human Resources', 500000);
INSERT INTO company_info VALUES ('7', '2', 'Manager', 'Operations Management', 500000);
INSERT INTO company_info VALUES ('8', '3', 'Manager', 'Marketing', 500000);
INSERT INTO company_info VALUES ('9', '4', 'Manager', 'Finance', 500000);
INSERT INTO company_info VALUES ('10', '5', 'Manager', 'IT', 500000);
INSERT INTO company_info VALUES ('11', '1', 'Manager', 'Human Resources', 500000);
INSERT INTO company_info VALUES ('12', '2', 'Manager', 'Operations Management', 500000);
INSERT INTO company_info VALUES ('13', '3', 'Manager', 'Marketing', 500000);
INSERT INTO company_info VALUES ('14', '4', 'Manager', 'Finance', 500000);
INSERT INTO company_info VALUES ('15', '5', 'Manager', 'IT', 500000);
INSERT INTO company_info VALUES ('16', '6', 'Regular Employee', 'Human Resources', 200000);
INSERT INTO company_info VALUES ('17', '7', 'Regular Employee', 'Operations Management', 200000);
INSERT INTO company_info VALUES ('18', '8', 'Regular Employee', 'Marketing', 200000);
INSERT INTO company_info VALUES ('19', '9', 'Regular Employee', 'Finance', 200000);
INSERT INTO company_info VALUES ('20', '10', 'Regular Employee', 'IT', 200000);
INSERT INTO company_info VALUES ('21', '6', 'Regular Employee', 'Human Resources', 200000);
INSERT INTO company_info VALUES ('22', '7', 'Regular Employee', 'Operations Management', 200000);
INSERT INTO company_info VALUES ('23', '8', 'Regular Employee', 'Marketing', 200000);
INSERT INTO company_info VALUES ('24', '9', 'Regular Employee', 'Finance', 200000);
INSERT INTO company_info VALUES ('25', '10', 'Regular Employee', 'IT', 200000);
INSERT INTO company_info VALUES ('26', '6', 'Regular Employee', 'Human Resources', 200000);
INSERT INTO company_info VALUES ('27', '7', 'Regular Employee', 'Operations Management', 200000);
INSERT INTO company_info VALUES ('28', '8', 'Regular Employee', 'Marketing', 200000);
INSERT INTO company_info VALUES ('29', '9', 'Regular Employee', 'Finance', 200000);
INSERT INTO company_info VALUES ('30', '10', 'Regular Employee', 'IT', 200000);
INSERT INTO company_info VALUES ('31', '11', 'Regular Employee', 'Human Resources', 200000);
INSERT INTO company_info VALUES ('32', '12', 'Regular Employee', 'Operations Management', 200000);
INSERT INTO company_info VALUES ('33', '13', 'Regular Employee', 'Marketing', 200000);
INSERT INTO company_info VALUES ('34', '14', 'Regular Employee', 'Finance', 200000);
INSERT INTO company_info VALUES ('35', '15', 'Regular Employee', 'IT', 200000);
INSERT INTO company_info VALUES ('36', '11', 'Regular Employee', 'Human Resources', 200000);
INSERT INTO company_info VALUES ('37', '12', 'Regular Employee', 'Operations Management', 200000);
INSERT INTO company_info VALUES ('38', '13', 'Regular Employee', 'Marketing', 200000);
INSERT INTO company_info VALUES ('39', '14', 'Regular Employee', 'Finance', 200000);
INSERT INTO company_info VALUES ('40', '15', 'Regular Employee', 'IT', 200000);

CREATE TABLE tasks (task_id INT NOT NULL, manager_id varchar(45) NOT NULL, employee_id varchar(45) NOT NULL, title VARCHAR(45) NOT NULL, description VARCHAR(150) NOT NULL, due_date DATE NOT NULL, due_time TIME NOT NULL, priority VARCHAR(45), status VARCHAR(30) NOT NULL, PRIMARY KEY (task_id));
INSERT INTO tasks VALUES(1, '6', '16', 'Update employee list', 'update list to include new hires', '2022-11-24', '08:00:00', 'High','in progress');
INSERT INTO tasks VALUES(2, '6', '16', 'Update manager list', 'update list to include newly promoted managers', '2022-11-25', '18:00:00', 'Low','in progress');
INSERT INTO tasks VALUES(3, '6', '16', 'Update employee count', 'update number of employees after hiring season', '2022-11-26', '18:00:00', 'Mid','complete');
INSERT INTO tasks VALUES(4, '6', '16', 'Update employee demographics', 'update demographics of employees after hiring season', '2022-11-27', '18:00:00', 'Mid','in progress');
INSERT INTO tasks VALUES(5, '6', '16', 'Prediction for next hiring season', 'analyze situation to determine what the next hiring season may entail', '2022-11-28', '18:00:00', 'Mid','in progress');
INSERT INTO tasks VALUES(6, '1', '6', 'Update employee demographics', 'update demographics of employees after hiring season', '2022-11-27', '18:00:00', 'Low', 'in progress');
INSERT INTO tasks VALUES(7, '1', '6', 'Prediction for next hiring season', 'analyze situation to determine what the next hiring season may entail', '2022-11-28', '18:00:00', 'High','complete');

CREATE TABLE task_comments (comment_id INT NOT NULL, employee_id varchar(45) NOT NULL, task_id INT NOT NULL, comment VARCHAR(100) NOT NULL, PRIMARY KEY (comment_id));
INSERT INTO task_comments VALUES(1, '16', 1, 'suggest change of spreadsheet arrangement');
INSERT INTO task_comments VALUES(2, '16', 1, 'missing IT department new hires');
INSERT INTO task_comments VALUES(3, '16', 3, 'completed, please open new task for revisions');
INSERT INTO task_comments VALUES(4, '16', 4, 'is the demographic list in the folder?');
INSERT INTO task_comments VALUES(5, '6', 4, 'in the dem folder with an example file');

CREATE TABLE time_worked (day DATE NOT NULL, employee_id VARCHAR(45) NOT NULL, clock_in TIME NOT NULL, clock_out TIME, hours FLOAT, PRIMARY KEY (day, employee_id));
INSERT INTO time_worked VALUES('2022-11-21', 16, '08:00:00', '04:30:00', 8);
INSERT INTO time_worked VALUES('2022-11-22', 16, '09:00:00', '05:30:00', 8);
INSERT INTO time_worked VALUES('2022-11-23', 16, '08:30:00', '05:00:00', 8);
INSERT INTO time_worked VALUES('2022-11-25', 16, '08:30:00', '05:00:00', 8);
INSERT INTO time_worked VALUES('2022-11-28', 16, '08:00:00', '04:30:00', 8);
INSERT INTO time_worked VALUES('2022-11-29', 16, '09:00:00', NULL, NULL);

