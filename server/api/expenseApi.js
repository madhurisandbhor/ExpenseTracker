const Expense = require('../model/expenseModel');

const responseCallback = (res, message) => {
    return (err, result) => {
        if (err) {
            console.log('Error:', err);
            res.send(err);
        }
        else if (message !== undefined)
            res.send(message);
        else
            res.json(result);
    }
};


exports.listAllExpenses = (req, res) => {
    const searchText = req.query.search;
    Expense.getExpenseList(searchText, responseCallback(res));
};

exports.addExpense = (req, res) => {
    const new_expense = new Expense(req.body);

    if (!new_expense.description || !new_expense.expense_date) {
        res.status(400).send({ error: true, message: 'Please provide description/date' });
    }
    else {
        Expense.addExpense(new_expense, responseCallback(res, 'Expense is added'));
    }
};

exports.readExpense = (req, res) => {
    const expenseId = req.params.expenseId;
    Expense.getExpenseById(expenseId, function (err, expense) {
        if (err)
            res.send(err);
        res.json(expense);
    });
};

exports.updateExpense = (req, res) => {
    const updatedExpense = new Expense(req.body);
    Expense.updateExpenseById(
        req.params.expenseId, updatedExpense, responseCallback(res, 'Expense is updated'));
}