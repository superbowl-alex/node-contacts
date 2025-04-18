const { User } = require("../../models/user");
const { NotFound, BadRequest } = require("http-errors");
const { sendEmail } = require("../services/email");

const resendVerifyEmail = async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });

  if (!user) {
    throw new NotFound("User not found");
  }

  if (user.verify) {
    throw new BadRequest("Verification has already been passed");
  }

  const mail = {
    to: email,
    subject: "Please confirm registration ",
    html: `<a href="http://localhost:4000/users/verify/${user.verificationToken}" target="_blank">Click for confirm email</a>`,
  };
  
  await sendEmail(mail);

  res.status(200).json({
    message: "Verification email sent",
  });
};

module.exports = resendVerifyEmail;