const jwt = require("jsonwebtoken");
const createError = require("http-errors");
const { get } = require("../services/db/genericService");
const { User } = require("../models");
const catchAsync = require("../utils/catchAsync");
const { USER_SCOPE } = require("../enum/scopeMapping");

exports.authenticateToken = catchAsync(async (req, res, next) => {
  // Gather the jwt access token from the request header
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (token == null) throw createError(401, "Unauthorized Access");

  await jwt.verify(
    token,
    process.env.ACCESS_TOKEN_SECRET,
    async (err, user) => {
      if (err) throw createError(401, "Unauthorized Access. Invalid Token");

      const userData = await get(
        User,
        { id: user.userId },
        [USER_SCOPE.INCLUDE_ROLE],
        ["id", "email", "password"]
      );
      if (userData) {
        req.user = userData;
        next(); // pass the execution off to whatever request the client intended
      } else {
        throw createError(401, "Unauthorized Access");
      }
    }
  );
}, false);
