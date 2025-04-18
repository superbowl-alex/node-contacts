const { Contact } = require("../../models/contact");
const createError = require("http-errors");

const getById = async (req, res) => {
  const {contactId} = req.params;
  const result = await Contact.findById(contactId);
  if(!result) {
    throw createError(404, `Contact with id=${contactId} not found`);
  }
  res.status(200).json({
    status: "success",
    code: 200,
    data: {
      result
    }
  });
};

module.exports = getById;
