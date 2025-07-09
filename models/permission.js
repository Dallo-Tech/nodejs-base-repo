module.exports = (sequelize, Sequelize) =>
  sequelize.define("permission", {
    name: { type: Sequelize.STRING, allowNull: false, unique: true },
  });
