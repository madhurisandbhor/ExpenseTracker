/* eslint-disable prettier/prettier */
const mysql = require('mysql');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'mysql1234',
  database: 'expense',
  dateStrings: true,
  multipleStatements: true,
});

module.exports = connection;
