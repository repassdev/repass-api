const jwt = require('jsonwebtoken');

const consts = require('../consts');
const User = require('../models/User');

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    jwt.verify(token, consts.consts.RSA_PRIVATE_KEY, function (errToken, decoded) {
      User.findById(decoded.id, (errUser, userFound) => {
        if (errUser) {
          return res.status(401).json({
            ...errUser
          });
        } else {
          req.userData = decoded;
          next();
        }
      });
    });
  } catch (error) {
    return res.status(401).json({
      message: 'Auth failed'
    });
  }
};