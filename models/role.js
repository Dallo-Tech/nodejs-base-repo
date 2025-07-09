module.exports = (sequelize, Sequelize) =>
  sequelize.define(
    "role",
    {
      name: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: "name_subName",
      },
      subName: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: "name_subName",
      },
    },
    {
      indexes: [
        {
          unique: true,
          name: "name_subName",
          fields: ["name", "subName"],
        },
      ],
    }
  );
