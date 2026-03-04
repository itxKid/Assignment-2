const EventService = require("../../src/services/eventService");
const AttendanceService = require("../../src/services/attendanceService");

test("should throw error if event name is empty", () => {
  const mockRepo = { save: jest.fn() };
  const service = new EventService(mockRepo);

  expect(() => {
    service.createEvent("", "2026-04-01");
  }).toThrow("Event name required");
});



test("should not register if event does not exist", () => {
  const mockEventRepo = { findById: jest.fn(() => null) };
  const mockAttendeeRepo = {};

  const service = new AttendanceService(mockEventRepo, mockAttendeeRepo);

  expect(() => {
    service.register("fake-id", "John", "john@email.com");
  }).toThrow("Event not found");
});

test("should require name and email", () => {
  const mockEventRepo = { findById: jest.fn(() => ({ id: "1" })) };
  const mockAttendeeRepo = {};

  const service = new AttendanceService(mockEventRepo, mockAttendeeRepo);

  expect(() => {
    service.register("1", "", "");
  }).toThrow("Name and email required");
});

test("should not check in unregistered attendee", () => {
  const mockEventRepo = {};
  const mockAttendeeRepo = {
    findByEmail: jest.fn(() => null)
  };

  const service = new AttendanceService(mockEventRepo, mockAttendeeRepo);

  expect(() => {
    service.checkIn("1", "test@email.com");
  }).toThrow("Attendee not registered");
});

test("should not allow double check-in", () => {
  const mockEventRepo = {};
  const mockAttendeeRepo = {
    findByEmail: jest.fn(() => ({
      checked_in: 1
    }))
  };

  const service = new AttendanceService(mockEventRepo, mockAttendeeRepo);

  expect(() => {
    service.checkIn("1", "john@email.com");
  }).toThrow("Already checked in");
});