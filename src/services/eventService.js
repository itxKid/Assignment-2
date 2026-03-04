const { v4: uuid } = require("uuid");

class EventService {
  constructor(eventRepository) {
    this.eventRepository = eventRepository;
  }

  createEvent(name, date) {
    if (!name || name.trim() === "") {
      throw new Error("Event name required");
    }

    const event = {
      id: uuid(),
      name,
      date
    };

    return this.eventRepository.save(event);
  }
}

module.exports = EventService;