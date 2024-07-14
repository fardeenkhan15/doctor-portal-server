// models/DoctorPatient.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Doctor = require('./Doctor');
const Patient = require('./Patient');

const DoctorPatient = sequelize.define('DoctorPatient', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
});

Doctor.belongsToMany(Patient, { through: DoctorPatient });
Patient.belongsToMany(Doctor, { through: DoctorPatient });

module.exports = DoctorPatient;
