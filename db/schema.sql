DROP DATABASE IF EXISTS employeeDB;


CREATE DATABASE employeeDB;

USE employeeDB;

CREATE TABLE department (
    department_id INTEGER(10) PRIMARY KEY AUTO_INCREMENT,
    deptName VARCHAR(30) UNIQUE NOT NULL
);

CREATE TABLE role (
    role_id INTEGER(10) PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(30) NOT NULL,
    salary DECIMAL(10) NOT NULL,
    department_id INTEGER(10) NOT NULL
);

CREATE TABLE employee (
    employee_id INTEGER(10) PRIMARY KEY AUTO_INCREMENT,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    role_id INTEGER(10) NOT NULL,
    manager_id INTEGER(10) DEFAULT NULL
);


SELECT * FROM department;
SELECT * FROM role;
SELECT * FROM employee;