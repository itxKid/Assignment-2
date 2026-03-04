class EventRepository {
  constructor(db) {
    this.db = db;
  }

  save(event) {
    const stmt = this.db.prepare(`
      INSERT INTO events (id, name, date)
      VALUES (?, ?, ?)
    `);

    stmt.run(event.id, event.name, event.date);
    return event;
  }

  findById(id) {
    return this.db.prepare("SELECT * FROM events WHERE id = ?").get(id);
  }
}

module.exports = EventRepository;