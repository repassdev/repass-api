const express = require('express');
const jwt = require('jsonwebtoken');

const User = require('../models/User');
const Event = require('../models/Event');
const consts = require('../consts');

const router = express.Router();

router.post('/event', (req, res) => {
  jwt.verify(req.body.token, consts.consts.RSA_PRIVATE_KEY, function (errToken, decoded) {
    User.findById(decoded.id, (errUser, userFound) => {
      var newEvent = new Event();

      newEvent.name = req.body.name;
      newEvent.place = req.body.place;
      newEvent.image = req.body.image;

      newEvent.save((errEvent, createdEvent) => {
        return res.status(200).json({
          event: createdEvent
        });
      });
    });
  });
});

router.delete('/event/:id', (req, res) => {
  jwt.verify(req.body.token, consts.consts.RSA_PRIVATE_KEY, function (errToken, decoded) {
    User.findById(decoded.id, (errUser, userFound) => {
      Event.findByIdAndDelete(req.params.id, (errEvent, eventDeleted) => {
        return res.status(200).json({
          event: eventDeleted
        });
      });
    });
  });
});

router.get('/event/:id', (req, res) => {
  Event.findById(req.params.id, (errEvent, eventFound) => {
    return res.status(200).json({
      event: eventFound
    });
  });
});

router.get('/event', (req, res) => {
  Event.find((errEvent, eventsFound) => {
    return res.status(200).json({
      events: eventsFound
    });
  });
});

module.exports = router;