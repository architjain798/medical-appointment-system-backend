const Doctor = require('../models/Docter');

exports.getDoctors = async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query; // Get page and limit from query params
    const doctors = await Doctor.find()
      .skip((page - 1) * limit) // Skip the documents for previous pages
      .limit(parseInt(limit)); // Limit the number of documents per page

    const totalDoctors = await Doctor.countDocuments(); // Total number of doctors

    res.status(200).json({
      doctors,
      totalPages: Math.ceil(totalDoctors / limit),
      currentPage: parseInt(page),
    });
  } catch (err) {
    res.status(500).json({ message: 'Error fetching doctors', error: err.message });
  }
};
