// const ErrorHandler = require('../utils/errorhandler')

const ErrorHandler = require("../utils/errorhandler");

module.exports = (err, req, res, next) => {
    err.statusCode  = err.statusCode || 500;
    err.message = err.message || "Internal Server Error";

    //handling invalid id error, like when casting id will generate error, for castError
    if(err.name === 'CastError'){
        const message = `Resource not found. Invalid: ${err.message}`;
        err = new ErrorHandler(message, 400);
    }

    res.status(err.statusCode).json({
        success: false,
        //to print the error details rather than status code use err.stack, for message use err.message
        message: err.stack
    })
}