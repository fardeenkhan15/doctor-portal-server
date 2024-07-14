const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Doctor = require('../models/Doctor');
const Patient = require('../models/Patient');
const dotenv = require('dotenv');

dotenv.config();

const register = async (req, res) => {
  const { role, name, email, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 8);
  try {
    const user =
      role === 'doctor'
        ? await Doctor.create({ name, email, password: hashedPassword })
        : await Patient.create({ name, email, password: hashedPassword });
    const token = jwt.sign({ id: user.id, role }, process.env.JWT_SECRET);
    res.status(201).send({ user, token });
  } catch (error) {
    res.status(400).send({ error: 'Error registering user' });
  }
};

const login = async (req, res) => {
  const { role, email, password } = req.body;
  try {
    const user = await (role === 'doctor'
      ? Doctor.findOne({ where: { email } })
      : Patient.findOne({ where: { email } }));
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(400).send({ error: 'Invalid login credentials' });
    }
    const token = jwt.sign({ id: user.id, role }, process.env.JWT_SECRET);
    res.send({ user, token });
  } catch (error) {
    res.status(500).send({ error: 'Error logging in' });
  }
};

module.exports = { register, login };
