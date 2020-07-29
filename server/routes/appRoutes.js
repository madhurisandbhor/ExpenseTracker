/* eslint-disable prettier/prettier */
/* eslint-disable indent */
/* eslint-disable global-require */
/* eslint-disable func-names */
module.exports = function (app) {
  const expenseApi = require('../api/expenseApi');
  const expenseStatisticsApi = require('../api/expenseStatisticsApi');

  // expenseApi Routes

  app.route('/api/expense/:expenseId')
    .get(expenseApi.readExpense)
    .put(expenseApi.updateExpense)
    .delete(expenseApi.deleteExpense);


  app.route('/api/expense')
    .get(expenseApi.listAllExpenses)
    .post(expenseApi.addExpense);

  app.route('/api/expenseStatistics/categories')
    .get(expenseStatisticsApi.getCatgeoryStatistic);

};