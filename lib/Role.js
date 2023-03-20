const connection = require('../config/connection');
const cTable = require('console.table');

class Role {
    constructor (id, title, salary, department_id) {
        this.id = id;
        this.title = title;
        this.salary = salary;
        this.department_id = department_id;
    };

    showAllRoles () {
        const sql = `SELECT role.id, role.title, department.name AS department, role.salary FROM role LEFT JOIN department ON department.id = role.department_id ORDER BY role.id ASC;`;

        return connection.promise()
            .query(sql)
            .then(([rows, fields]) => {
                console.table(rows);
            })
            .catch((err) => {
                console.error(err);
            });
    };

    getRoleTitles () {
        const query = `SELECT title FROM role;`;

        return connection.promise()
            .query(query)
            .then(([rows, fields]) => {
                let roleArr = [];

                rows.map((row) => {
                    roleArr.push(row['title']);
                });
                return roleArr;
            })
            .catch((err) => {
                console.error(err);
            });
    };

    addRole (title, salary, departmentName) {
        const sql1 = `SELECT id FROM department WHERE name = '${departmentName}';`;

        return connection.promise()
            .query(sql1)
            .then(([rows, fields]) => {
                const departmentId = rows[0]['id'];

                const sql2 = `INSERT INTO role (title, salary, department_id) VALUES ('${title}', '${salary}', '${departmentId}');`;

                connection.promise()
                    .query(sql2)
                    .then(([rows, fields]) => {
                        console.info(`'${title}' added to the database`);
                    })
            })
            .catch((err) => {
                console.error(err);
            });
    };

    deleteRole (title) {
        const query = `DELETE FROM role WHERE title = '${title}';`;

        return connection.promise()
            .query(query)
            .then(([rows, fields]) => {
                console.info(`'${title}' deleted from the database`);
            })
            .catch((err) => {
                console.error(err);
            });
    };
};

module.exports = Role;