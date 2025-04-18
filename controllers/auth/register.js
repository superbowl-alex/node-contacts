const bcrypt = require("bcryptjs");
const { Conflict } = require("http-errors");
const { User } = require("../../models/user");
const gravatar = require("gravatar");
const { v4: uuidv4 } = require("uuid");
const { sendEmail } = require("../services/email");

const register = async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
  
    if (user) {
      throw new Conflict("Email in use");
    }

    const salt = bcrypt.genSaltSync(10);
    const hashPassword = bcrypt.hashSync(password, salt);
    const avatarURL = gravatar.url(email);
    const verificationToken = uuidv4();

    const newUser = await User.create({ ...req.body, password: hashPassword, avatarURL, verificationToken });
    
    const mail = {
      to: email,
      subject: "Please confirm registration ",
      html: `<a href="http://localhost:4000/users/verify/${verificationToken}" target="_blank">Click for confirm email</a>`,
    };
    
    await sendEmail(mail);

    res.status(201).json({
      user: {
        email: newUser.email,
        subscription: newUser.subscription,
        avatarURL: newUser.avatarURL,
      },
    });
};



module.exports = register;