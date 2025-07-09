const createError = require("http-errors");
const { ROLE_NAME, SUB_ROLE_NAME } = require("../../enum/roleName");
const { create, total } = require("../../services/db/genericService");
const { Role, sequelize } = require("../../models");

exports.createTestRole = async () => {
  try {
    await sequelize.transaction(async (t1) => {
      const readCount = await total(Role);

      if (readCount <= 0) {
        for (const [key, value] of Object.entries(ROLE_NAME)) {
          await create(Role, { name: value, subName: value });
        }
        for (const [key, value] of Object.entries(SUB_ROLE_NAME)) {
          await create(Role, { name: ROLE_NAME.ADMIN, subName: value });
        }
        console.log("Test Role Created");
      }
    });
  } catch (e) {
    console.log(e);
    throw createError(500, "Error in creating Role");
  }
};
