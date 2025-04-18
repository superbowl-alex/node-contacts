const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { Unauthorized } = require("http-errors");
const { User } = require("../../models/user");
require("dotenv").config();

const { SECRET_KEY } = process.env;

const login = async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
        throw new Unauthorized("Email or password is wrong");
    }

    const passwordCompare = await bcrypt.compareSync(password, user.password);

    if (!passwordCompare) {
        throw new Unauthorized("Email or password is wrong");
    }

    if (!user.verify) {
        throw new Unauthorized("Email not verified");
    }

    const payload = {
        id: user._id,
    };

    const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "23h" });
    await User.findByIdAndUpdate(user._id, { token });

    res.status(200).json({
    token,
    user: {
        email: user.email,
        subscription: user.subscription,
    },
    });

};



module.exports = login;