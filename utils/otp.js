const {
  getOrThrow,
  create,
  update,
  get,
} = require("../services/db/genericService");
const createError = require("http-errors");
const { v4: uuidv4 } = require("uuid");
const { sendMail } = require("../utils/mailUtil");
const { Otp, User } = require("../models");
const { OTP_TYPE } = require("../enum/otpType");
const {
  getForgetPasswordTemplate,
  getRegistrationTemplate,
} = require("./mailUtil");

exports.generateOtp = () => {
  const minute = 5;
  const expireTime = new Date(new Date().getTime() + minute * 60000);
  return { code: uuidv4(), expireTime };
};

exports.sendOtp = async (email, otpType) => {
  const otp = await get(Otp, { email });
  const findUser = await getOrThrow(User, { email });
  const { name } = findUser;
  const { code, expireTime } = this.generateOtp();
  if (otp === null) {
    await create(Otp, { email, code, expireTime, otpType });
  } else {
    await update(Otp, { id: otp.id }, { code, expireTime, otpType });
  }
  const path = otpType === OTP_TYPE.REGISTRATION ? "/verify" : "/login";
  const redirectionLink = `${process.env.FRONT_END_DOMAIN}${path}?code=${code}&otpType=${otpType}`;
  const content =
    otpType === OTP_TYPE.REGISTRATION
      ? getRegistrationTemplate(name, redirectionLink)
      : getForgetPasswordTemplate(name, redirectionLink);
  sendMail(
    findUser.email,
    otpType === OTP_TYPE.REGISTRATION
      ? "Registration Confirmation"
      : "Password Reset Request",
    content
  );
};
