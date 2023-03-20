const connection = require('../config/connection');
const cTable = require('console.table');

class Department {
    constructor (id, name) {
        this.id = id;
        this.name = name;
    };

    showAllDepartments () {
        const sql = `SELECT id, name FROM department ORDER BY id ASC;`;

        return connection.promise()
            .query(sql)
            .then(([rows, fields]) => {
                console.table(rows);
            })
            .catch((err) => {
                console.error(err);
            });
    };

    getDepartmentNames () {
        const query = `SELECT name FROM department;`;

        return connection.promise()
            .query(query)
            .then(([rows, fields]) => {
                let departmentArr = [];

                rows.map((row) => {
                    departmentArr.push(row['name']);
                });
                return departmentArr;
            })
            .catch((err) => {
                console.error(err);
            });
    };

    showBudgetByDepartment () {
        const sql = 'SELECT department.id, department.name AS department, SUM(role.salary) AS total_utilized_budget From department LEFT JOIN role ON role.department_id = department.id LEFT JOIN employee ON employee.role_id = role.id LEFT Join employee AS manager ON manager.id = employee.manager_id GROUP BY department.name ORDER BY department.id ASC;'

        return connection.promise()
            .query(sql)
            .then(([rows, fields]) => {
                console.table(rows);
            })
            .catch((err) => {
                console.error(err);
            });
    };

    addDepartment (name) {
        const query = `INSERT INTO department (name) VALUES ('${name}');`;

        return connection.promise()
            .query(query)
            .then(([rows, fields]) => {
                console.info(`'${name}' added to the database`);
            })
            .catch((err) => {
                console.error(err);
            });
    };

    deleteDepartment (name) {
        const query = `DELETE FROM department WHERE name = '${name}';`;

        return connection.promise()
            .query(query)
            .then(([rows, fields]) => {
                console.info(`'${name}' deleted from the database`);
            })
            .catch((err) => {
                console.error(err);
            });
    };
};

module.exports = Department;