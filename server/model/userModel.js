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

// Expense.getExpenseById = function (expenseId, handleResponse) {
//     connection.query("SELECT * from expense where id = ? ", expenseId, handleResponse);
// };

// Expense.updateExpenseById = (id, updatedExpense, handleResponse) => {
//     connection.query("UPDATE expense set description=?, amount=?, category=?, expense_date=? where id = ?",
//         [updatedExpense.description, updatedExpense.amount, updatedExpense.category, updatedExpense.expense_date, id],
//         handleResponse);
// };

// Expense.deleteExpenseById = function (expenseId, handleResponse) {
//     connection.query("DELETE from expense where id = ? ", expenseId, handleResponse);
// };

module.exports = User;