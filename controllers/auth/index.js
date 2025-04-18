const register = require("./register");
const login = require("./login");
const logout = require("./logout");
const updateUserSubscription = require("./updateUserSubscription");
const verifyEmail = require("./verifyEmail");
const resendVerifyEmail = require("./resendVerifyEmail");

module.exports = {
    register,
    login,
    logout,
    updateUserSubscription,
    verifyEmail,
    resendVerifyEmail,
}