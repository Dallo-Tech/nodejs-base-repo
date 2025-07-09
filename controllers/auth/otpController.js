const {
  getOrThrow,
  update,
  remove,
} = require("../../services/db/genericService");
const catchAsync = require("../../utils/catchAsync");
const createError = require("http-errors");
const { generateOtp, sendOtp } = require("../../utils/otp");
const { Otp, User } = require("../../models");
const { OTP_TYPE } = require("../../enum/otpType");
const { USER_SCOPE } = require("../../enum/scopeMapping");

exports.verify = catchAsync(
  async (req, res) => {
    const { code } = req.body;

    const otp = await getOrThrow(Otp, { code, otpType: OTP_TYPE.REGISTRATION });
    const findUser = await getOrThrow(User, { email: otp.email }, [
      USER_SCOPE.INCLUDE_ROLE,
    ]);

    //checking expiry time
    if (new Date(otp.expireTime) < new Date()) {
      //new otp sent
      const { code, expireTime } = generateOtp();
      await update(Otp, { id: otp.id }, { code, expireTime });
      await sendOtp(findUser.email, OTP_TYPE.REGISTRATION);
      throw createError(498, "Otp token has expired. New Otp has been sent.");
    }

    await remove(Otp, { id: otp.id });
    await update(User, { id: findUser.id }, { isVerified: true });

    return { message: "User successfully verified" };
  },
  true,
  false
);

exports.send = catchAsync(async (req, res) => {
  const { email, otpType = OTP_TYPE.REGISTRATION } = req.body;
  await sendOtp(email, otpType);
  return {
    message:
      otpType === OTP_TYPE.REGISTRATION
        ? "Registration"
        : "Password Reset" + " Link has been send to your mail. Please check",
  };
});
