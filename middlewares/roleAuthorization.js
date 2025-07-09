const createError = require("http-errors");
const catchAsync = require("../utils/catchAsync");

module.exports = roleAuthorization = (roleList) =>
  catchAsync(async (req, res, next) => {
    if (roleList.includes(req.user.role.name)) {
      next();
    } else {
      throw createError(401, "Sorry, Unauthorized Access");
    }
  }, false);
