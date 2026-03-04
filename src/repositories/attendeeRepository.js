class AttendeeRepository {
  constructor(db) {
    this.db = db;
  }

  register(attendee) {
    const stmt = this.db.prepare(`
      INSERT INTO attendees (id, event_id, name, email)
      VALUES (?, ?, ?, ?)
    `);

    stmt.run(attendee.id, attendee.eventId, attendee.name, attendee.email);
    return attendee;
  }

  findByEmail(eventId, email) {
    return this.db.prepare(
      "SELECT * FROM attendees WHERE event_id = ? AND email = ?"
    ).get(eventId, email);
  }

  checkIn(eventId, email) {
    return this.db.prepare(`
      UPDATE attendees
      SET checked_in = 1
      WHERE event_id = ? AND email = ?
    `).run(eventId, email);
  }

  getAllByEvent(eventId) {
    return this.db.prepare(
      "SELECT * FROM attendees WHERE event_id = ?"
    ).all(eventId);
  }

  getCheckedIn(eventId) {
    return this.db.prepare(
      "SELECT * FROM attendees WHERE event_id = ? AND checked_in = 1"
    ).all(eventId);
  }
}

module.exports = AttendeeRepository;