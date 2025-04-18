const express = require("express");
const router = express.Router();

const { auth: ctrl } = require("../../controllers");
const { validation, ctrlWrapper, authenticate } = require("../../middlewares");
const { schemas } = require("../../models/user");

router.post("/register", validation(schemas.authSchema), ctrlWrapper(ctrl.register));
router.post("/login", validation(schemas.authSchema), ctrlWrapper(ctrl.login));
router.get("/logout", authenticate, ctrlWrapper(ctrl.logout));
router.get("/verify/:verificationToken", ctrlWrapper(ctrl.verifyEmail));
router.patch("/", authenticate, validation(schemas.updateSubscriptionSchema), ctrlWrapper(ctrl.updateUserSubscription));
router.post("/verify", validation(schemas.verifyEmailSchema), ctrlWrapper(ctrl.resendVerifyEmail));

module.exports = router;