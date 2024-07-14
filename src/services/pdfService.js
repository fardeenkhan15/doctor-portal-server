const s3 = require('../config/s3');

const uploadPDFToS3 = async (file) => {
  const params = {
    Bucket: process.env.S3_BUCKET_NAME,
    Key: `${Date.now().toString()}-${file.originalname}`,
    Body: file.buffer,
  };

  try {
    const data = await s3.upload(params).promise();
    return data.Location;
  } catch (error) {
    throw new Error('Error uploading PDF to S3');
  }
};

module.exports = { uploadPDFToS3 };
