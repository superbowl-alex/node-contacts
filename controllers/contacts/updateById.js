const { Contact } = require("../../models/contact");
const createError = require("http-errors");

const updateById = async (req, res) => {
    const {contactId} = req.params;
    const result = await Contact.findByIdAndUpdate(contactId, req.body, {
        new: true,
      });
    if(!result) {
      throw createError(404, `Contact with id=${contactId} not found`);
    }
    res.status(201).json({
      status: "success",
      code: 201,
      data: {
        result
      }
    });
  };

  module.exports = updateById;
