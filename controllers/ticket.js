const Event = require('../models/Event');
const Ticket = require('../models/Ticket');

exports.create = (req, res) => {
  Event.findById(req.body.event, (errEvent, eventFound) => {
    if (errEvent) {
      return res.status(400).json({
        ...errEvent
      });
    } else {
      var newTicket = new Ticket();

      newTicket.owner = req.userData.id;
      newTicket.name = req.body.name;
      newTicket.date = req.body.date;
      newTicket.price = req.body.price;
      newTicket.description = req.body.description;
      newTicket.event = eventFound._id;

      newTicket.save((errTicket, createdTicket) => {
        if (errTicket) {
          return res.status(400).json({
            ...errTicket
          });
        } else {
          return res.status(200).json({
            ticket: createdTicket
          });
        }
      });
    }
  });
}

exports.delete = (req, res) => {
  Ticket.findById(req.params.id, (errTicket, ticketFound) => {
    if (errTicket) {
      return res.status(400).json({
        ...errTicket
      });
    } else {
      if (req.userData.id == ticketFound.owner) {
        Ticket.findByIdAndDelete(req.params.id, (errTicket2, ticketDeleted) => {
          if (errTicket2) {
            return res.status(400).json({
              ...errTicket2
            });
          } else if (!ticketDeleted) {
            return res.status(400).json({
              errors: [
                "Ingresso não existente."
              ]
            });
          } else {
            return res.status(200).json({
              ticket: ticketDeleted
            });
          }
        });
      }
    }
  });
}

exports.getTicket = (req, res) => {
  Ticket.findById(req.params.id).
    populate('event').
    populate('owner').
    exec(function (errTicket, ticketFound) {
      if (errTicket) {
        return res.status(400).json({
          ...errTicket
        });
      } else {
        return res.status(200).json({
          ticket: ticketFound
        });
      }
    });
}

exports.getTickets = (req, res) => {
  Ticket.find().
    populate('event').
    exec(function (errTicket, ticketsFound) {
      if (errTicket) {
        return res.status(400).json({
          ...errTicket
        });
      } else {
        return res.status(200).json({
          tickets: ticketsFound
        });
      }
    });
}

exports.getUserTickets = (req, res) => {
  Ticket.find({ owner: req.userData.id }).
    populate('event').
    exec(function (errTicket, ticketsFound) {
      if (errTicket) {
        return res.status(400).json({
          ...errTicket
        });
      } else {
        return res.status(200).json({
          tickets: ticketsFound
        });
      }
    });
}