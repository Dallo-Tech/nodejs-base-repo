module.exports = (sequelize, Sequelize) =>
  sequelize.define("resource", {
    name: { type: Sequelize.STRING, allowNull: false, unique: true },
  });
