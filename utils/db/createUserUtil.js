const createError = require("http-errors");
const { create, getAll, total } = require("../../services/db/genericService");
const { hashPassword } = require("../../services/misc/authService");
const { ROLE_NAME } = require("../../enum/roleName");
const { ADMIN, USER } = require("../../enum/roleName").ROLE_NAME;
const { STAFF_MANAGER, ROLE_MANAGER } =
  require("../../enum/roleName").SUB_ROLE_NAME;
const { User, Role, sequelize } = require("../../models");

exports.createTestUser = async () => {
  try {
    await sequelize.transaction(async (t1) => {
      const userCount = await total(User);
      const roles = await getAll(Role, { pagination: false }, [], []);
      if (userCount <= 0) {
        //super admin
        await create(User, {
          name: "Super Admin",
          email: "admin@gmail.com",
          roleId: roles.find((i) => i.subName === ROLE_NAME.SUPER_ADMIN).id,
          password: await hashPassword("pass1234"),
          contact: "9832122323",
          isVerified: true,
        });
        for (const [_ind, _] of new Array(2).entries()) {
          for (let [index, value] of [
            { name: USER, subName: USER },
            { name: ADMIN, subName: ADMIN },
            { name: ADMIN, subName: STAFF_MANAGER },
            { name: ADMIN, subName: ROLE_MANAGER },
          ].entries()) {
            await create(User, {
              name: value.subName.replace("_", " ") + " " + index + _ind,
              email:
                value.subName.toLowerCase().replace("_", "") +
                index +
                _ind +
                "@gmail.com",
              roleId: roles.find((i) => i.subName === value.subName).id,
              password: await hashPassword("pass1234"),
              contact: "98320192" + index + _ind,
              country: "Nepal" + index + _ind,
              isVerified: true,
            });
          }
        }
        console.log("Test User Created");
      }
    });
  } catch (e) {
    console.log(e);
    throw createError(500, "Error in creating test users");
  }
};
