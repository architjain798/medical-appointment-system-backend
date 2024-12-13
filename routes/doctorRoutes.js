const express = require('express');
const { getDoctors } = require('../controllers/doctorController');

const router = express.Router();

router.get('/', getDoctors);

module.exports = router;
