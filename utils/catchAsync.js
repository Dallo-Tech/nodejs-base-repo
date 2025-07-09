const { S3_BASE_PATH } = require("../constant/API");
const { sequelize } = require("../models");

module.exports = catchAsync =
  (fn, sendResponse = true, transaction = true) =>
  async (req, res, next) => {
    // error and success response here
    let error, result;
    if (transaction) {
      [error, result] = await Promise.resolve(
        //sequelize transaction
        sequelize.transaction(async (t1) => fn(req, res, next))
      )
        .then(async (res) => {
          return [null, res];
        })
        .catch(async (err) => {
          return [err || true, null];
        });
    } else {
      [error, result] = await Promise.resolve(fn(req, res, next))
        .then((res) => [null, res])
        .catch((err) => [err || true, null]);
    }

    error && console.log(error);

    (sendResponse || error) &&
      res.status(error ? error.status || 500 : 200).json({
        status: error ? error.status || 500 : 200,
        data: error ? "An Error Occurred" : result,
        ...(req?.user && !error ? { basePath: S3_BASE_PATH } : {}),
        message: error
          ? error.message || "Something broke"
          : "API request successfull",
        ...(req.app.get("env") === "development" &&
          error && {
            devStack: error.stack,
          }),
      });
  };
