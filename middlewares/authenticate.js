const jwt = require("jsonwebtoken");
const { User } = require("../models/user");
const { Unauthorized } = require("http-errors");
require("dotenv").config();

const { SECRET_KEY } = process.env;

const authenticate = async (req, res, next) => {
  const { authorization = "" } = req.headers;
  const [bearer, token] = authorization.split(" ");
  if (!token || bearer !== "Bearer") {
    // throw new Unauthorized("Not authorized");
    next(new Unauthorized("Not authorized"));
  }

  try {
    const { id } = jwt.verify(token, SECRET_KEY);
    const user = await User.findById(id);
    if (!user || !user.token || token !== String(user.token)) {
      throw new Unauthorized("Not authorized");
    }
    req.user = user;
    next();
  } catch {
    next(new Unauthorized("Not authorized"));
  }
};

module.exports = authenticate;