const express = require('express');

const TicketController = require('../controllers/ticket');
const checkAuth = require('../helpers/check-auth');

const router = express.Router();

router.post('/', checkAuth, TicketController.create);

router.delete('/:id', checkAuth, TicketController.delete);

router.get('/:id', TicketController.getTicket);

router.get('/', TicketController.getTickets);

module.exports = router;