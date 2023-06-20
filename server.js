const mysql = require('mysql2');
const inquirer = require('inquirer');
const db = mysql.createConnection(
    {
        host: 'localhost',
        user: 'root',
        password: '12345678',
        database: 'employeeInfo_db'
    },
    console.log('Connected to the employeeInfo_db database')
);