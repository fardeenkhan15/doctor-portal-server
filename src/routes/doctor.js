const express = require('express');
const { linkPatient, uploadPDF } = require('../controllers/doctorController');
const auth = require('../middleware/auth');
const multer = require('multer');
const multerS3 = require('multer-s3');
const s3 = require('../config/s3');

const upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: process.env.S3_BUCKET_NAME,
    key: (req, file, cb) => {
      cb(null, `${Date.now().toString()}-${file.originalname}`);
    },
  }),
});

const router = express.Router();

router.post('/link-patient', auth, linkPatient);
router.post('/upload-pdf', auth, upload.single('file'), uploadPDF);

module.exports = router;
