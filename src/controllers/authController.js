const Doctor = require('../models/Doctor');
const Patient = require('../models/Patient');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Doctor login
exports.doctorLogin = async (req, res) => {
    const { email, password } = req.body;
    console.log('Login attempt:', email, password); // Log the incoming login request
    
    if (!email || !password) {
        return res.status(400).json({ error: 'Email and password are required' });
    }
    
    try {
        const doctor = await Doctor.findOne({ where: { email } });
        console.log('Doctor found:', doctor); // Log the fetched doctor

        if (!doctor) {
            return res.status(404).json({ error: 'Doctor not found' });
        }

        const isMatch = await bcrypt.compare(password, doctor.password);
        console.log('Password match:', isMatch); // Log the result of password comparison

        if (!isMatch) {
            return res.status(400).json({ error: 'Invalid credentials' });
        }

        const token = jwt.sign({ id: doctor.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        console.log('Token generated:', token); // Log the generated token

        res.status(200).json({ token, doctor });
    } catch (error) {
        console.error('Error during login:', error); // Log any errors
        res.status(500).json({ error: 'Server error' });
    }
};



// Doctor signup
exports.doctorSignup = async (req, res) => {
    const { name, email, password, specialty } = req.body;

    if (!name || !email || !password || !specialty) {
        return res.status(400).json({ error: 'All fields are required' });
    }
    
    console.log('Received signup data:', req.body);  // Add this line

    try {
        const existingDoctor = await Doctor.findOne({ where: { email } });
        if (existingDoctor) {
            return res.status(400).json({ error: 'Email already in use' });
        }

        const hashedPassword = await bcrypt.hash(password, 12);

        const newDoctor = await Doctor.create({
            name,
            email,
            password: hashedPassword,
            specialty
        });

        const token = jwt.sign({ id: newDoctor.id }, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.status(201).json({ token, doctor: newDoctor });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
};


// Patient login
exports.patientLogin = async (req, res) => {
    const { email, password } = req.body;
    
    if (!email || !password) {
        return res.status(400).json({ error: 'Email and password are required' });
    }
    
    try {
        const patient = await Patient.findOne({where: {email} });
        console.log('patient found:', patient);
        if (!patient) {
            return res.status(404).json({ error: 'Patient not found' });
        }

        const isMatch = await bcrypt.compare(password, patient.password);
        if (!isMatch) {
            return res.status(400).json({ error: 'Invalid credentials' });
        }

        const token = jwt.sign({ id: patient._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.status(200).json({ token, patient });
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
};

// Patient signup
exports.patientSignup = async (req, res) => {
    const { name, email, password, age, address, medicalHistory, currentProblems } = req.body;

    if (!name || !email || !password || !age || !address) {
        return res.status(400).json({ error: 'All fields are required' });
    }

    try {
        const existingPatient = await Patient.findOne({ where: { email } });
        if (existingPatient) {
            return res.status(400).json({ error: 'Email already in use' });
        }

        const hashedPassword = await bcrypt.hash(password, 12);

        const newPatient = await Patient.create({
            name,
            email,
            password: hashedPassword,
            age,
            address,
            medicalHistory,
            currentProblems
        });

        const token = jwt.sign({ id: newPatient.id }, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.status(201).json({ token, patient: newPatient });
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
};
