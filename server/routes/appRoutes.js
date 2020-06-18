module.exports = function (app) {
  const expenseList = require('../api/expenseApi');

  // expenseList Routes

    app.route('/api/expense/:expenseId')
    .get(expenseList.readExpense)
    .put(expenseList.updateExpense);


  app.route('/api/expense')
    .get(expenseList.listAllExpenses)
    .post(expenseList.addExpense);

};