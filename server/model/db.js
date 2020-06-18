const mysql = require('mysql');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'mysql1234',
    database: 'expense'
});

module.exports = connection;