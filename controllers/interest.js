const Event = require('../models/Event');
const Ticket = require('../models/Ticket');
const Interest = require('../models/Interest');
const User = require('../models/User');

exports.create = (req, res) => {
  Ticket.findById(req.body.ticket, (errTicket, ticketFound) => {
    if (errTicket) {
      return res.status(400).json({
        ...errTicket
      });
    } else {
      User.findById(ticketFound.owner, (errUser, userFound) => {
        if (errUser) {
          return res.status(400).json({
            ...errUser
          });
        } else {
          var newInterest = new Interest();

          newInterest.seller = userFound._id;
          newInterest.buyer = req.userData.id;
          newInterest.ticket = ticketFound._id;
          newInterest.date = req.body.date;

          newInterest.save((errInterest, createdInterest) => {
            if (errInterest) {
              return res.status(400).json({
                ...errInterest
              });
            } else {
              return res.status(200).json({
                interest: createdInterest
              });
            }
          });
        }
      });
    }
  });
}

exports.delete = (req, res) => {
  Interest.findByIdAndDelete(req.params.id, (errInterest, interestDeleted) => {
    if (errInterest) {
      return res.status(400).json({
        ...errInterest
      });
    } else if (!interestDeleted) {
      return res.status(400).json({
        errors: [
          "Interesse não existente."
        ]
      });
    } else {
      return res.status(200).json({
        interest: interestDeleted
      });
    }
  });
}