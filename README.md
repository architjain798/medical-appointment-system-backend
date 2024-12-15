## Backend Repository

### **Project Overview**
This repository contains the backend code for the Medical Appointment System, built with **Node.js** and **Express.js**, and uses **MongoDB** as the database. It provides APIs for authentication, managing appointments, and retrieving doctor information.

### **Features**
- User authentication (JWT-based).
- CRUD operations for appointments.
- Pagination support for doctor listings.
- Validation and error handling.

### **Tech Stack**
- **Node.js** with **Express.js** for the backend.
- **MongoDB** for the database.
- **Mongoose** for object modeling.
- **JWT** for authentication.
- **Dotenv** for environment variable management.

### **Setup Instructions**

1. Clone the repository:
   ```bash
   git clone <backend-repo-url>
   cd medical-appointment-system-backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory and add the following:
   ```env
   PORT=5000
   MONGO_URI=
   JWT_SECRET=your_jwt_secret
   ```

4. Start the development server:
   ```bash
   npm start
   ```

5. The server will run at:
   ```
   http://localhost:5000
   ```

### **Scripts**
- `npm start`: Start the development server.
- `npm run dev`: Start the server with hot reloading using **nodemon**.

### **API Endpoints**

#### Authentication
- **POST** `/api/auth/register`: Register a new user.
- **POST** `/api/auth/login`: Authenticate a user and return a JWT token.

#### Doctors
- **GET** `/api/doctors`: Get a paginated list of doctors.

#### Appointments
- **GET** `/api/appointments`: Get all appointments for the logged-in user.
- **POST** `/api/appointments`: Create a new appointment.
- **PUT** `/api/appointments/:id`: Update an existing appointment.
- **DELETE** `/api/appointments/:id`: Delete an appointment.

### **Folder Structure**
```
src/
├── config/
│   ├── db.js
├── controllers/
│   ├── authController.js
│   ├── doctorController.js
│   ├── appointmentController.js
├── models/
│   ├── User.js
│   ├── Doctor.js
│   ├── Appointment.js
├── routes/
│   ├── authRoutes.js
│   ├── doctorRoutes.js
│   ├── appointmentRoutes.js
├── middleware/
│   ├── authMiddleware.js
├── utils/
│   ├── errorHandler.js
│   ├── validateToken.js
│   ├── availabilityChecker.js
├── index.js
```

### **Database Schema**
#### User Schema
```javascript
{
  name: String,
  email: String,
  password: String,
  createdAt: Date,
}
```
#### Doctor Schema
```javascript
{
  name: String,
  specialty: String,
  schedule: [
    {
      date: String,
      start: String,
      end: String
    }
  ]
}
```
#### Appointment Schema
```javascript
{
  user: ObjectId,
  doctor: ObjectId,
  date: String,
  time: {
    start: String,
    end: String
  },
  status: String
}
```