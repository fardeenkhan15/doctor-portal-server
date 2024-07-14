const express = require('express');
const { getPDFs } = require('../controllers/patientController');
const auth = require('../middleware/auth');

const router = express.Router();

router.get('/:patientId/pdfs', auth, getPDFs);

module.exports = router;
