// src/routes/doctorRoutes.js

const express = require('express');
const { linkPatient, uploadPDF, getPatientsByDoctor } = require('../controllers/doctorController');
const { getCommentsByPatientId } = require('../controllers/commentController');
const auth = require('../middleware/auth');
const multer = require('multer');

const router = express.Router();

const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 50 * 1024 * 1024 // 50MB limit
  }
});

router.post('/link-patient', auth, linkPatient);
router.post('/upload-pdf', auth, upload.single('file'), uploadPDF);
router.get('/:doctorId/patients', auth, getPatientsByDoctor);
router.get('/:patientId/comments', auth, getCommentsByPatientId);

module.exports = router;