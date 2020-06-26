const Expense = require('../model/expenseModel');

const responseCallback = (res, message) => {
    return function (err, result) {
        if (err) {
            console.log('Error:', err);
            res.send(err);
        } else if (message) {
            console.log('Message:', message);
            res.send(message);
        }
        else {
            res.json(result);
        }
    }
};

exports.listAllExpenses = (req, res) => {
    const searchText = req.query.search ? req.query.search : '';
    const page = parseInt(req.query.page, 10);
    const limit = parseInt(req.query.limit, 10);
    const offset = (page - 1) * limit;
    Expense.getExpenseList(page, limit, offset, searchText, responseCallback(res));
}

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
    Expense.getExpenseById(expenseId, responseCallback(res));
};

exports.updateExpense = (req, res) => {
    const updatedExpense = new Expense(req.body);
    Expense.updateExpenseById(
        req.params.expenseId, updatedExpense, responseCallback(res, 'Expense is updated'));
}