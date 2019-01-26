const express = require('express');

const UserController = require('../controllers/user');
const checkAdmin = require('../helpers/check-admin');

const router = express.Router();

router.post('/signup', UserController.signup);

router.post('/login', UserController.login);

router.delete('/:id', checkAdmin, UserController.delete);

module.exports = router;