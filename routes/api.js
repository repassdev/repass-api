const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('../models/User');
const consts = require('../consts');

const router = express.Router();

router.post('/signup', (req, res) => {
  var salt = bcrypt.genSaltSync(10);
  var hash = bcrypt.hashSync(req.body.password, salt);

  var newUser = new User();

  newUser.name = req.body.name;
  newUser.email = req.body.email;
  newUser.password = hash;
  newUser.isAdmin = true;

  newUser.save((err, createdUser) => {
    if (err) {
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
});

router.post('/login', (req, res) => {
  User.findOne({ email: req.body.email }, (err, userFound) => {
    if (err) {
      return res.json({
        errors: [
          err
        ]
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
});

module.exports = router;