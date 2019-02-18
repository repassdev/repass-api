const Event = require('../models/Event');

exports.create = (req, res) => {
  var newEvent = new Event();

  newEvent.name = req.body.name;
  newEvent.place = req.body.place;
  newEvent.image = req.body.image;

  newEvent.save((errEvent, createdEvent) => {
    if (errEvent) {
      return res.status(400).json({
        ...errEvent
      });
    } else {
      return res.status(200).json({
        event: createdEvent
      });
    }
  });
}

exports.delete = (req, res) => {
  Event.findByIdAndDelete(req.params.id, (errEvent, eventDeleted) => {
    if (errEvent) {
      return res.status(400).json({
        ...errEvent
      });
    } else if (!eventDeleted) {
      return res.status(400).json({
        errors: [
          "Evento não existente."
        ]
      });
    } else {
      return res.status(200).json({
        event: eventDeleted
      });
    }
  });
}

exports.getEvent = (req, res) => {
  Event.findById(req.params.id, (errEvent, eventFound) => {
    if (errEvent) {
      return res.status(400).json({
        ...errEvent
      });
    } else {
      return res.status(200).json({
        event: eventFound
      });
    }
  });
}

exports.getEvents = (req, res) => {
  Event.find((errEvent, eventsFound) => {
    if (errEvent) {
      return res.status(400).json({
        ...errEvent
      });
    } else {
      return res.status(200).json({
        events: eventsFound
      });
    }
  });
}