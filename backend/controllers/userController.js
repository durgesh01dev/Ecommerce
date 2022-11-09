const User = require("../models/userModel");
const ErrorHandler = require("../utils/errorhandler");
const AsyncErrorHandler = require("../middlewares/AsyncErrorHandler");
const tokenSender = require("../utils/jwtTokenSender");
const sendToken = require("../utils/jwtTokenSender");

//const ApiFeatures = require("../utils/apiFeatures");

//Register a user
exports.registerUser = AsyncErrorHandler(async (req, res, next) => {
  //extracting fields from body
  const { name, email, password } = req.body;
  const user = await User.create({
    name,
    email,
    password,
    avatar: {
      public_id: "This is a sample id",
      url: "profile pic url",
    },
  });

  //sending the response along with status code, cookie, and token
  sendToken(user, 201, res);
});

//login user
exports.loginUser = AsyncErrorHandler(async (req, res, next) => {
  const { email, password } = req.body;
  //check if user has given both the password and email
  if (!email || !password) {
    //400 is bad request
    return next(new ErrorHandler("Please Enter Email and Password"), 400);
  }
  //find the person having same email id
  //The password is unselected in user model, so select needs to be used here.
  const user = await User.findOne({ email: email }).select("+password");

  if (!user) {
    //401 is for unauthorized request
    return next(new ErrorHandler("Invalid email or password"), 401);
  }

  //check password match
  const isPasswordMatched = await user.comparePassword(password);

  if (!isPasswordMatched) {
    return next(new ErrorHandler("Invalid email or password"), 401);
  }

  //function to send the response along with token
  sendToken(user, 200, res);
});
