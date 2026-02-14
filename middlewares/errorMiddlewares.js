class Errorhandler extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;

    // Error.captureStackTrace(this, this.constructor);
  }
}

export const errorMiddleware = (err, req, res, next) => {
    err.message = err.message || "Internal Server Error";
    err.statusCode = err.statusCode || 500;

    if(err.code === 11000) { //11000 is the error code for duplicate key error in MongoDB
        const message = `Duplicate ${Object.keys(err.keyValue)} entered`;
        err = new Errorhandler(message, 400);
    }
    if(err.name === "JsonWebTokenError") { //if the error is related to JSON Web Token
        const message = "JSON Web Token is invalid, try again.";
        err = new Errorhandler(message, 400);
    }
    if(err.name === "TokenExpiredError") { //if the error is related to JSON Web Token expiration
        const message = "JSON Web Token is expired, try again.";
        err = new Errorhandler(message, 400);
    }
    if(err.name === "CastError") { //if the error is related to invalid ObjectId in MongoDB
        const message = `Resource not found. Invalid: ${err.path}`;
        err = new Errorhandler(message, 400);
    }

    // if the error is related to validation errors, we need to extract the error messages from the error object and join them into a single string
    const errorMessage = err.errors ? Object.values(err.errors).map((value) => value.message).join(", ") : err.message;

    // show only the error message and status code in the response, not the stack trace
    return res.status(err.statusCode).json({
        success: false,
        message: errorMessage,
    });
};

export default Errorhandler;