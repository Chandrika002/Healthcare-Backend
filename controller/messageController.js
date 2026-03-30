import { catchAsyncErrors } from "../middlewares/catchAsyncErrors.js";
import { Message } from "../models/messageSchema.js";
import Errorhandler from "../middlewares/errorMiddlewares.js";  

export const sendMessage = catchAsyncErrors(async(req, res, next) => {
    const { firstName, lastName, email, phone, message } = req.body;  //defining variables
    if (!firstName || !lastName || !email || !phone || !message) {  
        return next(new Errorhandler("Please fill all the fields", 400)); //if any field is missing
    }      

    await Message.create({ //creating message in database
        firstName,
        lastName,
        email,
        phone,
        message,
    });

    res.status(200).json({ //success response
        success: true,
        message: "Message sent successfully",
    });
});

export const getAllMessages = catchAsyncErrors(async(req, res, next) => {
    const messages = await Message.find(); //finding all messages in database
    res.status(200).json({ 
        success: true,
        messages,
    });
});