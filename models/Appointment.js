const mongoose = require('mongoose');

const appointmentSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  doctor: { type: mongoose.Schema.Types.ObjectId, ref: 'Doctor', required: true },
  date: { type: String, required: true }, // e.g., "2024-12-20"
  time: { // Custom time window for the appointment
    start: { type: String, required: true }, // e.g., "10:00"
    end: { type: String, required: true } // e.g., "11:30"
  },
  status: { type: String, default: 'Pending' } // e.g., "Pending", "Confirmed", "Cancelled"
});

module.exports = mongoose.model('Appointment', appointmentSchema);
