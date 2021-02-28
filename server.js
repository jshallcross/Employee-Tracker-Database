const inquirer = require ('inquirer');
const mysql = require ('mysql2');
const cTable = require('console.table');

const connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    // Your MySQL username
    user: 'root',
    // Your MySQL password
    password: 'MJe0$0709',
    database: 'employeeDB'
});

connection.connect(err => {
    if (err) throw err;
    console.log('connected as id ' + connection.threadId + '\n');
    start();
});


const start = () => {
    console.log('||==========================||');
    console.log('||        EMPLOYEE          ||');
    console.log('||        DATABASE          ||');
    console.log('||==========================||');
    inquirer.prompt([
        {
            name: 'choice',
            type: 'list',
            message: 'What would you like to do?',
            choices: ['View', 'Add New', /*'Edit Old', 'Delete',*/ 'Exit']
        }
    ])
    .then((answer) => {
        switch(answer.choice) {
            case 'View':
                viewOptions();
                break;
                
            case 'Add New':
                addOptions();
                break;
                /*
            case 'Edit Old':
                editOptions();
                break;
            
            Bonus feature
            case 'Delete':
                deleteOptions();
                break;
            */    
            case 'Exit':
                console.log("GoodBye!");
                connection.end();
                break;
            default:
                console.log("What did you do?");
                break;
        }
    });
};

const viewOptions = () => {
    inquirer.prompt([
        {
            name: 'choice',
            type: 'list',
            message: 'What would you like to do?',
            choices: ['View Employees', 'View Roles', 'View Departments', 'Start Menu']
        }
    ])
    .then((answer) => {
        switch(answer.choice) {
            case 'View Employees':
                viewEmployees();
                break;
            case 'View Roles':
                viewRoles();
                break;
            case 'View Departments':
                viewDepartments();
                break;   
            case 'Start Menu':
                start();
                break;
        }
    });
}


const viewEmployees = () => {
    let query = 'SELECT A.id AS ID, A.first_name AS First, A.last_name AS Last, role.title AS Title, department.deptName AS Department, role.salary AS Salary, CONCAT (B.first_name, " " ,B.last_name) AS Manager ';
    query += 'FROM employee A ';
    query += 'LEFT JOIN role ON A.role_id = role.id ';
    query += 'LEFT JOIN department ON role.department_id = department.id ';
    query += 'LEFT JOIN employee B ON A.manager_id = B.id';
    connection.query(query,(err, res) => {
            if(err) throw err;
            console.log('');
            console.table(res);
            viewOptions();
        })      
        
}

const viewRoles = () => {
    let query = 'SELECT id AS ID, title AS Title, salary AS Salary, department_id AS Dept_ID';
        query += ' FROM role';
        connection.query(query,(err, res) => {
            if(err) throw err;
            console.log('');
            console.table(res);
            viewOptions();
        })
        
}



const viewDepartments = () => {
    let query = 'SELECT id AS ID, deptName AS Department';
        query += ' FROM department';
        connection.query(query,(err, res) => {
            if(err) throw err;
            console.log('');
            console.table(res);
            viewOptions();
        })
        
}

const addOptions = () => {
    inquirer.prompt([
        {
            name: 'action',
            type: 'list',
            message: 'What would you like to add?',
            choices: ['Add Role', 'Add Department', 'Add Employee', 'Start Menu']
        }
    ])
    .then((answer) => {
        switch(answer.action) {
            case 'Add Role':
                addRole();
                break;
            case 'Add Department':
                addDepartment();
                break;
            case 'Add Employee':
                addEmployee();
                break;
            case 'Start Menu':
                start();
                break;
        }
    });
}

const addDepartment = () => {
    inquirer.prompt([
        {
        type: "input",
        name: "department",
        message: "What department would you like to add?"
        }
    ])
    .then((answer) => {

        connection.query(`INSERT INTO department (deptName) VALUES ("${answer.department}");`, function(err, res) {
                if (err) throw err;
                start();
            })
    })
}


const addRole = () => {
    let query = 'SELECT id FROM department';

    connection.query(query,(err,res) =>{
        if(err) throw err;
        let deptIdArr = [];

        for (let i = 0; i < res.length; i++) {
            let departmentId =  res[i].id
            deptIdArr.push(departmentId);
    
        }
    
    inquirer.prompt([
        {
            type: 'input',
            name: 'title',
            message: 'What role can we add to the database?'
        },
        {
            type: 'number',
            name: 'salary',
            message: 'What is the salary for this role?'
        },
        {
            type: 'list',
            name: 'department_id',
            message: 'What is the department id?',
            choices: deptIdArr 
        }
    ])
    .then((answers) => {
        connection.query(`INSERT INTO role (title, salary, department_id) 
        VALUES('${answers.title}', '${answers.salary}', '${answers.department_id}');`,
        function(err, res) {
            if (err) throw err;
            start();
        }
    )
})
})
}

addEmployee = () => {

}




var nameArray = [];
getNames = () => {
    let query = 'SELECT CONCAT (first_name, last_name) AS name';  
    query += 'FROM employee';
    connection.query(query, (err, res) => {
        for (var i = 0; i < res.length; i++) {
            nameArray.push(res[i].name);
        }

    });
    return nameArray;
};


var roleArray = [];
getRoles= () => {
    let query = "SELECT title FROM role"
    connection.query(query, (err, res) => {
        for (var i = 0; i < res.length; i++) {
            roleArray.push(res[i].title);
        }

    });
    return roleArray;
};

