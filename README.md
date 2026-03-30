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

## Image Upload (Cloudinary)

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






------------------------------------------------rough-------------------------------------------------------------------
# Healthcare-Backend

$ npm init  -->  package.json
$ npm i bcrypt cloudinary cookie-parser cors dotenv express mongoose express-fileupload jsonwebtoken validator  -->  node_modules (folder), package-lock.json

Updated package.json
adding "type": "module",
and
    "start": "node server.js",
    "dev": "nodemon server.js"
inside "scripts" of "../package.json"

Before running the server on port 4000, install nodemon globally
   sudo npm install -g nodemon

Check installation
   nodemon -v

To start the development server, use the following command:
    npm run dev

To store secret variables config.env is created. 
config.env stores PORT, MONGO_URI, FRONTEND_URL, DASHBOARD_URL, JWT_SCERET_KEY, JWT_EXPIRES, COOKIE_EXPIRE, CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_SECRET, CLOUDINARY_API_KEY.

Create project in MongoDB. Put the mongo_uri in config.env and define the config path (app.js). Checking whether config file is connected or not, put process.env.PORT in place of port number(server.js)


Request → Middleware → Controller → Response

Connect frontend and backend creating middleware (app.use(cors({...}))) user's frontend and admin's dashboard connection with backend and defining the methods.
adding other middlewares cookieParser(), express.json(), express.urlencoded(), fileUpload().


In dbConnection.js, import the mongoose library to Connect to MongoDB and dbConnection() in app.js.

Generate API Key in cloudinary, store the variables (CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_SECRET, CLOUDINARY_API_KEY) va;ue in config.env
Setup cloudinary with server.js (cloudinary.v2.config())

controller/messageController.js
to get the values from request body

Define sendMessage functionality in messageController.js.
Create the url for the functionality in messageRouter.js.
Create middleware for messageRouter (app.use("api/v1/message",...))


Postman
Healthcare-Web-Application-Development/Message/Send message : url http://localhost:4000/api/v1/message/send POST method
http://localhost:4000/messageRouter-path/sendMessage-path
raw, body (.json), content-type application/json
Send { "firstName": , "lastName": , "email": , "phone": , "message": }

Create middlewares for handling errors  
Create catchAsyncErrors and import in messageController
Create errorMiddlewares to stop server being down for any single error and import it in messageController and app.js (use it after databaase connection).

Modify errorMiddlewares to show only extracted the error messages from the error object and join them into a single string if it's related to validation error.


Create userSchema -> defining user fields
Create userController -> handling the user registration
Create userRouter -> defining path for functionality
Import userRouter in app.js

Create User in Postman and make request Patient register url(http://localhost:4000/api/v1/user/patient/register) Post method. Send message and check the registration in MongoDB.

Define login function in userController, login path in userRouter (userRouter path in app.js)
Postman -> server.js -> app.js -> userRouter.js -> userController.js -> userSchema.js (Database)

Create jwtToken. Import it in userController and replace the response with generateToken(user, message, statusCode, response).

Create addNewAdmin in userController, make the path in userRouter

Create authentication, authorization in auth.js to create new admin by only an admin and path created in userRouter. 


getAllDoctors in userController, in userRouter.js router.get("/doctors", getAllDoctors);

exported in userController.js
in userRouter.js router.get("/patient/me", isPatientAuthenticated, getUserDetails);
router.get("/admin/logout", isAdminAuthenticated, logoutAdmin);
patient logout also created in same way 

in userController ; export const addNewDoctor 
router.post "/doctor/addnew"
docavatar
cloudinary upload docAvatar

get all messages to admin with messageController and messageRouter
create appointmentSchema and appointmentRouter



////
changes:1
$ npm init  -->  package.json
$ npm i bcrypt cloudinary cookie-parser cors dotenv express mongoose express-fileupload jsonwebtoken validator  -->  node_modules (folder), package-lock.json

##updated files: 
controller/userController.js
router/userRouter.js
package.json & package-lock.json

##get request for doctors: /api/v1/user/doctors
## get user details: http://localhost:4000/api/v1/user/admin/me
## get patient details: http://localhost:4000/api/v1/user/patient/me
