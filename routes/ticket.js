const express = require('express');
const jwt = require('jsonwebtoken');

const User = require('../models/User');
const Event = require('../models/Event');
const Ticket = require('../models/Ticket');
const consts = require('../consts');

const router = express.Router();

router.post('/ticket', (req, res) => {
  jwt.verify(req.body.token, consts.consts.RSA_PRIVATE_KEY, function (errToken, decoded) {
    User.findById(decoded.id, (errUser, userFound) => {
      Event.findById(req.body.event, (errEvent, eventFound) => {
        var newTicket = new Ticket();

        newTicket.owner = userFound._id;
        newTicket.name = req.body.name;
        newTicket.date = req.body.date;
        newTicket.price = req.body.price;
        newTicket.description = req.body.decription;
        newTicket.event = eventFound._id;

        newTicket.save((errTicket, createdTicket) => {
          if (errTicket) {
            return res.status(400).json({
              errors: [
                errTicket
              ]
            });
          } else {
            return res.status(200).json({
              ticket: createdTicket
            });
          }
        });
      });
    });
  });
});

router.delete('/ticket/:id', (req, res) => {
  jwt.verify(req.body.token, consts.consts.RSA_PRIVATE_KEY, function (errToken, decoded) {
    User.findById(decoded.id, (errUser, userFound) => {
      Ticket.findByIdAndDelete(req.params.id, (errTicket, ticketDeleted) => {
        return res.status(200).json({
          ticket: ticketDeleted
        });
      });
    });
  });
});

router.get('/ticket/:id', (req, res) => {
  Ticket.findById(req.params.id, (errTicket, ticketFound) => {
    return res.status(200).json({
      ticket: ticketFound
    });
  });
});

router.get('/ticket', (req, res) => {
  Ticket.find((errTicket, ticketsFound) => {
    return res.status(200).json({
      tickets: ticketsFound
    });
  });
});

module.exports = router;