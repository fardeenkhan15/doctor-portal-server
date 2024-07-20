// controllers/patientController.js
const Patient = require('../models/Patient');
const PDF = require('../models/PDF'); // Add this line
const DoctorPatient = require('../models/DoctorPatient'); // Add this line

exports.getPatients = async (req, res) => {
  try {
    const doctorId = req.user.id;
    const patients = await Patient.findAll({ where: { doctorId } });
    res.status(200).json(patients);
  } catch (error) {
    console.error('Error fetching patients:', error);
    res.status(500).json({ message: 'Error fetching patients', error: error.message });
  }
};

exports.getPatientById = async (req, res) => {
  try {
    const patientId = req.params.id;
    const patient = await Patient.findByPk(patientId, {
      include: [PDF] // Include PDFs related to the patient
    });
    if (!patient) {
      return res.status(404).json({ message: 'Patient not found' });
    }
    res.status(200).json(patient);
  } catch (error) {
    console.error('Error fetching patient:', error);
    res.status(500).json({ message: 'Error fetching patient', error: error.message });
  }
};

exports.getAvailablePatients = async (req, res) => {
  try {
    const availablePatients = await Patient.findAll({
      where: {
        isAvailable: true,
      },
      include: [{
        model: DoctorPatient,
        required: false,
        where: { DoctorId: null }
      }]
    });
    res.status(200).json(availablePatients);
  } catch (error) {
    console.error('Error fetching available patients:', error);
    res.status(500).json({ 
      message: 'Error fetching available patients', 
      error: error.message,
      stack: error.stack 
    });
  }
};
