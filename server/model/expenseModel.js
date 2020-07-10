/* eslint-disable no-console */
/* eslint-disable prettier/prettier */
/* eslint-disable indent */
/* eslint-disable global-require */
/* eslint-disable func-names */


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

Expense.getExpenseList = function (
    { page,
        limit,
        offset,
        searchText,
        fromDate,
        toDate,
        fromAmount,
        toAmount,
        categories },
    handleResponse) {

    let startNum = 0;
    let limitNum = 10;
    let totalCount = 0;
    let multiConditionFlag = false;

    let queryToAppend = '';
    if (fromDate || toDate || searchText || toAmount || fromAmount || categories) {
        queryToAppend += ` WHERE `;

        if (searchText) {
            queryToAppend += `description like '%${searchText}%'`;
            multiConditionFlag = true;
        }

        if (categories) {
            if (multiConditionFlag)
                queryToAppend += ` AND `;
            queryToAppend += `category IN (${categories})`;
            multiConditionFlag = true;
        }

        if (fromDate || toDate) {
            if (multiConditionFlag)
                queryToAppend += ` AND `;
            if (fromDate && toDate)
                queryToAppend += `expense_date BETWEEN '${fromDate}' and '${toDate}'`;
            else if (fromDate || toDate)
                queryToAppend += `expense_date='${fromDate || toDate}'`;
            multiConditionFlag = true;
        }

        if (fromAmount !== 0 || toAmount !== 0) {
            if (multiConditionFlag)
                queryToAppend += ' AND ';
            if (fromAmount !== 0 && toAmount !== 0)
                queryToAppend += `amount BETWEEN ${fromAmount} and ${toAmount}`;
            else if (fromAmount !== 0 || toAmount !== 0)
                queryToAppend += `amount=${fromAmount || toAmount}`;
        }
    }

    const totalRecordsQuery = "SELECT count(*) as TotalCount from expense";

    let query = totalRecordsQuery + queryToAppend;

    connection.query(query, function (err, rows) {
        if (err) {
            handleResponse(err, null);
        }
        totalCount = rows[0].TotalCount;
        if (offset !== '' || limit !== '') {
            startNum = offset;
            limitNum = limit;
        }

        const limitQuery = 'SELECT * from expense';
        query = limitQuery + queryToAppend;

        query += ` ORDER BY expense_date DESC LIMIT ${limitNum} OFFSET ${startNum}`;

        connection.query(query, function (err, rows) {
            if (err) {
                handleResponse(err, null);
            }
            else {
                info.totalCount = totalCount;
                info.pages = Math.ceil(info.totalCount / limitNum);
                info.next = page < info.pages ? `http://localhost:4000/api/expense/?page=${page + 1}&limit=${limitNum}&search=${searchText}` : '';
                info.prev = page > 1 ? `http://localhost:4000/api/expense/?page=${page - 1}&limit=${limitNum}&search=${searchText}` : '';
                handleResponse(null, { "info": info, "result": rows });
            }
        });
    });
}

Expense.addExpense = (newExpense, handleResponse) => {
    connection.query("INSERT into expense set ?", newExpense, handleResponse);
};

Expense.getExpenseById = function (expenseId, handleResponse) {
    connection.query("SELECT * from expense where id = ? ", expenseId, handleResponse);
};

Expense.updateExpenseById = (id, updatedExpense, handleResponse) => {
    connection.query("UPDATE expense set description=?, amount=?, category=?, expense_date=? where id = ?",
        [updatedExpense.description, updatedExpense.amount, updatedExpense.category, updatedExpense.expense_date, id],
        handleResponse);
};

Expense.deleteExpenseById = function (expenseId, handleResponse) {
    connection.query("DELETE from expense where id = ? ", expenseId, handleResponse);
};

module.exports = Expense;