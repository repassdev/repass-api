const express = require('express');

const EventController = require('../controllers/event');
const checkAuth = require('../helpers/check-auth');

const router = express.Router();

router.post('/', checkAuth, EventController.create);

router.delete('/:id', checkAuth, EventController.delete);

router.get('/:id', EventController.getEvent);

router.get('/', EventController.getEvents);

module.exports = router;