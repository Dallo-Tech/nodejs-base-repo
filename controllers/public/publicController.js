const catchAsync = require("../../utils/catchAsync");

exports.get = catchAsync(async (req, res) => {
  console.log("reached here");
});
