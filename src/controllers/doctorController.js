// src/controllers/doctorController.js

const Doctor = require('../models/Doctor');
const Patient = require('../models/Patient');
const PDF = require('../models/PDF');
const DoctorPatient = require('../models/DoctorPatient');
const { uploadPDFToS3 } = require('../services/pdfService');

const linkPatient = async (req, res) => {
  try {
    const DoctorId = req.user.id;
    const { PatientId } = req.body;

    console.log('Received in linkPatient:', { DoctorId, PatientId });

    if (!PatientId) {
      return res.status(400).json({ message: 'PatientId is required' });
    }

    const existingLink = await DoctorPatient.findOne({ where: { PatientId } });

    if (existingLink) {
      return res.status(400).json({ message: 'Patient is already linked to a doctor' });
    }

    await DoctorPatient.create({ DoctorId, PatientId });
    await Patient.update({ doctorId: DoctorId, isAvailable: false }, { where: { id: PatientId } });
    res.status(200).json({ message: 'Patient linked successfully' });
  } catch (error) {
    console.error('Error linking patient to doctor:', error);
    res.status(500).json({ message: 'Internal server error', error: error.message });
  }
};

const getPatientsByDoctor = async (req, res) => {
  try {
    const doctorId = req.params.doctorId;
    const doctor = await Doctor.findByPk(doctorId, {
      include: [{ model: Patient, through: DoctorPatient }]
    });
    if (!doctor) {
      return res.status(404).json({ error: 'Doctor not found' });
    }
    res.json(doctor.Patients);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
};

const uploadPDF = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    const filePath = await uploadPDFToS3(req.file);
    const pdf = await PDF.create({
      filePath,
      uploadDate: new Date(),
      doctorId: req.user.id,
      patientId: parseInt(req.body.patientId, 10),
    });

    res.status(201).json(pdf);
  } catch (error) {
    console.error('Error in uploadPDF:', error);
    res.status(500).json({ error: 'An error occurred while uploading the PDF' });
  }
};

module.exports = { linkPatient, uploadPDF, getPatientsByDoctor };