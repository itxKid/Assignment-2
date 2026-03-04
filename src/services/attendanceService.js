const { v4: uuid } = require("uuid");

class AttendanceService {
  constructor(eventRepository, attendeeRepository) {
    this.eventRepository = eventRepository;
    this.attendeeRepository = attendeeRepository;
  }

  register(eventId, name, email) {
    if (!name || !email) {
      throw new Error("Name and email required");
    }

    const event = this.eventRepository.findById(eventId);
    if (!event) {
      throw new Error("Event not found");
    }

    return this.attendeeRepository.register({
      id: uuid(),
      eventId,
      name,
      email
    });
  }

  checkIn(eventId, email) {
    const attendee = this.attendeeRepository.findByEmail(eventId, email);

    if (!attendee) {
      throw new Error("Attendee not registered");
    }

    if (attendee.checked_in === 1) {
      throw new Error("Already checked in");
    }

    this.attendeeRepository.checkIn(eventId, email);
  }
}

module.exports = AttendanceService;