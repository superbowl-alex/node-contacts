const { Schema, model } = require("mongoose");
const Joi = require("joi");
const { handleSchemaValidationErrors } = require("../helpers");

const contactSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Set name for contact"],
    },
    email: {
      type: String,
      required: [true, "Set email for contact"],
    },
    phone: {
      type: String,
      required: [true, "Set phone for contact"],
    },
    favorite: {
      type: Boolean,
      default: false,
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
  },
  { versionKey: false, timestamps: true }
);

contactSchema.post("save", handleSchemaValidationErrors);

const contactAddSchema = Joi.object({
    name: Joi.string().min(3).max(30).required(),
    email: Joi.string()
        .email({ tlds: { allow: false } })
        .required(),
    phone: Joi.string()
        .min(7)
        .max(15)
        .pattern(
        /\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}/
        )
        .required(),
    favorite: Joi.bool(),
});
  
const contactUpdateSchema = Joi.object({
    name: Joi.string().min(3).max(30),
    email: Joi.string()
        .email({ tlds: { allow: false } }),
    phone: Joi.string()
        .min(7)
        .max(15)
        .pattern(
        /\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}/
        ),
    favorite: Joi.bool(),
}).min(1).messages({"object.min": "Body must have at least one field"});

const updateFavoriteSchema = Joi.object({
    favorite: Joi.bool().required(),
});

const schemas = {
    contactAddSchema,
    contactUpdateSchema,
    updateFavoriteSchema,
};

const Contact = model("contact", contactSchema);

module.exports = {
  Contact,
  schemas,
};