const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('../models/User');
const consts = require('../consts');

exports.signup = (req, res) => {
  var salt = bcrypt.genSaltSync(10);
  var hash = bcrypt.hashSync(req.body.password, salt);

  var newUser = new User();

  newUser.name = req.body.name;
  newUser.cpf = req.body.cpf;
  newUser.addressStreet = req.body.addressStreet;
  newUser.addressNumber = req.body.addressNumber;
  newUser.addressCity = req.body.addressCity;
  newUser.addressCountry = req.body.addressCountry;
  newUser.phone = req.body.phone;
  newUser.email = req.body.email;
  newUser.password = hash;
  newUser.isAdmin = true;

  newUser.save((errUser, createdUser) => {
    if (errUser) {
      return res.status(400).json({
        errors: [
          "Email já utilizado."
        ]
      });
    } else {
      const payload = {
        id: createdUser._id
      };

      const token = jwt.sign(payload, consts.consts.RSA_PRIVATE_KEY, { expiresIn: '30d' });

      return res.status(200).json({
        user: {
          name: createdUser.name,
        },
        token: token
      });
    }
  });
}

exports.login = (req, res) => {
  User.findOne({ email: req.body.email }, (errUser, userFound) => {
    if (errUser) {
      return res.status(400).json({
        ...errUser
      });
    } else {
      if (userFound) {
        if (bcrypt.compareSync(req.body.password, userFound.password)) {
          const payload = {
            id: userFound._id
          };

          const token = jwt.sign(payload, consts.consts.RSA_PRIVATE_KEY, { expiresIn: '30d' });

          return res.status(200).json({
            user: {
              name: userFound.name,
            },
            token: token
          });
        } else {
          return res.status(400).json({
            errors: [
              "Senha incorreta."
            ]
          });
        }
      } else {
        return res.status(400).json({
          errors: [
            "Email não existente."
          ]
        });
      }
    }
  });
}

exports.delete = (req, res) => {
  User.findByIdAndDelete(decoded.id, (errUser, userDeleted) => {
    if (errUser) {
      return res.status(400).json({
        ...errUser
      });
    } else {
      return res.status(200).json({
        user: userDeleted
      });
    }
  });
}