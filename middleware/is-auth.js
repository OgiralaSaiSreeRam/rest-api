const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  const authHeader = req.get('Authorization');
  // console.log(authHeader);
  if (!authHeader) {
    req.isAuth = false;
    const error = new Error('Not authenticated.');
    error.statusCode = 401;
    throw error;
    // return next();
  }
  const token = authHeader.split(' ')[1];
  // console.log('inside isauth '+token);
  let decodedToken;
  try {
    decodedToken = jwt.verify(token, 'somesupersecretsecret');
  } catch (err) {
    err.statusCode = 500;
    throw err;
  }
  if (!decodedToken) {
    req.isAuth = false; //does this ever happen cuz the catch above already handles it when not verified.
    return next();
  }
  req.userId = decodedToken.userId;
  req.isAuth=true
  // console.log('success');
  next();
};
