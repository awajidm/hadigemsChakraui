// create, send token and also save token to the cookies

const sendToken = (user, statusCode, res) => {
  // create jwttoken
  const token = user.getJwtToken();

  //options for cookies
  const options = {
    expires: new Date(
      Date.now() + process.env.COOKIE_EXPIRES_TIME * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
  };

  res.status(statusCode).cookie("token", token, options);
  res.json({
    success: true,
    token,
    user,
  });
};

module.exports = sendToken;
