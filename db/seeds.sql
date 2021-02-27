USE employeeDB;

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES 
("Jon", "Shallcross", 2, null ),
("Tarek", "Douseki", 1, null ),
("Mike", "Donohue", 1, null ),
("Shawn", "Warwick", 2, null ),
("Tammy", "Wisdom", 2, null ),
("Max", "Hornell", 3, null ),
("Curtis", "Taylor", 3, null ),
("Sean", "Tidevon", 3, null ),
("Elena", "Gilmour", 4, null ),
("Madison", "Shallcross", 5, null ),
("Justice", "Shallcross", 5, null ),
("Jacksyn", "Hamilton", 2, null ),
("Ethan", "Shallcross", 3, null ),
("Dave", "DeJong", 2, null ),
("Dave", "Hornell", 2, null );




INSERT INTO role (title, salary, department_id)
VALUES 
("Manager", 55250.00, 1),
("Bartender", 72500.50, 2),
("Cook", 37500.50, 3),
("Server", 49750.25, 4),
("Host", 26750.75, 5);

INSERT INTO department (deptName)
VALUES 
("Manager"),
("Bartender"),
("Cook"),
("Server"),
("Host");