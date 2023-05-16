const jwt = require("jsonwebtoken")

exports.generateAccessToken = async ({email, id}) => {
  return jwt.sign({ user_id: id, email }, process.env.TOKEN_KEY, {
    expiresIn: "2h",
  });
};
