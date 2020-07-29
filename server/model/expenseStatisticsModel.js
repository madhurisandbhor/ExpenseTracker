/* eslint-disable no-console */
/* eslint-disable prettier/prettier */
/* eslint-disable indent */
/* eslint-disable global-require */
/* eslint-disable func-names */


const connection = require('./db');

const ExpenseStatistics = {};

ExpenseStatistics.getCatgeoryStatistic = function (handleResponse) {
    connection.query("SELECT category, sum(amount) as aggrAmount FROM expense GROUP BY category", handleResponse);
};

module.exports = ExpenseStatistics;