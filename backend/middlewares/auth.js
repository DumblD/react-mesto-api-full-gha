const jwt = require('jsonwebtoken');
const UnauthorizedError = require('../utils/customErrorsClasses/UnauthorizedError');

const auth = async (req, res, next) => {
  let payload;
  const token = req.cookies.jwt;
  const jwtSecretKey = process.env.NODE_ENV === 'production' ? process.env.JWT_SECRET : 'jwt-secret-key';
  try {
    payload = jwt.verify(token, jwtSecretKey);
  } catch (err) {
    next(new UnauthorizedError('Неуспешная авторизация'));
    return;
  }
  req.user = payload;
  next();
};

module.exports = auth;
