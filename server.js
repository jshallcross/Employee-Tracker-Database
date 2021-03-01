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
    introText = `
    
    ___  ___ ___  ____  _       ___   __ __    ___    ___ 
   /  _]|   |   ||    \| |     /   \ |  |  |  /  _]  /  _]
  /  [_ | _   _ ||  o  ) |    |     ||  |  | /  [_  /  [_ 
 |    _]|  \_/  ||   _/| |___ |  O  ||  ~  ||    _]|    _]
 |   [_ |   |   ||  |  |     ||     ||___, ||   [_ |   [_ 
 |     ||   |   ||  |  |     ||     ||     ||     ||     |
 |_____||___|___||__|  |_____| \___/ |____/ |_____||_____|
                                                          
  ___     ____  ______   ____  ____    ____  _____   ___  
 |   \   /    ||      | /    ||    \  /    |/ ___/  /  _] 
 |    \ |  o  ||      ||  o  ||  o  )|  o  (   \_  /  [_  
 |  D  ||     ||_|  |_||     ||     ||     |\__  ||    _] 
 |     ||  _  |  |  |  |  _  ||  O  ||  _  |/  \ ||   [_  
 |     ||  |  |  |  |  |  |  ||     ||  |  |\    ||     | 
 |_____||__|__|  |__|  |__|__||_____||__|__| \___||_____| 
                                                          
 `;
console.log(introText);
    inquirer.prompt([
        {
            name: 'choice',
            type: 'list',
            message: 'What would you like to do?',
            choices: ['View Menu', 'Add Menu', 'Update Menu','Delete Menu', 'Exit']
        }
    ])
    .then((answer) => {
        switch(answer.choice) {
            case 'View Menu':
                viewOptions();
                break;
                
            case 'Add Menu':
                addOptions();
                break;
                
            case 'Update Menu':
                updateItems();
                break;
            case 'Delete Menu':
                deleteOptions();
                break; 
            case 'Exit':
                console.log("GoodBye!");
                connection.end();
                break;
        }
    });
};


// The View Options Menu
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

// View all employees table
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

//View all roles table
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

// View all departments table
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

// The add options mneu
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

// add department function
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
                viewDepartments();
            })
    })
}

// add role function
const addRole = () => {
    let query = 'SELECT * FROM department';

    connection.query(query,(err,res) =>{
        if(err) throw err;
        let deptIdArr = [];

        for (let i = 0; i < res.length; i++) {
            
            deptIdArr.push(`${res[i].id} ${res[i].deptName}`);
    
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
        VALUES('${answers.title}', '${answers.salary}', '${answers.department_id.substr(0, answers.department_id.lastIndexOf(" "))}');`,
        function(err, res) {                            
            if (err) throw err;
            viewRoles();
        }
    )
})
})
}

// add an employee function
addEmployee = () => {
    inquirer.prompt([
        {
            name: 'firstName',
            type: 'input',
            message: "What is the employee's first Name?",            
        },
        {
            name: 'lastName',
            type: 'input',
            message: "What is the employee's last name?",
        },
        {
            name: 'role',
            type: 'list',
            message: 'What role will this employee have?',
            choices: getRoles() 
        },
        {
            name: 'manager',
            type: 'list',
            message: "Who is the manager of this employee?",
            choices: getNames()
        }
    ])
    .then((answers) => {
        
        connection.query(`INSERT INTO employee (first_name, last_name, role_id, manager_id) 
        VALUES('${answers.firstName}', '${answers.lastName}', '${answers.role.substr(0, answers.role.lastIndexOf(" "))}','${answers.manager.substr(0, answers.role.lastIndexOf(" "))}');`,
        function(err, res) {
            if (err) throw err;
            viewEmployees();
        })
    })
}

// Update items menu
updateItems = () => {
    inquirer.prompt([
        {
            name: 'action',
            type: 'list',
            message: 'What would you like to add?',
            choices: ['Update Role', 'Start Menu']
        }
    ])
    .then((answer) => {
        switch(answer.action) 
        {
            case 'Update Role':
                updateRole();
                break;
            case 'Start Menu':
                start();
                break;
        }
    });
}


// Update role function
function updateRole() {
    inquirer.prompt([
        {
            type: 'input',
            message: 'Which employee would you like to update? Choose by their ID#',
            name: 'employee',
        },
        {
            type: 'input',
            message: 'Please add a new Role ID',
            name: 'role',
        },
    ]).then((answer) => {
    connection.query('UPDATE employee SET role_id=? WHERE id= ?;',
    [answer.role, answer.employee],(err, res) => {
        if (err) throw err;
        updateItems();
        })
    });
}

// The delete options menu Not completed

const deleteOptions = () => {
    inquirer.prompt([
        {
            name: 'action',
            type: 'list',
            message: 'What would you like to delete?',
            choices: ['Delete Employee','Delete Role', 'Delete Department', 'Start Menu']
        }
    ])
    .then((answer) => {
        switch(answer.action) {
            case 'Delete Employee':
                deleteEmployee();
                break;
            case 'Delete Role':
                deleteRole();
                break;
            case 'Delete Department':
                deleteDepartment();
                break;
            case 'Start Menu':
                start();
                break;
        }
    });
}

//Delete employee function
deleteEmployee = () => {
    inquirer.prompt([
        {
            type: "input",
            message: "What is the FIRST NAME of the employee do you want to delete?",
            name: "firstName"
        },
        {
            type: "input",
            message: "What is the LAST NAME of the employee do you want to delete?",
            name: "lastName"
        },
    ])
    .then((answer) => {
    connection.query('DELETE FROM employee WHERE first_name=? AND last_name=?;',
    [answer.firstName, answer.lastName], (err, res) => {
        if (err) throw err;
        deleteOptions();
        })
    });
};


// Delete department function
deleteDepartment = () => {
    inquirer.prompt([
        {
            type: 'input',
            message: 'Which department do you want to delete?',
            name: 'deleteDepartment'
        }, 
    ])
    .then((answer) => {
    connection.query('DELETE FROM department WHERE deptName=?;', 
    [answer.deleteDepartment], (err, res) => {
        if (err) throw err;
        deleteOptions();
        })
    })
};

//Delete role function
deleteRole = () => {
    inquirer.prompt([
        {
        type: 'input',
        message: 'Which Role do you want to delete?',
        name: 'deleteRole',
        },
    ])
    .then((answer) => {
    connection.query('DELETE FROM role WHERE title= ?;', 
    [answer.deleteRole], (err, res) => {
        if (err) throw err;
        deleteOptions();
        })
    })
};




// Get names function
let nameArray = [];
getNames = () => {
    let query = 'SELECT * FROM employee '; 

    connection.query(query, (err, res) => {
        for (var i = 0; i < res.length; i++) {
            nameArray.push(`${res[i].id} ${res[i].first_name} ${res[i].last_name}`);
        }
    });
    return nameArray;
};

// Get roles function
let roleArray = [];
getRoles= () => {
    let query = "SELECT * FROM role"
    connection.query(query, (err, res) => {
        for (var i = 0; i < res.length; i++) {
            roleArray.push(`${res[i].id} ${res[i].title}`);
        }
    });
    return roleArray;
};


