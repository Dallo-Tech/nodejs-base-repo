const catchAsync = require("../../utils/catchAsync");
const createError = require("http-errors");
const {
  update,
  remove,
  getAll,
  getOrThrow,
  create,
  get,
} = require("../../services/db/genericService");
const {
  generateToken,
  comparePassword,
  hashPassword,
} = require("../../services/misc/authService");
const { ROLE_NAME } = require("../../enum/roleName");
const { sendOtp, generateOtp } = require("../../utils/otp");
const { User, RoleResourcePermission, Otp, Role } = require("../../models");
const { OTP_TYPE } = require("../../enum/otpType");
const { USER_SCOPE, RRP_SCOPE } = require("../../enum/scopeMapping");

exports.login = catchAsync(
  async (req, res) => {
    const { email, password } = req.body;

    // user exists?
    const findUser = await getOrThrow(User, { email }, [
      USER_SCOPE.INCLUDE_ROLE,
    ]);

    if (!findUser.isVerified) {
      await sendOtp(email, OTP_TYPE.REGISTRATION);
      throw createError(
        403,
        "Your email isn't verified yet. Verification Link is send to your mail.Please check your mail"
      );
    }

    //is password matched?
    const matched = await comparePassword(password, findUser.password);
    if (!matched) {
      throw createError(401, "Incorrect Credentials");
    }

    let resources = [];
    if (
      findUser.role.name === ROLE_NAME.ADMIN ||
      findUser.role.name === ROLE_NAME.SUPER_ADMIN
    ) {
      const rrp = await getAll(
        RoleResourcePermission,
        { pagination: false },
        [
          RRP_SCOPE.INCLUDE_RESOURCE,
          { method: [RRP_SCOPE.INCLUDE_ROLE, findUser.role.subName] },
        ],
        ["id"]
      );
      const arr = [];
      for (const [_, val] of rrp.entries()) {
        arr.push(val.resource.name);
      }
      resources = [...new Set(arr)];
    }

    // Create token
    const token = generateToken(findUser.id);
    return {
      token: "Bearer " + token,
      user: {
        name: findUser.name,
        email: findUser.email,
        role: findUser.role.name,
        profileImage: findUser.profileImage,
        isVerified: findUser.isVerified,
        ...(findUser.role.name === ROLE_NAME.ADMIN ||
        findUser.role.name === ROLE_NAME.SUPER_ADMIN
          ? {
              subRole: findUser.role.subName,
              resources,
            }
          : {}),
      },
    };
  },
  true,
  false
);

exports.resetPassword = catchAsync(
  async (req, res) => {
    const { newPassword, code } = req.body;

    //otp exists?
    const otp = await getOrThrow(Otp, {
      code,
      otpType: OTP_TYPE.FORGET_PASSWORD,
    });

    //checking expiry time
    if (new Date(otp.expireTime) < new Date()) {
      //new otp sent
      const { code, expireTime } = generateOtp();
      await update(Otp, { id: otp.id }, { code, expireTime });
      await sendOtp(email, OTP_TYPE.FORGET_PASSWORD);
      throw createError(
        498,
        "Link has expired. New Link has been sent to your email. Please check your email"
      );
    }

    //user detail
    const findUser = await getOrThrow(User, { email: otp.email });

    await update(
      User,
      { id: findUser.id },
      { password: await hashPassword(newPassword) }
    );
    await remove(Otp, { id: otp.id });

    return { message: "Password Reset Successful" };
  },
  true,
  false
);

exports.register = catchAsync(async (req, res) => {
  const { email, password, role } = req.body;

  const exists = await get(User, { email });
  if (exists) {
    throw createError(409, "User already exist");
  }

  await get(Role, { name: role }).then(
    async (roleRes) =>
      await create(User, {
        ...req.body,
        password: await hashPassword(password),
        roleId: roleRes.id,
      })
  );

  await sendOtp(email, OTP_TYPE.REGISTRATION);
  return {
    message: "Registration Link has been sent to your email. Please check",
  };
});
