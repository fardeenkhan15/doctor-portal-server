require('dotenv').config();
console.log('DATABASE_URL:', process.env.DATABASE_URL);

const express = require('express');
const cors = require('cors');
const sequelize = require('./config/database');
const authRoutes = require('./routes/auth');
const doctorRoutes = require('./routes/doctor');
const patientRoutes = require('./routes/patient');
const errorHandler = require('./middleware/errorHandler');

// Import your models
const Doctor = require('./models/Doctor');
const Patient = require('./models/Patient');
const DoctorPatient = require('./models/DoctorPatient');

const app = express();

app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true,
}));
app.use(express.json());

// Set up associations
Object.values(sequelize.models).forEach((model) => {
  if (model.associate) {
    model.associate(sequelize.models);
  }
});

app.use('/auth', authRoutes);
app.use('/doctor', doctorRoutes);
app.use('/patient', patientRoutes);

app.use(errorHandler);

const startServer = async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync();
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
};

startServer();  