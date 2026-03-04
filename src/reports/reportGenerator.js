class ReportGenerator {
  constructor(eventRepository, attendeeRepository) {
    this.eventRepository = eventRepository;
    this.attendeeRepository = attendeeRepository;
  }

  generateJSON(eventId) {
    const event = this.eventRepository.findById(eventId);
    const all = this.attendeeRepository.getAllByEvent(eventId);
    const checked = this.attendeeRepository.getCheckedIn(eventId);

    return {
      eventName: event.name,
      totalRegistered: all.length,
      totalCheckedIn: checked.length,
      checkedInAttendees: checked.map(a => a.name)
    };
  }

  generateCSV(eventId) {
    const report = this.generateJSON(eventId);

    let csv = `Event Name,${report.eventName}\n`;
    csv += `Total Registered,${report.totalRegistered}\n`;
    csv += `Total Checked In,${report.totalCheckedIn}\n\n`;
    csv += `Checked-In Attendees\n`;
    report.checkedInAttendees.forEach(name => {
      csv += `${name}\n`;
    });

    return csv;
  }
}

module.exports = ReportGenerator;