const connection = require('./db');

var Expense = function (expense) {
    this.description = expense.description;
    this.amount = expense.amount;
    this.category = expense.category;
    this.expense_date = expense.expense_date;
};

// const handleResponse = result => {
//     return (err, response) => {
//         result(err, response);
//     }
// }

Expense.getExpenseList = (searchText, handleResponse) => {
    if (!searchText) {
        connection.query('select * from expense', handleResponse);
    } else {
        const searchKeyword = `%${searchText}%`;
        connection.query("select * from expense WHERE category LIKE ? or description LIKE ?",
            [searchKeyword, searchKeyword], handleResponse);
    }
};

Expense.addExpense = (newExpense, handleResponse) => {
    connection.query("insert into expense set ?", newExpense, handleResponse);
};


Expense.getExpenseById = function (expenseId, handleResponse) {
    connection.query("Select * from expense where id = ? ", expenseId, handleResponse);
};

Expense.updateExpenseById = (id, updatedExpense, handleResponse) => {
    connection.query("update expense set description=?, amount=?, category=?, expense_date=? where id = ?",
        [updatedExpense.description, updatedExpense.amount, updatedExpense.category, updatedExpense.expense_date, id],
        handleResponse);
};


module.exports = Expense;