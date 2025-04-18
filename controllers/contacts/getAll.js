const { Contact } = require("../../models/contact");

const getAll = async (req, res) => {
  const { _id: owner } = req.user;
  const isFavorite = Boolean(req.query.favorite);
  const { page = 1, limit = 20, favorite } = req.query;
  const skip = (page - 1) * limit;

  const filter = { owner };

  if (favorite !== undefined) {
    if (favorite === "true") {
      filter.favorite = true;
    } else if (favorite === "false") {
      filter.favorite = false;
    }
  };

  const result = await Contact.find(filter, {}, { skip, limit }).populate(
    "owner",
    "email"
  );

  res.status(200).json({ 
    status: "success",
    code: 200,
    data: {
      result
    }
  });
}

module.exports = getAll;