/* eslint-disable no-console */
/* eslint-disable prettier/prettier */
/* eslint-disable indent */
/* eslint-disable global-require */
/* eslint-disable func-names */

const User = require('../model/userModel');

const responseCallback = (res, callback) => function (err, result) {
    if (err) {
        console.log('Error:', err);
        res.status(500);
        if (err.sqlMessage.includes('Duplicate entry')) {
            res.send('User with this email id already exists');
        }
        else res.send(err.sqlMessage);
    }
    else if (result.length === 0)
        res.status(404).send('Not found');
    else
        callback(res, result);
};

const handleAddUser = (res, result) => {
    res.status(201).location(`/api/user/${result.insertId}`).send('User added.');
    res.end();
}

const validate = user => {
    const message = [];
    if (!user.firstName)
        message.push('first_name');
    if (!user.emailId)
        message.push('email_id');
    if (!user.password)
        message.push('password');
    if (message.length !== 0) {
        message.unshift('Invalid');
        return message.join(' ');
    }
    return message;
}

exports.addUser = (req, res) => {
    const newUser = new User(req.body);
    const errMessage = validate(newUser);
    if (errMessage.length !== 0)
        res.status(400).send(errMessage);
    else
        User.addUser(newUser, (responseCallback(res, handleAddUser)));
}

