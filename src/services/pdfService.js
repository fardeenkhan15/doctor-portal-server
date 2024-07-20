const { Upload } = require('@aws-sdk/lib-storage');
const s3 = require('../config/s3');

const uploadPDFToS3 = async (file) => {
  if (!file || !file.buffer) {
    throw new Error('File buffer is missing');
  }

  const upload = new Upload({
    client: s3,
    params: {
      Bucket: process.env.S3_BUCKET_NAME,
      Key: `${Date.now().toString()}-${file.originalname}`,
      Body: file.buffer,
    },
  });

  try {
    const data = await upload.done();
    return data.Location;
  } catch (error) {
    console.error('Error uploading PDF to S3', error);
    throw new Error('Error uploading PDF to S3');
  }
};

module.exports = { uploadPDFToS3 };
