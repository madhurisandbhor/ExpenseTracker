module.exports = function (app) {
  const expenseList = require('../api/expenseApi');

  // expenseList Routes
  app.route('/api/expense')
    .get(expenseList.list_all_expenses)
    .post(expenseList.add_expense);
};