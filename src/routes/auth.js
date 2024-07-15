const express = require('express');
const { registerDoctor, registerPatient, loginDoctor, loginPatient } = require('../controllers/authController');
const router = express.Router();

router.post('/register/doctor', registerDoctor);
router.post('/register/patient', registerPatient);
router.post('/login/doctor', loginDoctor);
router.post('/login/patient', loginPatient);

module.exports = router;
