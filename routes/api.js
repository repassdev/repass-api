const express = require('express');

const consts = require('../consts');

const router = express.Router();

const userRoutes = require('./user');
const ticketRoutes = require('./ticket');
const eventRoutes = require('./event');
router.use('/user', userRoutes);
router.use('/ticket', ticketRoutes);
router.use('/event', eventRoutes);

module.exports = router;