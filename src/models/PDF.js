// models/PDF.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Doctor = require('./Doctor');
const Patient = require('./Patient');

const PDF = sequelize.define('PDF', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  filePath: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  uploadDate: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
});

Doctor.hasMany(PDF, { foreignKey: 'doctorId' });
Patient.hasMany(PDF, { foreignKey: 'patientId' });
PDF.belongsTo(Doctor, { foreignKey: 'doctorId' });
PDF.belongsTo(Patient, { foreignKey: 'patientId' });

module.exports = PDF;
