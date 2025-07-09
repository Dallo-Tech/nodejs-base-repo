const { v4: uuidv4 } = require("uuid");
const { makeId } = require("../utils/randomNumberGenerator");
module.exports = (sequelize, Sequelize) =>
  sequelize.define(
    "user",
    {
      id: {
        type: Sequelize.STRING,
        primaryKey: true,
        autoIncrement: false,
      },
      name: { type: Sequelize.STRING, allowNull: false },
      email: { type: Sequelize.STRING, allowNull: false, unique: true },
      password: { type: Sequelize.STRING, allowNull: false },
      address: { type: Sequelize.STRING, allowNull: true },
      contact: { type: Sequelize.STRING, allowNull: true },
      profileImage: { type: Sequelize.STRING, allowNull: true },
    },
    {
      hooks: {
        beforeCreate: async (user, options) => {
          const countUsers = (await sequelize.models.user.count()) + 1;
          user.id = uuidv4();
        },
      },
    }
  );
