/* eslint-disable no-console */
/* eslint-disable prettier/prettier */
/* eslint-disable indent */
/* eslint-disable global-require */
/* eslint-disable func-names */

const Expense = require('../model/expenseModel');

const responseCallback = (res, message, getById) => function (err, result) {
    if (err) {
        console.log('Error:', err);
        res.status(500);
        res.send(err);
    } else if (message) {
        console.log('Message:', message);
        res.send(message);
    }
    else if (result.length === 0)
        res.status(404).send('Not found');
    else if (getById)
        res.json(result[0]);
    else
        res.json(result);
};

exports.listAllExpenses = (req, res) => {
    const searchText = req.query.search ? req.query.search : '';
    const page = req.query.page ? parseInt(req.query.page, 10) : '';
    const limit = req.query.limit ? parseInt(req.query.limit, 10) : '';
    const offset = limit ? (page - 1) * limit : '';
    Expense.getExpenseList(page, limit, offset, searchText, responseCallback(res));
}

exports.addExpense = (req, res) => {
    const newExpense = new Expense(req.body);

    if (!newExpense.description || !newExpense.expense_date) {
        res.status(400).send({ error: true, message: 'Invalid description/date' });
    }
    else {
        Expense.addExpense(newExpense, responseCallback(res, 'Expense is added'));
    }
};

exports.readExpense = (req, res) => {
    const { expenseId } = req.params;
    Expense.getExpenseById(expenseId, responseCallback(res, null, true));
};

exports.updateExpense = (req, res) => {
    const updatedExpense = new Expense(req.body);
    const message = [];
    if (updatedExpense.amount === '')
        message.push('amount');
    if (updatedExpense.description === '')
        message.push('description');
    if (updatedExpense.expense_date === '')
        message.push('expense-date');
    if (message.length !== 0) {
        message.unshift('Invalid');
        const errMessage = message.join(' ');
        res.status(400).send({ error: true, message: errMessage });
    }
    Expense.updateExpenseById(
        req.params.expenseId, updatedExpense, responseCallback(res, 'Expense is updated'));
}