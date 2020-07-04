/* eslint-disable no-console */
/* eslint-disable prettier/prettier */
/* eslint-disable indent */
/* eslint-disable global-require */
/* eslint-disable func-names */


const mysql = require('mysql');
const connection = require('./db');

const Expense = function (expense) {
    this.description = expense.description;
    this.amount = expense.amount;
    this.category = expense.category;
    this.expense_date = expense.expense_date;
};

const info = {
    totalCount: '',
    pages: '',
    next: '',
    prev: '',
};

Expense.getExpenseList = function (page, limit, offset, searchText, handleResponse) {
    let startNum = 0;
    let LimitNum = 10;
    let totalCount = 0;

    const totalRecordsQuery = "Select count(*) as TotalCount from expense";
    const searchKeyword = `%${searchText}%`;
    const searchRecordsQuery = mysql.format('select count(*) as TotalCount from expense where expense_date like ? or description like ? or category like ? or amount like ?',
        [searchKeyword, searchKeyword, searchKeyword, searchKeyword]);

    let query = searchText ? searchRecordsQuery : totalRecordsQuery;
    connection.query(query, function (err, rows) {
        if (err) {
            return err;
        }
        totalCount = rows[0].TotalCount
        if (offset !== '' || limit !== '') {
            startNum = offset;
            LimitNum = limit;
        }

        if (!searchText) {
            query = mysql.format('select * from expense ORDER BY expense_date DESC limit ? offset ?', [LimitNum, startNum]);
        } else {
            query = mysql.format(
                'select * from expense where expense_date like ? or description like ? or category like ? or amount like ? ORDER BY expense_date DESC limit ? offset ?',
                [searchKeyword, searchKeyword, searchKeyword, searchKeyword, LimitNum, startNum]);
        }

        connection.query(query, function (err, rows) {
            if (err) {
                handleResponse(err, null);
            }
            else {
                info.totalCount = totalCount;
                info.pages = Math.ceil(info.totalCount / LimitNum);
                info.next = page < info.pages ? `http://localhost:4000/api/expense/?page=${page + 1}&limit=${LimitNum}&search=${searchText}` : '';
                info.prev = page > 1 ? `http://localhost:4000/api/expense/?page=${page - 1}&limit=${LimitNum}&search=${searchText}` : '';
                handleResponse(null, { "info": info, "result": rows });
            }
        });
    });
}

Expense.addExpense = (newExpense, handleResponse) => {
    connection.query("insert into expense set ?", newExpense, handleResponse);
};

Expense.getExpenseById = function (expenseId, handleResponse) {
    connection.query("select * from expense where id = ? ", expenseId, handleResponse);
};

Expense.updateExpenseById = (id, updatedExpense, handleResponse) => {
    connection.query("update expense set description=?, amount=?, category=?, expense_date=? where id = ?",
        [updatedExpense.description, updatedExpense.amount, updatedExpense.category, updatedExpense.expense_date, id],
        handleResponse);
};

Expense.deleteExpenseById = function (expenseId, handleResponse) {
    connection.query("delete from expense where id = ? ", expenseId, handleResponse);
};

module.exports = Expense;