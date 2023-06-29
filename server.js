const mysql = require('mysql2');
const inquirer = require('inquirer');
const db = mysql.createConnection(
    {
        host: 'localhost',
        user: 'root',
        password: '12345678',
        database: 'employeeInfo_db'
    },
);
//^^creates the mysql connection
var initQuestion = [{
    type: 'list',
    name: 'toDo',
    message: 'What would you like to do?',
    choices: ['View All Departments', 'View All Roles', 'View All Employees', 'Add a Department', 'Add a Role', 'Add an Employee', 'Update an Employee Role', 'Exit']
   }]
   async function init() {
    await inquirer.prompt(initQuestion)
    .then ((answers) => {switch (answers.toDo) {
        case 'View All Departments':
            viewDepartments();
            break;
        case 'View All Roles':
            viewRoles();
            break;
        case 'View All Employees':
            viewAllEmployees();
            break;
        case 'Add a Department':
            addDepartment();
            break;
        case 'Add a Role':
            addRole();
            break;
        case 'Add an Employee':
            addEmployee();
            break;
        case 'Update an Employee Role':
            updateEmployeeRole();
        case 'Exit':
            process.exit();
    };
   })
}
  //^^asks user what they want to do and then directs to the correct function 


function viewDepartments() {
    db.query('SELECT * FROM departments;',(err, result) => {
        if (err) {
          console.log(err);
        }else{
            console.table(result);
            init();
        }
         })
    };
//^^Shows the departments table in the terminal
    function viewRoles() {
        db.query('SELECT * FROM roles;',(err, result) => {
            if (err) {
              console.log(err);
            }else{
                console.table(result);
                init();
            }
             })
        };
//^^Shows the roles table in the terminal

    function viewAllEmployees() {
        db.query('SELECT DISTINCT e1.id, e1.first_name, e1.last_name, roles.title, departments.name AS department, roles.salary, CONCAT(e2.first_name, " " , e2.last_name) AS manager FROM employees e1 INNER JOIN roles on e1.role_id = roles.id INNER JOIN departments on roles.department_id = departments.id LEFT JOIN employees e2 ON e1.manager_id = e2.id;' ,(err, result) => {
            if (err) {
              console.log(err);
            }else{
                console.table(result);
                init();
            }
             })
        };
//^^Shows the employees table in the terminal
        async function addDepartment() {
            const deptQuestions = [{
                type: 'input',
                name: 'department',
                message: 'What department would you like to add?'
            },
            {
                type: 'input',
                name: 'deptId',
                message: 'What is the Id for the new Department?'
            }];
            await inquirer.prompt(deptQuestions).then(async answers => {
                db.query('INSERT INTO departments SET ?',
                {
                    id: answers.deptId,
                    name: answers.department
                },
                function(err, res) {
                    if(err) {
                        console.log(err);
                    };
                    init();
                })
            })
        };
//^^Allows the user to insert a new department
        async function addRole() {
            const roleQuestions = [{
                type: 'input',
                name: 'role',
                message: 'What role would you like to add?'
            },
            {
                type: 'input',
                name: 'roleId',
                message: 'What is the id for this role?'
            },
            {
                type: 'input',
                name: 'salary',
                message: 'What is the Salary for this role?'
            },
            {
                type: 'input',
                name: 'deptId',
                message: 'What is the Id for the department that this role belongs to?'
            }];
            await inquirer.prompt(roleQuestions).then(async answers => {
                db.query('INSERT INTO roles SET ?',
                {
                    id: answers.roleId,
                    title: answers.role,
                    salary: answers.salary,
                    department_id: answers.deptId
                },
                function(err, res) {
                    if(err) {
                        console.log(err);
                    };
                    init();
                })
            })
        }
//^^Allows the user to insert a new role
        async function addEmployee() {
            const employeeQuestions = [{
                type: 'input',
                name: 'firstName',
                message: 'What is the first name of the employee?'
            },
            {
                type: 'input',
                name: 'lastName',
                message: 'What is the last name of the employee?'
            },
            {
                type: 'input',
                name: 'id',
                message: 'What is the id number for this employee?'
            },
            {
                type: 'input',
                name: 'roleId',
                message: 'What is the id for the role this employee has?'
            },
            {
                type: 'input',
                name: 'manager',
                message: 'Who is this manager of this employee (manager employee id)?'
            }];
            await inquirer.prompt(employeeQuestions).then(async answers => {
                if(answers.manager){
                    var manager = answers.manager;
                }else {
                    var manager = null;
                }
                db.query('INSERT INTO employees SET ?',
                {
                    id: answers.id,
                    first_name: answers.firstName,
                    last_name: answers.lastName,
                    role_id: answers.roleId,
                    manager_id:manager
                },
                function(err, res) {
                    if(err) {
                        console.log(err);
                    };
                    init();
                })
            })
        }
//^^Allows the user to insert a new employee
        async function updateEmployeeRole() {
            let employees = db.query('SELECT first_name, last_name, id FROM employees;');
            await employees.catch(err => {
              console.log(err);
            });
            let employeeList = employees.map(employee => ({
              name: '${employee.first_name} ${employee.last_name}',
              value: employee.id
            }));
            let roles = db.query('SELECT title,id FROM roles;');
            await roles.catch(err => {
              console.log(err);
            });
            let roleList = roles.map(role => ({
              name: role.title,
              value: role.id
            }));
            let questions = [{
              type: 'list',
              name: 'selectedEmployee',
              message: 'Which employee would you like to edit?',
              choices: employeeList
            },{
              type: 'list',
              name: 'newRole',
              message: "What is this employee's new role?",
              choices: roleList
            }];
            await inquirer.prompt(questions).then(async answers => {
              db.query('UPDATE employees SET role_id = ${newRole.value} WHERE id = ${selectedEmployee.id}:'),
              function(err, res) {
                if(err) {
                  console.log(err);
                };
                init();
              }});
          }
            
           //^^Allows the user to change an employee's role 
                   
     
        

    init();