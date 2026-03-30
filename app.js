import express from "express";
import { config } from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import fileUpload from "express-fileupload";
import { dbConnection } from "./database/dbConnection.js";
import { errorMiddleware } from "./middlewares/errorMiddlewares.js";
import {userRouter} from "./router/userRouter.js";
import appointmentRouter from "./router/appointmentRouter.js";

const app = express();

// Middleware and routes can be added here
config({path: "./config/config.env"});

// middleware for frontend and backend communication
app.use(cors({
    origin: [process.env.FRONTEND_URL, process.env.DASHBOARD_URL],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
}));


app.use(cookieParser());  // middleware cookie-parser for backend
app.use(express.json());  // middleware to parse JSON into string
app.use(express.urlencoded({ extended: true })); // middleware to parse URL-encoded data

app.use(fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp/",
})); 

app.use("/api/v1/message", (await import("./router/messageRouter.js")).messageRouter); //importing message router
app.use("/api/v1/user", userRouter);
app.use("/api/v1/appointment", appointmentRouter);


dbConnection();

app.use(errorMiddleware); 

export default app;