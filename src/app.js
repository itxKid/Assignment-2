const createDatabase = require("./database");
const EventRepository = require("./repositories/eventRepository");
const AttendeeRepository = require("./repositories/attendeeRepository");
const EventService = require("./services/eventService");
const AttendanceService = require("./services/attendanceService");
const ReportGenerator = require("./reports/reportGenerator");

const db = createDatabase();

const eventRepo = new EventRepository(db);
const attendeeRepo = new AttendeeRepository(db);

const eventService = new EventService(eventRepo);
const attendanceService = new AttendanceService(eventRepo, attendeeRepo);
const reportGenerator = new ReportGenerator(eventRepo, attendeeRepo);

const event = eventService.createEvent("Tech Conference", "2026-04-01");

attendanceService.register(event.id, "John Doe", "john@email.com");
attendanceService.checkIn(event.id, "john@email.com");

console.log(reportGenerator.generateJSON(event.id));
console.log(reportGenerator.generateCSV(event.id));