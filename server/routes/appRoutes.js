/* eslint-disable prettier/prettier */
/* eslint-disable indent */
/* eslint-disable global-require */
/* eslint-disable func-names */
module.exports = function (app) {
  const expenseApi = require('../api/expenseApi');
  const expenseStatisticsApi = require('../api/expenseStatisticsApi');
  const userApi = require('../api/userApi');
  const requireAuth = require('../middlewares/authMiddleware');

  // expenseApi Routes

  app.route('/api/expense/:expenseId')
    .get(expenseApi.readExpense)
    .put(expenseApi.updateExpense)
    .delete(expenseApi.deleteExpense);


  app.route('/api/expense')
    .get(expenseApi.listAllExpenses)
    .post(expenseApi.addExpense);

  app.route('/api/expenseStatistics')
    .get(expenseStatisticsApi.getStatisticData);

  app.route('/api/user')
    .post(userApi.addUser);

  app.route('/api/login')
    .post(userApi.userLogin);

  app.route('/api/authUser')
    .get(userApi.authenticate);

};