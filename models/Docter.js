const mongoose = require('mongoose');

const doctorSchema = new mongoose.Schema({
  name: { type: String, required: true },
  specialty: { type: String, required: true },
  schedule: [
    {
      date: { type: String, required: true }, // e.g., "2024-12-20"
      start: { type: String, required: true }, // e.g., "09:00"
      end: { type: String, required: true } // e.g., "17:00"
    }
  ]
});

module.exports = mongoose.model('Doctor', doctorSchema);
