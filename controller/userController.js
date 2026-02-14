import { catchAsyncErrors } from "../middlewares/catchAsyncErrors.js";
import Errorhandler from "../middlewares/errorMiddlewares.js";
import { User } from "../models/userSchema.js";

export const patientRegister = catchAsyncErrors(async (req, res, next) => {
    const {firstName, lastName, email, phone, nid, dob, gender, password, role} = req.body;

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
    user = await User.create({ firstName, lastName, email, phone, nid, dob, gender, password, role });
    res.status(200).json({
        success: true,
        message: "User registered successfully.",
        user,
    });
});