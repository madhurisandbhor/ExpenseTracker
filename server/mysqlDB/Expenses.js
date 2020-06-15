const connection = require('./db');

const Expenses = expense => {
    this.description = expense.description;
    this.amount = expense.amount;
    this.expenseDate = expense.expenseDate;
};

Expenses.getExpenseList = result => {
    connection.query('select * from expense', function (err, rows) {
        if (err) {
            console.log("error: ", err);
            result(null, err);
        }
        else {
            result(null, rows);
        }
    });
};

Expenses.addExpense = (newExpense, result) => {
    connection.query("insert into expense set ?", newExpense, function (err, res) {
        if (err) {
            console.log("error: ", err);
            result(err, null);
        }
        else {
            result(null, res);
        }
    });
};

module.exports = Expenses;