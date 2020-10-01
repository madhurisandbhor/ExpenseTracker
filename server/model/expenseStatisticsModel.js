/* eslint-disable no-console */
/* eslint-disable prettier/prettier */
/* eslint-disable indent */
/* eslint-disable global-require */
/* eslint-disable func-names */


const connection = require('./db');

const ExpenseStatistics = {};

ExpenseStatistics.getStatisticData = function ({ userId, type, year, weekStartDate, weekEndDate }, handleResponse) {

    const dataByCategoryQuery = `SELECT category, round((total_by_cat/total * 100),0) as percentage 
    FROM
     (SELECT category, sum(amount) as total_by_cat 
      FROM expense where user_id=${userId} GROUP BY category) as sum_by_cat 
    JOIN (SELECT sum(amount) as total FROM expense where user_id=${userId}) as total_amnt`;

    const dataByYearQuery = `SELECT YEAR(e.expense_date) as date, 
    sum(amount) as totalAmount
    FROM expense e
    WHERE user_id=${userId}
    GROUP BY YEAR(e.expense_date) 
    ORDER BY e.expense_date asc`;

    const dataByMonthQuery = `SELECT MONTHNAME(e.expense_date) as date, sum(amount) as totalAmount
    FROM expense e
    where user_id=${userId}
    AND YEAR(e.expense_date) = ${year}
    GROUP BY MONTH(e.expense_date) 
    ORDER BY e.expense_date asc`;

    const dataByWeekQuery = `SELECT expense_date as date, amount as totalAmount
    FROM expense 
    WHERE user_id=${userId}
    AND expense_date BETWEEN '${weekStartDate}' and '${weekEndDate}'`;

    let dataByDaysQuery = '';
    if (type === 'yearly')
        dataByDaysQuery = dataByYearQuery;
    else if (type === 'monthly')
        dataByDaysQuery = dataByMonthQuery;
    else dataByDaysQuery = dataByWeekQuery;

    connection.query(`${dataByCategoryQuery}; ${dataByDaysQuery};`, function (err, results) {
        if (err)
            handleResponse(err, null);
        else
            handleResponse(null, { "dataByCategory": results[0], "dataByDays": results[1] })
    });
};

module.exports = ExpenseStatistics;