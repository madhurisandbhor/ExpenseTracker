const Expenses = require('../MysqlDB/Expenses');

exports.list_all_expenses = (req, res) => {
    Expenses.getExpenseList(function (err, expenseList) {
        if (err)
            res.send(err);
        res.json(expenseList);
    });
};

exports.add_expense = (req, res) => {
    const new_expense = req.body;

    if (!new_expense.description || !new_expense['expense-date']) {
        res.status(400).send({ error: true, message: 'Please provide description/date' });
    }
    else {
        Expenses.addExpense(new_expense, function (err, expense) {
            if (err)
                res.send(err);
            res.send('Expense is added');
        });
    }
};
