const express = require('express');

const { contacts: ctrl } = require("../../controllers");

const { validation, ctrlWrapper, authenticate } = require("../../middlewares");
const { schemas } = require("../../models/contact");

const router = express.Router();

router.get('/', authenticate, ctrlWrapper(ctrl.getAll));

router.get('/:contactId', authenticate, ctrlWrapper(ctrl.getById));

router.post('/', authenticate, validation(schemas.contactAddSchema), ctrlWrapper(ctrl.add));

router.delete('/:contactId', authenticate, ctrlWrapper(ctrl.deleteById));

router.put('/:contactId', authenticate, validation(schemas.contactUpdateSchema), ctrlWrapper(ctrl.updateById));

router.patch("/:contactId/favorite", authenticate, validation(schemas.updateFavoriteSchema),
    ctrlWrapper(ctrl.updateStatus)
  );

module.exports = router;
