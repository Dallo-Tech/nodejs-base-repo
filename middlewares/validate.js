const {validationResult, checkSchema} = require("express-validator");
const schema = require('../validations/index')

const myValidationResult = validationResult.withDefaults({
  formatter: (error) => {
    return {
      msg: error.msg,
      param: error.param,
    };
  },
});

module.exports = validate = () => {
  return async (req, res, next) => {
    const errors = myValidationResult(req);
    if (errors.isEmpty()) {
      return next();
    }

    res.json({
      status: 422,
      data: "An Error Occurred",
      message: errors.array(),
    });
  };
};