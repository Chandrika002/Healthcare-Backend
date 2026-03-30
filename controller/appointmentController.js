import {catchAsyncErrors} from "../middlewares/catchAsyncErrors.js";
import Errorhandler from "../middlewares/errorMiddlewares.js";
import {Appointment} from "../models/appointmentSchema.js";
import {User} from "../models/userSchema.js";


export const postAppointment = catchAsyncErrors(async (req, res, next) => {
    const {
        firstName,
        lastName,
        email,
        phone,
        nid,
        dob,
        gender,
        appointment_date,
        department,
        doctor_firstName,
        doctor_lastName,
        hasVisited,
        address,
    } = req.body;

    if( !firstName || !lastName || !email || !phone || !nid || !dob || !gender || !appointment_date || !department || !doctor_firstName || !doctor_lastName || !address){
        return next(new Errorhandler("Please provide all required fields.", 400));
    }

    const isConflict = await User.findOne({
        firstName: doctor_firstName,
        lastName: doctor_lastName,
        role: "Doctor",
        doctorDepartment: department,
    })
    if(isConflict.length === 0){
        return next(new Errorhandler("Doctor not found in the specified department.", 404));
    }
    if(isConflict.length > 1){
        return next(new Errorhandler("Multiple doctors found with the same name in the specified department.", 400));
    }

    const doctorId = doctor._id;
    const patientId = req.user._id;
    const appointment = await Appointment.create({
        firstName, lastName, email, phone, nid, dob, gender, appointment_date, department, doctor: {firstName: doctor_firstName, lastName: doctor_lastName}, hasVisited, address, doctorId, patientId
    });

    res.status(200).json({
        success: true,
        message: "Appointment sent successfully.",
    });
 
 
});
