const ErrorHandler = require('../utils/errorhandler');
const AsyncErrorHandler = require('./AsyncErrorHandler');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');
/**
 * The middleware for the authentication purpose
*/
const isAuthenticatedUser = AsyncErrorHandler(async(req, res, next) => {
    //accessing token from the cookie
    //destructuring object to get token only
    const {token} = req.cookies;
    console.log(token);

    //if token does not exist
    if(!token){
        return next(new ErrorHandler("Please Login to access this resource", 401));
    } 

    //token found then
    const decodedData = jwt.verify(token, process.env.JWT_SECRET);

    //saving the resulting user within the request
    req.user  = await User.findById(decodedData.id);
    next();

})

module.exports = isAuthenticatedUser;