/* eslint-disable no-console */
const jwt = require('jsonwebtoken');

const requireAuth = (req, res, next) => {
  const token = req.cookies.jwt;
  if (token) {
    jwt.verify(token, 'nivdung secret', (err, decodedToken) => {
      if (err) {
        console.log(err.message);
        res.send(401);
      } else {
        console.log(decodedToken);
        next();
      }
    });
  } else {
    console.log('jwt cookie not available');
    res.send(401);
  }
};

module.exports = { requireAuth };
