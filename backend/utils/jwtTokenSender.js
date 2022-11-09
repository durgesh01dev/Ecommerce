/* 
function to create token and save in cookie
*/

const sendToken = (user, statusCode, res) => {
  //in case password has matched
  const token = user.getJWTToken();

  //options for cookie
  const options = {
    expires: new Date(
      Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
  };

  //success response 200 or 201 or other
  res.status(statusCode).cookie("token", token, options).json({
    success: true,
    user,
    token,
  });
};

module.exports = sendToken;
