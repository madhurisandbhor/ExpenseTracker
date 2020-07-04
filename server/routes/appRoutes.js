/* eslint-disable prettier/prettier */
/* eslint-disable indent */
/* eslint-disable global-require */
/* eslint-disable func-names */
module.exports = function (app) {
  const expenseList = require('../api/expenseApi');

  // expenseList Routes

  app.route('/api/expense/:expenseId')
    .get(expenseList.readExpense)
    .put(expenseList.updateExpense)
    .delete(expenseList.deleteExpense);


  app.route('/api/expense')
    .get(expenseList.listAllExpenses)
    .post(expenseList.addExpense);
};