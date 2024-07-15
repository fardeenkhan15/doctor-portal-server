// src/controllers/doctorController.js

const Doctor = require('../models/Doctor');
const Patient = require('../models/Patient');
const PDF = require('../models/PDF');
const DoctorPatient = require('../models/DoctorPatient');

const linkPatient = async (req, res) => {
  try {
    const { doctorId, patientId } = req.body;
    await DoctorPatient.create({ doctorId, patientId });
    res.status(201).json({ message: 'Patient linked successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to link patient', error });
  }
};

const uploadPDF = async (req, res) => {
  const { doctorId, patientId } = req.body;
  const file = req.file;
  try {
    const pdf = await PDF.create({
      filePath: file.location,
      doctorId,
      patientId,
    });
    res.status(201).send({ pdf });
  } catch (error) {
    res.status(500).send({ error: 'Error uploading PDF' });
  }
};

module.exports = { linkPatient, uploadPDF };
