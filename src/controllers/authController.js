const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Doctor = require('../models/Doctor');
const Patient = require('../models/Patient');

exports.registerDoctor = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 12);
    const doctor = await Doctor.create({ name, email, password: hashedPassword });
    res.status(201).json(doctor);
  } catch (error) {
    res.status(500).json({ message: 'Registration failed', error });
  }
};

exports.registerPatient = async (req, res) => {
  try {
    const { name, email } = req.body;
    const patient = await Patient.create({ name, email });
    res.status(201).json(patient);
  } catch (error) {
    res.status(500).json({ message: 'Registration failed', error });
  }
};

exports.loginDoctor = async (req, res) => {
  try {
    const { email, password } = req.body;
    const doctor = await Doctor.findOne({ where: { email } });
    if (!doctor || !(await bcrypt.compare(password, doctor.password))) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    const token = jwt.sign({ doctorId: doctor.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ token, doctorId: doctor.id });
  } catch (error) {
    res.status(500).json({ message: 'Login failed', error });
  }
};

exports.loginPatient = async (req, res) => {
  try {
    const { email } = req.body;
    const patient = await Patient.findOne({ where: { email } });
    if (!patient) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    const token = jwt.sign({ patientId: patient.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ token, patientId: patient.id });
  } catch (error) {
    res.status(500).json({ message: 'Login failed', error });
  }
};
