const { OTP_TYPE } = require("../enum/otpType");
module.exports = (sequelize, Sequelize) =>
  sequelize.define("otp", {
    email: { type: Sequelize.STRING, allowNull: false, unique: true },
    code: { type: Sequelize.STRING, allowNull: false, unique: true },
    otpType: {
      type: Sequelize.ENUM,
      values: Object.keys(OTP_TYPE),
      allowNull: false,
    },
    expireTime: { type: Sequelize.DATE, allowNull: false },
  });
