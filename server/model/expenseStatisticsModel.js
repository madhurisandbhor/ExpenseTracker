/* eslint-disable no-console */
/* eslint-disable prettier/prettier */
/* eslint-disable indent */
/* eslint-disable global-require */
/* eslint-disable func-names */


const connection = require('./db');

const ExpenseStatistics = {};

ExpenseStatistics.getCatgeoryStatistic = function (handleResponse) {
    connection.query(`SELECT category, round((total_by_cat/total * 100),0) as percentage from (SELECT category, sum(amount) as total_by_cat FROM expense GROUP BY category) as sum_by_cat join (SELECT sum(amount) as total FROM expense) as total_amnt`, handleResponse);
    // connection.query("SELECT category, sum(amount) as aggrAmount FROM expense GROUP BY category", handleResponse);
};

module.exports = ExpenseStatistics;