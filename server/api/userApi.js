/* eslint-disable no-console */
/* eslint-disable prettier/prettier */
/* eslint-disable indent */
/* eslint-disable global-require */
/* eslint-disable func-names */

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../model/userModel');
const saltRounds = 10;

const maxAge = 3 * 24 * 60 * 60;

const createToken = id => (jwt.sign({ id }, 'nivdung secret', {
    expiresIn: maxAge,
}));

const responseCallback = (res, callback, user) => function (err, result) {
    if (err) {
        console.log('Error:', err);
        res.status(500);
        if (err.sqlMessage.includes('Duplicate entry')) {
            res.send('User with this email id already exists');
        }
        else res.send(err.sqlMessage);
    }
    else if (result.length === 0)
        res.status(404).send(`User doesn't exist`);
    else
        callback(res, result, user);
};

const handleAddUser = (res, result) => {
    res.status(201).location(`/api/user/${result.insertId}`).send('User registration successful! Please login');
    res.end();
}

const handleuserLogin = (res, result, user) => {
    if (result.length > 0) {
        bcrypt.compare(user.password, result[0].password, function (err, output) {
            if (output) {
                const userName = result[0].lastName ? `${result[0].firstName} ${result[0].lastName}` : result[0].firstName;
                const userID = result[0].id ? result[0].id : 0;
                const token = createToken(userID);
                res.cookie('jwt', token, { httpOnly: false, maxAge: maxAge * 1000 });
                res.status(200).send({ message: 'Login successful', username: userName, userId: userID });
                res.end();
            } else if (!output || err)
                res.status(401).send('Invalid credentials');
        });
    }
    else res.status(401).send('Invalid credentials');
}

const handleUserData = (res, result) => {
    const userName = result[0].lastName ? `${result[0].firstName} ${result[0].lastName}` : result[0].firstName;
    const userID = result[0].id ? result[0].id : 0;
    res.status(200).send({ username: userName, userId: userID });
};
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
    else {
        bcrypt.hash(newUser.password, saltRounds, function (err, hash) {
            newUser.password = hash;
            newUser.firstName = newUser.firstName && newUser.firstName[0].toUpperCase() + newUser.firstName.substr(1);
            newUser.lastName = newUser.lastName && newUser.lastName[0].toUpperCase() + newUser.lastName.substr(1);
            User.addUser(newUser, (responseCallback(res, handleAddUser)));
            if (err) {
                res.status(400).send(errMessage);
            }
        });
    }
}

exports.userLogin = (req, res) => {
    const user = new User(req.body);
    if (!user.emailId || !user.password)
        res.status(400).send('Invalid username or password');
    else
        User.userLogin(user, (responseCallback(res, handleuserLogin, user)));
}

exports.authenticate = (req, res) => {
    const token = req.cookies.jwt;
    if (token) {
        jwt.verify(token, 'nivdung secret', (err, decodedToken) => {
            if (err) {
                console.log(err.message);
                res.send(401);
            } else {
                res.locals.id = decodedToken.id;
                const userId = decodedToken.id;
                if (!userId)
                    res.status(400).send('Invalid token/user id');
                else
                    User.getUserData(userId, (responseCallback(res, handleUserData)));
            }
        });
    }
    else {
        console.log('jwt cookie not available');
        res.sendStatus(401);
    }
};