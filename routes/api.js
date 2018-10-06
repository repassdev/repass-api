const express = require('express');
const bcrypt = require('bcryptjs');

const User = require('../models/User');

const router = express.Router();

router.post('/register', (req, res) => {
  var salt = bcrypt.genSaltSync(10);
  var hash = bcrypt.hashSync(req.body.password, salt);

  var newUser = new User();

  newUser.email = req.body.email;
  newUser.password = hash;
  newUser.admin = true;

  newUser.save((err, createdUser) => {
    if(err){
      return res.json(`Error: ${err}`);
    }else{
      return res.json(`User created: ${createdUser}`);
    }
  });
});

router.post('/login', (req, res) => {
  User.findOne({ email: req.body.email }, (err, userFound) => {
    if(err){
      return res.json(`Error: ${err}`);
    }else{
      if(userFound){
        if(bcrypt.compareSync(req.body.password, userFound.password)){
          return res.json("User logged in.");
        }else{
          return res.json("Wrong password.");
        }
      }else{
        return res.json("User not found.");
      }
    }
  });
});

module.exports = router;