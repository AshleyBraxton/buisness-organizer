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

var initQuestion = [{
    type: 'list',
    name: 'toDo',
    message: 'What would you like to do?',
    choices: ['View All Departments', 'View All Roles', 'View All Employees', 'Add a Department', 'Add a Role', 'Add an Employee', 'Update an Employee Role']
   }]
   async function init() {
    await inquirer.prompt(initQuestion)
    .then ((answers) => {switch (answers.toDo) {
        case 'View All Departments':
            viewDepartments();

        case 'View All Roles':
            viewRoles();
   
        case 'View All Employees':
            viewAllEmployees();
     
        // case 'Add a Department':
        //     addDepartment();
  
        // case 'Add a Role':
        //     addRole();

        // case 'Add an Employee':
        //     addEmployee();
    
        // case 'Update an Employee Role':
        //     updateEmployeeRole();
     
    };
   })
}
   


function viewDepartments() {
    db.query('SELECT * FROM departments;',(err, result) => {
        if (err) {
          console.log(err);
        }else{
            console.table(result);
        }
         })
    };

    function viewRoles() {
        db.query('SELECT * FROM roles;',(err, result) => {
            if (err) {
              console.log(err);
            }else{
                console.table(result);
            }
             })
        };


    function viewAllEmployees() {
        db.query('SELECT DISTINCT e1.id, e1.first_name, e1.last_name, roles.title, departments.name AS department, roles.salary, CONCAT(e2.first_name, " " , e2.last_name) AS manager FROM employees e1 INNER JOIN roles on e1.role_id = roles.id INNER JOIN departments on roles.department_id = departments.id LEFT JOIN employees e2 ON e1.manager_id = e2.id;' ,(err, result) => {
            if (err) {
              console.log(err);
            }else{
                console.table(result);
            }
             })
        };

    init();