const mongoose = require('mongoose');

const doctorSchema = new mongoose.Schema({
  name: { type: String, required: true },
  specialty: { type: String, required: true },
  schedule: { type: Map, of: [String] }, // e.g., { Monday: ['10AM', '11AM'] }
});

module.exports = mongoose.model('Doctor', doctorSchema);
