/* eslint-disable no-console */
/* eslint-disable prettier/prettier */
/* eslint-disable indent */
/* eslint-disable global-require */
/* eslint-disable func-names */

const ExpenseStatistics = require('../model/expenseStatisticsModel');

const responseCallback = (res, callback) => function (err, result) {
    if (err) {
        console.log('Error:', err);
        res.status(500);
        res.send(err.sqlMessage);
    }
    else if (!result.dataByCategory || !result.dataByDays)
        res.status(404).send('Not found');
    else
        callback(res, result);
};

const handleListExpenses = (res, result) => {
    res.json(result);
};

exports.getStatisticData = (req, res) => {
    const userId = req.query.userId ? parseInt(req.query.userId, 10) : 0;
    const { type, year, weekStartDate, weekEndDate } = req.query;
    const params = { type, year, weekStartDate, weekEndDate, userId };
    ExpenseStatistics.getStatisticData(params, responseCallback(res, handleListExpenses));
}

