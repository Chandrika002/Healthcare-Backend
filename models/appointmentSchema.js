import mongoose from 'mongoose';
import validator from 'validator';

const appointmentSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: [true, "First name is required"],
        minlength: [3, "First name must be at least 3 characters long."],
    },
    lastName: {
        type: String,
        required: [true, "Last name is required"],
        minlength: [3, "Last name must be at least 3 characters long."],
    },
    email: {
        type: String,
        required: [true, "Email is required"],
        validate: [validator.isEmail, "Please provide a valid email address."],
    },
    phone: {
        type: String,
        required: [true, "Phone number is required"],
        validate: {
            validator: function (v) {
                return /^\d{11}$/.test(v);
            },
            message: "Please provide a valid 11-digit phone number.",
        },
    },
    nid: {
        type: String,
        required: [true, "NID number is required"],
        validate: {
            validator: function (v) {
                return /^\d{10}$/.test(v);
            },
            message: "Please provide a valid 10-digit NID number.",
        },
    },
    dob: {
        type: Date,
        required: [true, "Date of Birth is required."],
    },
    gender: {
        type: String,
        required: true,
        enum: ['Male', 'Female'],
    },
    appointment_date: {
        type: Date,
        required: [true, "Appointment date is required."],
    },
    department: {
        type: String,
        required: [true, "Department is required."],
    },
    doctor: {
        firstName: {
            type: String,
            required: true,
        },
        lastName: {
            type: String,
            required: true,
        },
    },
    hasVisited: {
        type: Boolean,
        default: false,
    },
    doctorId: {
        type: mongoose.Schema.ObjectId,
        required: true,
    },
    patientId: {
        type: mongoose.Schema.ObjectId,
        required: true,
    },
    address: {
        type: String,
        required: [true, "Address is required."],
    },
    status: {
        type: String,
        enum: ["Pending", "Approved", "Rejected"],
        default: "Pending",
    },
});



export const Appointment = mongoose.model("Appointment", appointmentSchema);