const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const PDF = require('./PDF');

const Patient = sequelize.define('Patient', {
  isAvailable: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
  },
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  age: {
    type: DataTypes.INTEGER,
    allowNull: true, 
  },
  address: {
    type: DataTypes.STRING,
    allowNull: true, 
  },
  medicalHistory: {
    type: DataTypes.TEXT,
    allowNull: true, 
  },
  currentProblems: {
    type: DataTypes.TEXT,
    allowNull: true, 
  },
  doctorId: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: 'Doctors',
      key: 'id',
    },
  },
});


Patient.associate = (models) => {
  Patient.hasMany(models.DoctorPatient);
  Patient.hasMany(models.PDF, { foreignKey: 'patientId' }); // Add this line
};
module.exports = Patient;
