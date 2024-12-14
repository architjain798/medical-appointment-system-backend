const Appointment = require('../models/Appointment');
const Doctor = require('../models/Docter');
const { isSlotAvailable } = require('../utils/availabilityChecker');
const moment = require('moment');

// Book an appointment
exports.bookAppointment = async (req, res) => {
  try {
    const { doctor, date, startTime, endTime } = req.body;

    // Fetch the doctor's schedule for the given date
    const doctorDetails = await Doctor.findById(doctor);
    if (!doctorDetails) {
      return res.status(404).json({ message: 'Doctor not found.' });
    }

    const schedule = doctorDetails.schedule.find(slot => slot.date === date);

    if (!schedule) {
      return res.status(400).json({ message: 'Doctor is not available on this date.' });
    }

    // Check if the requested time is within the doctor's availability
    const requestedStart = moment(startTime, "HH:mm");
    const requestedEnd = moment(endTime, "HH:mm");
    const scheduleStart = moment(schedule.start, "HH:mm");
    const scheduleEnd = moment(schedule.end, "HH:mm");

    if (
      requestedStart.isBefore(scheduleStart) ||
      requestedEnd.isAfter(scheduleEnd) ||
      !requestedStart.isBefore(requestedEnd)
    ) {
      return res.status(400).json({ message: 'Requested time is outside the doctor’s available hours.' });
    }

    // Check for overlapping appointments
    const available = await isSlotAvailable(doctor, date, startTime, endTime);
    if (!available) {
      return res.status(400).json({ message: 'The requested time slot is already booked.' });
    }

    // Create the appointment
    const newAppointment = new Appointment({
      user: req.user.id,
      doctor,
      date,
      time: { start: startTime, end: endTime },
      status: 'Pending'
    });

    await newAppointment.save();
    res.status(201).json({ message: 'Appointment booked successfully', appointment: newAppointment });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Fetch appointments for the logged-in user
exports.getAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.find({ user: req.user.id }).populate('doctor', 'name specialty');
    res.status(200).json({ appointments });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update an appointment
exports.updateAppointment = async (req, res) => {
  try {
    const {  id :appointmentId } = req.params;
    const { date, startTime, endTime } = req.body;

    const appointment = await Appointment.findById(appointmentId);
    if (!appointment) {
      return res.status(404).json({ message: 'Appointment not found.' });
    }

    // Validate the new time slot
    const available = await isSlotAvailable(appointment.doctor, date, startTime, endTime);
    if (!available) {
      return res.status(400).json({ message: 'The requested time slot is already booked.' });
    }

    appointment.date = date;
    appointment.time = { start: startTime, end: endTime };
    await appointment.save();

    res.status(200).json({ message: 'Appointment updated successfully', appointment });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Cancel an appointment
exports.cancelAppointment = async (req, res) => {
  try {
    const { id:appointmentId } = req.params;

    const appointment = await Appointment.findById(appointmentId);
    if (!appointment) {
      return res.status(404).json({ message: 'Appointment not found.' });
    }

    await Appointment.findByIdAndDelete(appointmentId);
    res.status(200).json({ message: 'Appointment cancelled successfully.' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
