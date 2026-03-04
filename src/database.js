createDatabase(":memory:")

function createDatabase(dbFile = "event.db") {
  const db = new Database(dbFile);

  db.exec(`
    CREATE TABLE IF NOT EXISTS events (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      date TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS attendees (
      id TEXT PRIMARY KEY,
      event_id TEXT NOT NULL,
      name TEXT NOT NULL,
      email TEXT NOT NULL,
      checked_in INTEGER DEFAULT 0,
      UNIQUE(event_id, email),
      FOREIGN KEY(event_id) REFERENCES events(id)
    );
  `);

  return db;
}

module.exports = createDatabase;