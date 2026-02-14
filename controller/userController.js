import { catchAsyncErrors } from "../middlewares/catchAsyncErrors.js";
import Errorhandler from "../middlewares/errorMiddlewares.js";
import { User } from "../models/userSchema.js";

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
    res.status(200).json({
        success: true,
        message: "User registered successfully.",
        user,
    });

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
    return res.status(200).json({
        success: true,
        message: "User login successful.",
        token: user.generateJsonWebToken(),
    });
});