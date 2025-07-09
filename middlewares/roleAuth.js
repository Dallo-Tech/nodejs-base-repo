const { getAccessControl } = require("../services/misc/accessControlService");
const catchAsync = require("../utils/catchAsync");
const createError = require("http-errors");

exports.grantAccess = (action, resources) =>
  catchAsync(async (req, res, next) => {
    const roles = await getAccessControl();
    const userRole = req.user.role.subName;

    // read:any --> readAny
    const actionArr = action.split(":");
    actionArr[1] = actionArr[1].charAt(0).toUpperCase() + actionArr[1].slice(1);
    const newAction = actionArr.join("");

    if (!userRole) {
      throw createError(401, "User does not have any role");
    }

    const roleExists = Object.keys(roles.getGrants()).includes(userRole);

    if (!roleExists) {
      throw createError(403, "Role is not defined in access control");
    }

    //checking permission
    const permission = roles.can(userRole)[newAction](resources);

    if (!permission.granted) {
      throw createError(
        403,
        "You don't have enough permission to perform this action"
      );
    }
    next();
  }, false);
