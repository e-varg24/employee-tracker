const connection = require('../config/connection');
const cTable = require('console.table');

class Employee {
    constructor (id, first_name, last_name, role_id, manager_id) {
        this.id = id;
        this.first_name = first_name;
        this.last_name = last_name;
        this.role_id = role_id;
        this.manager_id = manager_id;
    }

    showAllEmployees () {
        const sql = 'SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name AS department, role.salary, CONCAT(manager.first_name, \' \', manager.last_name) AS manager From employee LEFT JOIN role ON role.id = employee.role_id LEFT JOIN department ON department.id = role.department_id LEFT Join employee AS manager ON manager.id = employee.manager_id ORDER BY employee.id ASC;';

        return connection.promise()
            .query(sql)
            .then(([rows, fields]) => {
                console.table(rows);
            })
            .catch((err) => {
                console.error(err);
            });
    };

    showEmployeesByManager () {
        const sql = 'SELECT manager.id, CONCAT(manager.first_name, \' \', manager.last_name) AS manager, department.name AS department, COUNT(employee.id) AS total_num_of_employee, GROUP_CONCAT(DISTINCT CONCAT(employee.first_name, \' \', employee.last_name) ORDER BY employee.first_name SEPARATOR \', \') AS employees From employee LEFT JOIN role ON role.id = employee.role_id LEFT JOIN department ON department.id = role.department_id LEFT Join employee AS manager ON manager.id = employee.manager_id WHERE manager.id IS NOT NULL GROUP BY manager.id ORDER BY manager.id ASC;'

        return connection.promise()
            .query(sql)
            .then(([rows, fields]) => {
                console.table(rows);
            })
            .catch((err) => {
                console.error(err);
            });
    };

    showEmployeesByDepartment () {
        const sql = 'SELECT department.id, department.name AS department, COUNT(employee.id) AS total_num_of_employee, GROUP_CONCAT(DISTINCT CONCAT(employee.first_name, \' \', employee.last_name) ORDER BY employee.first_name SEPARATOR \', \') AS employees From department LEFT JOIN role ON role.department_id = department.id LEFT JOIN employee ON employee.role_id = role.id LEFT Join employee AS manager ON manager.id = employee.manager_id GROUP BY department.name ORDER BY department.id ASC;'

        return connection.promise()
            .query(sql)
            .then(([rows, fields]) => {
                console.table(rows);
            })
            .catch((err) => {
                console.error(err);
            });
    };

    getEmployeeNames () {
        const query = `SELECT first_name, last_name FROM employee;`;

        return connection.promise()
            .query(query)
            .then(([rows, fields]) => {
                let employeeArr = [];
                rows.map((row) => {
                    const fullName = row['first_name'] + ' ' + row['last_name']
                    employeeArr.push(fullName);
                });
                return employeeArr;
            })
            .catch((err) => {
                console.error(err);
            });
    };

    getManagerNames () {
        const query = `SELECT first_name, last_name FROM employee;`;

        return connection.promise()
            .query(query)
            .then(([rows, fields]) => {
                let employeeArr = [];
                employeeArr.push('None');
                rows.map((row) => {
                    const fullName = row['first_name'] + ' ' + row['last_name']
                    employeeArr.push(fullName);
                });
                return employeeArr;
            })
            .catch((err) => {
                console.error(err);
            });
    };

    addEmployee (firstName, lastName, roleTitle, managerName) {
        const sql1 = `SELECT id FROM role WHERE title = '${roleTitle}';`;

        return connection.promise()
            .query(sql1)
            .then(([rows, fields]) => {
                const roleId = rows[0]['id'];

                if (managerName === 'None') {
                    const sql2 = `INSERT INTO employee (first_name, last_name, role_id) VALUES ('${firstName}', '${lastName}', '${roleId}');`;

                    connection.promise()
                        .query(sql2)
                        .then(([rows, fields]) => {
                            console.info(`'${firstName} ${lastName}' added to the database`);
                        })
                }
                else {
                    const sql3 = `SELECT id FROM employee WHERE first_name = '${managerName.split(' ')[0]}' AND last_name = '${managerName.split(' ')[1]}';`;

                    connection.promise()
                        .query(sql3)
                        .then(([rows, fields]) => {
                            const managerId = rows[0]['id'];

                            const sql4 = `INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ('${firstName}', '${lastName}', '${roleId}', '${managerId}');`;

                            connection.promise()
                                .query(sql4)
                                .then(([rows, fields]) => {
                                    console.info(`'${firstName} ${lastName}' added to the database`);
                                })
                        })
                }
            })
            .catch((err) => {
                console.error(err);
            });
    }

    updateEmployeeRole (employeeName, newRoleTitle) {
        const sql1 = `SELECT id FROM role WHERE title = '${newRoleTitle}';`;

        return connection.promise()
            .query(sql1)
            .then(([rows, fields]) => {
                const roleId = rows[0]['id'];

                const sql2 = `UPDATE employee SET role_id = ${roleId} WHERE first_name = '${employeeName.split(' ')[0]}' AND last_name = '${employeeName.split(' ')[1]}';`;

                connection.promise()
                    .query(sql2)
                    .then(([rows, fields]) => {
                        console.info(`${employeeName}\'s role updated`);
                    })
            })
            .catch((err) => {
                console.error(err);
            });
    };

    updateEmployeeManager (employeeName, newManagerName) {
        if (newManagerName === 'None') {
            const sql1 = `UPDATE employee SET manager_id = null WHERE first_name = '${employeeName.split(' ')[0]}' AND last_name = '${employeeName.split(' ')[1]}';`;

            return connection.promise()
                .query(sql1)
                .then(([rows, fields]) => {
                    console.info(`${employeeName}\'s manager updated`);
                })
                .catch((err) => {
                    console.error(err);
                });
        }
        else {
            const sql2 = `SELECT id FROM employee WHERE first_name = '${newManagerName.split(' ')[0]}' AND last_name = '${newManagerName.split(' ')[1]}';`;

            return connection.promise()
                .query(sql2)
                .then(([rows, fields]) => {
                    const managerId = rows[0]['id'];

                    const sql3 = `UPDATE employee SET manager_id = ${managerId} WHERE first_name = '${employeeName.split(' ')[0]}' AND last_name = '${employeeName.split(' ')[1]}';`;

                    connection.promise()
                        .query(sql3)
                        .then(([rows, fields]) => {
                            console.info(`${employeeName}\'s manager updated`);
                        })
                })
                .catch((err) => {
                    console.error(err);
                });
        };
    }

    deleteEmployee (employeeName) {
        const query = `DELETE FROM employee WHERE first_name = '${employeeName.split(' ')[0]}' AND last_name = '${employeeName.split(' ')[1]}';`;

        return connection.promise()
            .query(query)
            .then(([rows, fields]) => {
                console.info(`'${employeeName}' deleted from the database`);
            })
            .catch((err) => {
                console.error(err);
            });
    };
};

module.exports = Employee;