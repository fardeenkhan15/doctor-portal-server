const Patient = require('../models/Patient');
const PDF = require('../models/PDF');

const getPDFs = async (req, res) => {
  const { patientId } = req.params;
  try {
    const pdfs = await PDF.findAll({ where: { patientId } });
    res.send({ pdfs });
  } catch (error) {
    res.status(500).send({ error: 'Error fetching PDFs' });
  }
};

module.exports = { getPDFs };
