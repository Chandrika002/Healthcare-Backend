import { catchAsyncErrors } from "../middlewares/catchAsyncErrors.js";
import Errorhandler from "../middlewares/errorMiddlewares.js";
import { User } from "../models/userSchema.js";
import { generateToken } from "../utils/jwtToken.js"; "../utils/jwtToken.js";


export const patientRegister = catchAsyncErrors(async (req, res, next) => {
    const {firstName, lastName, email, phone, nid, dob, gender, password, confirmPassword, role} = req.body;

    if (
        !firstName ||
        !lastName ||
        !email ||
        !phone ||
        !nid ||
        !dob ||
        !gender ||
        !password||
        !role
    ) {
        return next(new Errorhandler("Please fill all the fields.", 400));
    }
    let user = await User.findOne({ email });
    if (user) {
        return next(new Errorhandler("This user already exists.", 400));
    }
    user = await User.create({ firstName, lastName, email, phone, nid, dob, gender, password, confirmPassword, role });
    generateToken(user, "User registered successfully.", 201, res);
});


export const login = catchAsyncErrors(async (req, res, next) => {
    const{email, password, confirmPassword, role} = req.body;
    if(!email || !password || !confirmPassword || !role){
        return next(new Errorhandler("Please fill all the fields.", 400));
    }
    if(password !== confirmPassword){
        return next(new Errorhandler("Passwords do not match.", 400));
    }
    
    const user = await User.findOne({email}).select("+password");
    if(!user){
        return next(new Errorhandler("Invalid email or password.", 400));
    }
    const isPasswordMatched = await user.comparePassword(password);
    if(!isPasswordMatched){
        return next(new Errorhandler("Invalid email or password.", 400));
    }
    if(user.role !== role){
        return next(new Errorhandler("User with this role not found.", 400));
    }
    generateToken(user, "User logged in successfully.", 201, res);
});

export const addNewAdmin = catchAsyncErrors(async (req, res, next) => {
    const {firstName, lastName, email, phone, nid, dob, gender, password, confirmPassword} = req.body;

    if (
        !firstName ||
        !lastName ||
        !email ||
        !phone ||
        !nid ||
        !dob ||
        !gender ||
        !password
    ) {
        return next(new Errorhandler("Please fill all the fields.", 400));
    }
    const isRegistered = await User.findOne({ email });
    if (isRegistered) {
        return next(new Errorhandler(`${isRegistered.role} with this email already exists.`, 400));
    }
    const admin = await User.create({
        firstName, lastName, email, phone, nid, dob, gender, password, confirmPassword, role: "Admin", 
    });
    res.status(200).json({
        success: true,
        message: "New Admin registered successfully!",
        admin,
    });
});   

export const getAllDoctors = catchAsyncErrors(async(req, res, next)=>{
    const doctors = await User.find({ role: "Doctor" });
    res.status(200).json({
        success: true,
        doctors,
    });
});