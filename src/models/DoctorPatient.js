// models/DoctorPatient.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const DoctorPatient = sequelize.define('DoctorPatient', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  DoctorId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Doctors',
      key: 'id'
    }
  },
  PatientId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Patients',
      key: 'id'
    }
  }
});

DoctorPatient.associate = (models) => {
  DoctorPatient.belongsTo(models.Patient);
  DoctorPatient.belongsTo(models.Doctor);
};

module.exports = DoctorPatient;