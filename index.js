// imoort modules/packages
const inquirer = require('inquirer');
const connection = require('./config/connection');
const Department = require('./lib/Department');
const Role = require('./lib/Role');
const Employee = require('./lib/Employee');

// new class obj.

const department = new Department();
const role = new Role();
const employee = new Employee();

// questions for initial promt
const initialQuestions = [
    {
        name: 'userChoice',
        type: 'list',
        message: 'What would you like to view!?',
        choices: [
            'View all departments',
            'Add a department',
            'Delete a department',
            'View all roles',
            'Add role',
            'Delete role',
            'View all employees',
            'View employees by manager',
            'View employees by department',
            'Add employee',
            'Update a employee role',
            'Update a employee manager',
            'Delete employee',
            'View utilized budget of department',
            'Quit'
        ]
    }
];