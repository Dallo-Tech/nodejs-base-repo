const { v4: uuidv4 } = require("uuid");
const { makeId } = require("../utils/randomNumberGenerator");
module.exports = (sequelize, Sequelize) =>
  sequelize.define(
    "citizen",
    {
      id: {
        type: Sequelize.STRING,
        primaryKey: true,
        autoIncrement: false,
      },

      //name
      firstName: { type: Sequelize.STRING, allowNull: false },
      lastName: { type: Sequelize.STRING, allowNull: false },
      middleName: { type: Sequelize.STRING, allowNull: true },

      dateOfBirth : { type: Sequelize.DATEONLY, allowNull: false},

      // Citizenship details

      citizenship: { type: Sequelize.STRING, allowNull: false, unique: true },
      issuedDate: { type: Sequelize.DATEONLY, allowNull: false},
      issuedDistrict: { type: Sequelize.STRING, allowNull: false },

      // address
      permanentAddressState: { type: Sequelize.STRING, allowNull: true },
      permanentAddressDistrict: { type: Sequelize.STRING, allowNull: true },

      temporaryAddressState: { type: Sequelize.STRING, allowNull: true },
      temporaryAddressDistrict: { type: Sequelize.STRING, allowNull: true },

      // parents Details
      fatherFirstName: { type: Sequelize.STRING, allowNull: false },
      fatherLastName: { type: Sequelize.STRING, allowNull: false },
      middleName: { type: Sequelize.STRING, allowNull: true },

      motherFirstName: { type: Sequelize.STRING, allowNull: false },
      motherLastName: { type: Sequelize.STRING, allowNull: false },
      motherMiddleName: { type: Sequelize.STRING, allowNull: true },

      // images
      //contact: { type: Sequelize.STRING, allowNull: true },
      citizenshipImage: { type: Sequelize.STRING, allowNull: true },

    },
    {
      hooks: {
        beforeCreate: async (citizen, options) => {
          const countCitizens = (await sequelize.models.user.count()) + 1;
          user.id = uuidv4();
        },
      },
    }
  );
