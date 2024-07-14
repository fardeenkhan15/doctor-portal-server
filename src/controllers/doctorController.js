const Doctor = require('../models/Doctor');
const Patient = require('../models/Patient');
const PDF = require('../models/PDF');
const DoctorPatient = require('../models/DoctorPatient');

const linkPatient = async (req, res) => {
  const { doctorId, patientId } = req.body;
  try {
    const doctor = await Doctor.findByPk(doctorId);
    const patient = await Patient.findByPk(patientId);
    if (!doctor || !patient) {
      return res.status(404).send({ error: 'Doctor or Patient not found' });
    }
    await doctor.addPatient(patient);
    res.send({ message: 'Patient linked successfully' });
  } catch (error) {
    res.status(500).send({ error: 'Error linking patient' });
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
