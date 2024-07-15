const express = require('express');
const { getPatients, getPatientById } = require('../controllers/patientController');
const auth = require('../middleware/auth');

const router = express.Router();

router.get('/', auth, getPatients);
router.get('/:id', auth, getPatientById);

module.exports = router;
