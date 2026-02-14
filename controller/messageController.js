import { catchAsyncErrors } from "../middlewares/catchAsyncErrors.js";
import { Message } from "../models/messageSchema.js";

export const sendMessage = catchAsyncErrors(async(req, res, next) => {
    const { firstName, lastName, email, phone, message } = req.body;  //defining variables
    if (!firstName || !lastName || !email || !phone || !message) {  
        return res.status(400).json({ //error handling without middleware
            success: false,
            message: "Please fill in all fields",
        });  
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


})