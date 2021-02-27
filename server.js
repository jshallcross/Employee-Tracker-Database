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
            choices: ['View', /*'Add New', 'Edit Old', 'Delete',*/ 'Exit']
        }
    ])
    .then((answer) => {
        switch(answer.choice) {
            case 'View':
                viewOptions();
                break;
                /*
            case 'Add New':
                addOptions();
                break;
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
    const query = connection.query(
        `SELECT * FROM employee`,
        function(err, res) {
            if(err) throw err;
            console.log('');
            console.table(res);
            viewOptions();
        })
        
        console.log(query.sql);
}

const viewRoles = () => {
    const query = connection.query(
        `SELECT * FROM role`,
        function(err, res) {
            if(err) throw err;
            console.log('');
            console.table(res);
            viewOptions();
        })
        
        console.log(query.sql);
}

const viewDepartments = () => {
    const query = connection.query(
        `SELECT * FROM department`,
        function(err, res) {
            if(err) throw err;
            console.log('');
            console.table(res);
            viewOptions();
        })
        
        console.log(query.sql);
}


