const express = require('express');
const { registerUser, loginUser, logoutUser } = require('../controllers/userController');
const router = express.Router();

//route for user registration
router.route("/register").post(registerUser);

router.route('/login').post(loginUser);//login

router.route('/logout').get(logoutUser);
module.exports = router;