# CarePulse: Doctor-Patient Management System

## Overview

CarePulse is a comprehensive web application designed to streamline communication and document sharing between doctors and patients. This system provides separate interfaces for doctors and patients, enabling efficient management of medical records, comments, and PDF uploads.

## Features

### For Patients
- Sign up with illness description
- Secure login to personal dashboard
- View personal details
- Add comments about their condition
- Access PDFs uploaded by their doctor

### For Doctors
- Secure sign up and login
- View all linked patients
- Link new patients to their account
- Access detailed patient information
- Read patient comments
- Upload PDF documents for patients

## Tech Stack

### Backend
- Node.js
- Express.js
- Sequelize ORM
- MySQL
- AWS S3 for PDF storage

### Frontend
- React.js
- Axios for API calls
- React Router for navigation
- React-toastify for notifications

## Installation

1. Clone the repository
git clone https://github.com/your-username/carepulse.git
Copy
2. Install dependencies for backend
cd carepulse/backend
npm install
Copy
3. Install dependencies for frontend
cd ../frontend
npm install
Copy
4. Set up environment variables
- Create a `.env` file in the backend directory
- Add the following variables:
  ```
  DB_NAME=your_database_name
  DB_USER=your_database_user
  DB_PASSWORD=your_database_password
  DB_HOST=localhost
  JWT_SECRET=your_jwt_secret
  AWS_ACCESS_KEY_ID=your_aws_access_key
  AWS_SECRET_ACCESS_KEY=your_aws_secret_key
  AWS_REGION=your_aws_region
  S3_BUCKET_NAME=your_s3_bucket_name
  ```

5. Set up the database
- Create a MySQL database with the name specified in your `.env` file
- Run migrations (if applicable)
  ```
  cd ../backend
  npx sequelize-cli db:migrate
  ```

## Running the Application

1. Start the backend server
cd backend
npm start
Copy
2. Start the frontend development server
cd frontend
npm start
Copy
3. Access the application at `http://localhost:3000`

## Project Structure
carepulse/
│
├── backend/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── services/
│   ├── utils/
│   └── app.js
│
└── frontend/
├── public/
└── src/
├── assets/
├── components/
├── context/
├── hooks/
├── services/
└── utils/
Copy
## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.
