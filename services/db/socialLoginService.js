const { User } = require("../../models/index");

exports.createUser = async (params) => {
  return await User.create(params);
};

exports.getUser = async (filter = {}) => {
  return await User.findOne({ where: filter });
};
