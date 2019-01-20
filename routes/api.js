const express = require('express');

const consts = require('../consts');

const router = express.Router();

const authRoutes = require('./auth');
const ticketRoutes = require('./ticket');
const eventRoutes = require('./event');
router.use('/', authRoutes);
router.use('/', ticketRoutes);
router.use('/', eventRoutes);

module.exports = router;