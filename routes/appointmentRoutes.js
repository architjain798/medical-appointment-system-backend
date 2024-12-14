const express = require('express');
const {
  getAppointments,
  bookAppointment,
  updateAppointment,
  cancelAppointment,
} = require('../controllers/appointmentController');
const { auth } = require('../middleware/authMiddleware');

const router = express.Router();

router.get('/', auth, getAppointments);
router.post('/', auth, bookAppointment);
router.put('/:id', auth, updateAppointment);
router.delete('/:id', auth, cancelAppointment);

module.exports = router;
