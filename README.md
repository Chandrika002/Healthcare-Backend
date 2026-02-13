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
raw, body (.json), content-type application/json