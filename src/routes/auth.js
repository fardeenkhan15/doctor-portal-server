const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// Define the login route for doctors
router.post('/doctor/login', authController.doctorLogin);
router.post('/doctor/signup', authController.doctorSignup);
router.post('/patient/login', authController.patientLogin);
router.post('/patient/signup', authController.patientSignup);

module.exports = router;
