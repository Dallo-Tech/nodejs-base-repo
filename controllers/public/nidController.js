const catchAsync = require("../../utils/catchAsync");
const { sequelize, Sequelize } = require("../../models/index");
const Citizen = require("../../models/nidForm")(sequelize, Sequelize);

exports.postForm = catchAsync(async (req, res) => {
  // verify presence of important credentials
  // check if it already exists
  // throw error

  // check presence of image
  // if not throw multererror
  console.log("reached here in postform");
  const {
    firstName,
    lastName,
    middleName,
    dateOfBirth,

    citizenship,
    issuedDate,
    issuedDistrict,

    permanentAddressState,
    permanentAddressDistrict,

    temporaryAddressState,
    temporaryAddressDistrict,

    fatherFirstName,
    fatherLastName,
    fatherMiddleName,

    motherFirstName,
    motherLastName,
    motherMiddleName,
  } = req.body;

  //const citizenshipImageFile = req.file;

  if (
    !firstName ||
    !lastName ||
    !dateOfBirth ||
    !citizenship ||
    !issuedDate ||
    !issuedDistrict ||
    !fatherFirstName ||
    !fatherLastName ||
    !motherFirstName ||
    !motherLastName ||
    !permanentAddressState ||
    !permanentAddressDistrict
  ) {
    console.error("Missing required fields:");
    return res
      .status(400)
      .json({ message: "Missing required application data." });

    if (!citizenshipImage) {
      console.error("Missing required image:");
      return res
        .status(400)
        .json({ message: "Missing required citizenship image." });
    }
  }

  const newCitizen = await Citizen.create({
    firstName,
    lastName,
    middleName,
    dateOfBirth,

    citizenship,
    issuedDate,
    issuedDistrict,

    permanentAddressState,
    permanentAddressDistrict,

    temporaryAddressState,
    temporaryAddressDistrict,

    fatherFirstName,
    fatherLastName,
    fatherMiddleName,

    motherFirstName,
    motherLastName,
    motherMiddleName,

    //citizenshipImage: citizenshipImageFile.toString()
  });

  res.status(201).json({
    message: "citizen created successfully",
    //citizen: newCitizen
  });
});

exports.getDetails = catchAsync(async (req, res) => {
  const { id } = req.params;
  const citizen = await Citizen.findByPk(id);

  if (!citizen) {
    return res.status(404).json({
      status: "fail",
      message: `Citizen with ID ${id} not found.`,
    });
  }

  res.status(200).json({
    status: "success",
    data: {
      citizen,
    },
  });
});
