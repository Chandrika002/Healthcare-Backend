import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const userSchema = new mongoose.Schema({
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
    password: {
        type: String,
        required: [true, "Password is required"],
        minlength: [6, "Password must be at least 6 characters long."],
        select: false,
    },
    confirmPassword: {
        type: String,
        required: [true, "Confirm Password is required"],
        minlength: [6, "Confirm Password must be at least 6 characters long."],
        validate: {
            validator: function (v) {
                return v === this.password;
            },
            message: "Passwords do not match.",
        },
    },
    role: {
        type: String,
        enum: ["Admin", "Patient", "Doctor"],
    },
    doctorDepartment: {
        type: String,
    },
    docAvatar: {
        public_id: String,
        url: String,
    },
});


userSchema.pre("save", async function (next) {
    if(!this.isModified("password")){
        next()
    }
    this.password = await bcrypt.hash(this.password, 10);
});

userSchema.methods.comparePassword = async function(enteredPassword){
    return await bcrypt.compare(enteredPassword, this.password);
};

userSchema.methods.generateJsonWebToken = function(){ // token generate for user login
    return jwt.sign({id: this._id}, process.env.JWT_SECRET_KEY, {
        expiresIn: process.env.JWT_EXPIRES,
    });
};


// Create User model
export const User = mongoose.model("User", userSchema);