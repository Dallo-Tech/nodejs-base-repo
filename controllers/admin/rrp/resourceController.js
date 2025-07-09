const catchAsync = require("../../../utils/catchAsync");
const { getAll } = require("../../../services/db/genericService");
const { Resource } = require("../../../models");

exports.getAll = catchAsync(async (req, res) => {
  return await getAll(Resource, {}, [], []);
});
