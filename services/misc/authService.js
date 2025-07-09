const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

exports.generateToken = (id) => {
  return jwt.sign({ userId: id }, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "24h",
  });
};

exports.hashPassword = (password) => bcrypt.hash(password, 12);

exports.comparePassword = (password, dbPassword) =>
  bcrypt.compare(password, dbPassword);
