createDatabase(":memory:")

test("register attendee is stored and retrievable", () => {
  const db = createDatabase(":memory:");
  const eventRepo = new EventRepository(db);
  const attendeeRepo = new AttendeeRepository(db);

  const eventService = new EventService(eventRepo);
  const attendanceService = new AttendanceService(eventRepo, attendeeRepo);

  const event = eventService.createEvent("Conference", "2026-04-01");

  attendanceService.register(event.id, "John Doe", "john@email.com");

  const saved = attendeeRepo.findByEmail(event.id, "john@email.com");

  expect(saved.name).toBe("John Doe");
});

test("register and check-in reflects in report", () => {
  const db = createDatabase(":memory:");
  const eventRepo = new EventRepository(db);
  const attendeeRepo = new AttendeeRepository(db);

  const eventService = new EventService(eventRepo);
  const attendanceService = new AttendanceService(eventRepo, attendeeRepo);
  const reportGenerator = new ReportGenerator(eventRepo, attendeeRepo);

  const event = eventService.createEvent("Conference", "2026-04-01");

  attendanceService.register(event.id, "John Doe", "john@email.com");
  attendanceService.checkIn(event.id, "john@email.com");

  const report = reportGenerator.generateJSON(event.id);

  expect(report.totalRegistered).toBe(1);
  expect(report.totalCheckedIn).toBe(1);
});

test("full workflow from event creation to report", () => {
  const db = createDatabase(":memory:");
  const eventRepo = new EventRepository(db);
  const attendeeRepo = new AttendeeRepository(db);

  const eventService = new EventService(eventRepo);
  const attendanceService = new AttendanceService(eventRepo, attendeeRepo);
  const reportGenerator = new ReportGenerator(eventRepo, attendeeRepo);

  const event = eventService.createEvent("Tech Expo", "2026-05-01");

  attendanceService.register(event.id, "John", "john@email.com");
  attendanceService.register(event.id, "Jane", "jane@email.com");

  attendanceService.checkIn(event.id, "john@email.com");

  const report = reportGenerator.generateJSON(event.id);

  expect(report.totalRegistered).toBe(2);
  expect(report.totalCheckedIn).toBe(1);
  expect(report.checkedInAttendees).toContain("John");
});