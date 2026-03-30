# Healthcare Backend

This is the backend part of our Healthcare Web Application. It handles everything behind the scenes — user authentication, appointments, messages, and admin operations.

The project is built using **Node.js, Express, and MongoDB**, and follows a clean structure so it’s easy to understand and extend.

---

## What this project does

This backend allows:

* Patients to register and log in
* Admins to manage users and doctors
* Doctors to be added with profile images
* Users to send messages
* Patients to book appointments
* Secure authentication using JWT

Basically, it connects the frontend with the database and makes sure everything works smoothly.

---

## Tech used

* Node.js
* Express.js
* MongoDB (Mongoose)
* JWT for authentication
* Cloudinary (for image upload)
* bcrypt (for password hashing)

---

## Getting started

### Step 1: Initialize the project

```bash
npm init
```

### Step 2: Install dependencies

```bash
npm install bcrypt cloudinary cookie-parser cors dotenv express mongoose express-fileupload jsonwebtoken validator
```

### Step 3: Install nodemon (for development)

```bash
sudo npm install -g nodemon
```

Check if it’s installed:

```bash
nodemon -v
```

---

## Environment setup

Create a file called **config.env** and add your secret keys:

```
PORT=4000
MONGO_URI=your_mongodb_uri

FRONTEND_URL=http://localhost:3000
DASHBOARD_URL=http://localhost:5173

JWT_SECRET_KEY=your_secret
JWT_EXPIRES=7d
COOKIE_EXPIRE=7

CLOUDINARY_CLOUD_NAME=your_name
CLOUDINARY_API_KEY=your_key
CLOUDINARY_API_SECRET=your_secret
```

---

## Run the project

For development:

```bash
npm run dev
```

For production:

```bash
npm start
```

---

## How it works

The flow is simple:

```
Request → Middleware → Controller → Response
```

* **Middleware** handles authentication & errors
* **Controller** processes logic
* **Response** sends data back to frontend

---

## API Overview

### User APIs

* Register patient → `POST /api/v1/user/patient/register`
* Login → `POST /api/v1/user/login`
* Get all doctors → `GET /api/v1/user/doctors`
* Get admin profile → `GET /api/v1/user/admin/me`
* Get patient profile → `GET /api/v1/user/patient/me`

---

### Message API

Send a message:

```
POST /api/v1/message/send
```

Example body:

```json
{
  "firstName": "John",
  "lastName": "Doe",
  "email": "john@example.com",
  "phone": "0123456789",
  "message": "Hello!"
}
```

---

### Appointment API

Create appointment:

```
POST /api/v1/appointment/post
```

---

## Authentication

We use **JWT-based authentication**.

There are different roles:

* Patient
* Admin
* Doctor

Protected routes use middleware like:

* `isPatientAuthenticated`
* `isAdminAuthenticated`

---

## ☁️Image Upload (Cloudinary)

Doctor profile images are stored using Cloudinary.

Setup is done in `server.js` using environment variables.

---

## Error Handling

* All async errors are handled properly
* Server won’t crash due to a single error
* Validation errors are cleaned and readable

---

## Testing

You can test APIs using **Postman**.

Example:

```
POST http://localhost:4000/api/v1/message/send
```

Set:

* Body → raw → JSON
* Content-Type → application/json

* Make sure MongoDB is connected before running
* Keep your `config.env` safe
* Always test APIs before connecting frontend

Future plans

* Email notifications
* Payment system
* Real-time chat
* Better admin dashboard

