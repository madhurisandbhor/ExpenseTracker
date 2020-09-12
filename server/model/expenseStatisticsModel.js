/* eslint-disable no-console */
/* eslint-disable prettier/prettier */
/* eslint-disable indent */
/* eslint-disable global-require */
/* eslint-disable func-names */


const connection = require('./db');

const ExpenseStatistics = {};
 
ExpenseStatistics.getStatisticData = function (userId, expenseBy, handleResponse) {
    const dataByCategoryQuery = `SELECT category, round((total_by_cat/total * 100),0) as percentage 
    FROM
     (SELECT category, sum(amount) as total_by_cat 
      FROM expense where user_id=${userId} GROUP BY category) as sum_by_cat 
    JOIN (SELECT sum(amount) as total FROM expense) as total_amnt`;

    const dataByYearQuery = `SELECT YEAR(e.expense_date) as year, sum(amount) as totalAmount
    FROM expense e
    WHERE user_id=${userId}
    GROUP BY YEAR(e.expense_date) asc`;

    connection.query(`${dataByCategoryQuery} ; ${dataByYearQuery}`, function (err, results) {
        if (err)
            handleResponse(err, null);
        else
        handleResponse(null, { "dataByCategory": results[0], "dataByDays": results[1] })
    });
};

module.exports = ExpenseStatistics;