const Appointment = require('../models/Appointment');
const moment = require('moment');

/**
 * Checks if a time slot is available for a doctor on a specific date.
 *
 * @param {string} doctorId - The ID of the doctor.
 * @param {string} date - The date to check availability (format: YYYY-MM-DD).
 * @param {string} startTime - The start time of the requested slot (format: HH:mm).
 * @param {string} endTime - The end time of the requested slot (format: HH:mm).
 * @returns {Promise<boolean>} - Returns true if the slot is available, otherwise false.
 */
exports.isSlotAvailable = async (doctorId, date, startTime, endTime) => {
  const appointments = await Appointment.find({ doctor: doctorId, date });

  const requestedStart = moment(startTime, "HH:mm");
  const requestedEnd = moment(endTime, "HH:mm");

  for (const appointment of appointments) {
    const existingStart = moment(appointment.time.start, "HH:mm");
    const existingEnd = moment(appointment.time.end, "HH:mm");

    // Check for overlapping time slots
    if (
      requestedStart.isBetween(existingStart, existingEnd, null, '[)') ||
      requestedEnd.isBetween(existingStart, existingEnd, null, '(]') ||
      existingStart.isBetween(requestedStart, requestedEnd, null, '[)') ||
      existingEnd.isBetween(requestedStart, requestedEnd, null, '(]')
    ) {
      return false;
    }
  }

  return true;
};
