const Sequelize = require("sequelize");

module.exports = (sequelize, Sequelize) =>
  sequelize.define("Nid", {
    id: {
      type: Sequelize.DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    username: Sequelize.DataTypes.STRING,
    dob: Sequelize.DataTypes.DATE,
    address: Sequelize.DataTypes.STRING,
    district: Sequelize.DataTypes.STRING,
    mun: Sequelize.DataTypes.STRING,
    gender: Sequelize.DataTypes.STRING,
    phone: {
      type: Sequelize.DataTypes.BIGINT,
      unique: true
    },
    citizenship: {
      type: Sequelize.DataTypes.STRING,
      unique: true
    },
    // todo: save in fs
    citizenship_img_path: {
      type: Sequelize.DataTypes.STRING,
      unique: true
    }
  })

