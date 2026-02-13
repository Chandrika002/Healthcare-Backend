import mongoose from "mongoose";
import validator from "validator";

const messageSchema = new mongoose.Schema({
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
    message: {
        type: String,
        required: [true, "Message is required"],
        minlength: [10, "Message must be at least 10 characters long."],
    },
});


// Create Message model
export const Message = mongoose.model("Message", messageSchema);