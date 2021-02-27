USE employeeDB;

INSERT INTO department (deptName)
VALUES 
("Manager"),
("Bartender"),
("Cook"),
("Server"),
("Host");


INSERT INTO role (title, salary, department_id)
VALUES 
("Manager", 55250.00, 1),
("Bartender", 72500.50, 2),
("Cook", 37500.50, 3),
("Server", 49750.25, 4),
("Host", 26750.75, 5);



INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES 
("Jon", "Shallcross", 2, 1 ),
("Tarek", "Douseki", 1, null ),
("Mike", "Donohue", 1, null ),
("Shawn", "Warwick", 2, 1 ),
("Tammy", "Wisdom", 2, 1 ),
("Max", "Hornell", 3, 1 ),
("Curtis", "Taylor", 3, 1 ),
("Sean", "Tidevon", 3, 1 ),
("Elena", "Gilmour", 4, 2 ),
("Madison", "Shallcross", 5, 2 ),
("Justice", "Shallcross", 5, 2 ),
("Jacksyn", "Hamilton", 2, 1 ),
("Ethan", "Shallcross", 3, 1 ),
("Dave", "DeJong", 2, 1 ),
("Dave", "Hornell", 2, 1 );