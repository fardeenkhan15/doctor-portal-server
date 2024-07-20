// routes/patient.js
const express = require('express');
const { getPatients, getPatientById, getAvailablePatients } = require('../controllers/patientController');
const { addComment } = require('../controllers/commentController');

const auth = require('../middleware/auth');

const router = express.Router();

router.get('/', auth, getPatients);
router.get('/available', auth, getAvailablePatients);
router.get('/:id', auth, getPatientById);
router.post('/:patientId/comments', auth, addComment);

module.exports = router;
