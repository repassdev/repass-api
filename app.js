const express = require('express')
const app = express();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const bodyParser = require('body-parser');

const User = require('./models/User');

mongoose.connect('mongodb://admin:repass123@ds125073.mlab.com:25073/repass_dev');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.json('Repass');
});

app.post('/api/register', (req, res) => {
  var salt = bcrypt.genSaltSync(10);
  var hash = bcrypt.hashSync(req.body.password, salt);

  var user = new User();

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

app.post('/api/login', (req, res) => {
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

app.listen(3000);