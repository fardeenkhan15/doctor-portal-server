// models/Doctor.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Doctor = sequelize.define('Doctor', {
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
  specialty: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

Doctor.associate = (models) => {
  Doctor.belongsToMany(models.Patient, { 
    through: 'DoctorPatient',
    foreignKey: 'DoctorId'
  });
};

module.exports = Doctor;
