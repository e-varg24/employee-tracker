const mysql = require('mysql2');

const connection = mysql.createConnection(
    {
        host: 'localhost',
        user: 'root',
        password: 'Hollister@18',
        database: 'employee_db'
    }
);

module.exports = connection;