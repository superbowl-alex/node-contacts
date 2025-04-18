const express = require("express");
const router = express.Router();

const { users: ctrl } = require("../../controllers");
const { authenticate, ctrlWrapper, upload } = require("../../middlewares");

router.get("/current", authenticate, ctrlWrapper(ctrl.getCurrent));
router.patch("/avatars", authenticate, upload.single("avatar"), ctrlWrapper(ctrl.updateAvatar));


module.exports = router;