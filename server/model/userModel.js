/* eslint-disable no-console */
/* eslint-disable prettier/prettier */
/* eslint-disable indent */
/* eslint-disable global-require */
/* eslint-disable func-names */


const connection = require('./db');

const User = function (user) {
    this.firstName = user.firstName;
    this.lastName = user.lastName;
    this.emailId = user.emailId;
    this.password = user.password;
};

User.addUser = (newUser, handleResponse) => {
    connection.query("INSERT into user set ?", newUser, handleResponse);
};

User.userLogin = (user, handleResponse) => {
    connection.query(`SELECT * from user WHERE emailId ='${user.emailId}'`, user, handleResponse);
}

module.exports = User;