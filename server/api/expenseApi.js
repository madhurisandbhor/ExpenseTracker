/* eslint-disable no-console */
/* eslint-disable prettier/prettier */
/* eslint-disable indent */
/* eslint-disable global-require */
/* eslint-disable func-names */

const Expense = require('../model/expenseModel');

const responseCallback = (res, callback) => function (err, result) {
    if (err) {
        console.log('Error:', err);
        res.status(500);
        res.send(err.sqlMessage);
    }
    else if (result.length === 0)
        res.status(404).send('Not found');
    else
        callback(res, result);
};

const handleListExpenses = (res, result) => {
    res.json(result);
}

const handleGetExpenseById = (res, result) => {
    res.json(result[0]);
}

const handleAdd = (res, result) => {
    res.status(201).location(`/api/expense/${result.insertId}`).send('Expense added.');
    res.end();
}

const handleUpdate = res => {
    res.status(200).send('Expense updated.');
}

const handleDelete = res => {
    res.status(200).send('Expense deleted.');
}

exports.listAllExpenses = (req, res) => {
    const searchText = req.query.search ? req.query.search : '';
    const page = req.query.page ? parseInt(req.query.page, 10) : '';
    const limit = req.query.limit ? parseInt(req.query.limit, 10) : '';
    const offset = limit ? (page - 1) * limit : '';
    const fromDate = req.query.fromDate ? req.query.fromDate : '';
    const toDate = req.query.toDate ? req.query.toDate : '';
    const fromAmount = req.query.fromAmount ? parseInt(req.query.fromAmount, 10) : '';
    const toAmount = req.query.toAmount ? parseInt(req.query.toAmount, 10) : '';
    Expense.getExpenseList(page, limit, offset, searchText, fromDate, toDate, fromAmount, toAmount, responseCallback(res, handleListExpenses));
}

const validate = expense => {
    const message = [];
    if (!expense.amount)
        message.push('amount');
    if (!expense.description)
        message.push('description');
    if (!expense.expense_date)
        message.push('expense_date');
    if (message.length !== 0) {
        message.unshift('Invalid');
        return message.join(' ');
    }
    return message;
}

exports.addExpense = (req, res) => {
    const newExpense = new Expense(req.body);
    const errMessage = validate(newExpense);
    if (errMessage.length !== 0)
        res.status(400).send(errMessage);
    else Expense.addExpense(newExpense, responseCallback(res, handleAdd));
};

exports.readExpense = (req, res) => {
    const { expenseId } = req.params;
    Expense.getExpenseById(expenseId, responseCallback(res, handleGetExpenseById));
};

exports.updateExpense = (req, res) => {
    const updatedExpense = new Expense(req.body);
    const errMessage = validate(updatedExpense);
    if (errMessage.length !== 0)
        res.status(400).send(errMessage);
    else Expense.updateExpenseById(
        req.params.expenseId, updatedExpense, responseCallback(res, handleUpdate));
};

exports.deleteExpense = (req, res) => {
    const { expenseId } = req.params;
    Expense.deleteExpenseById(expenseId, responseCallback(res, handleDelete));
};
