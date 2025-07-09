const AccessControl = require("accesscontrol");
const { getAll, prisma } = require("../db/genericService");
const { Role } = require("../../models");

exports.getAccessControl = async () => {
  const data = await getAll(
    Role,
    { pagination: false },
    ["includeResourcePermission"],
    ["subName"]
  );

  const authRoles = [];
  data.forEach((el) => {
    el.roleResourcePermissions.forEach((rrp) => {
      authRoles.push({
        role: el.subName,
        resource: rrp.resource.name,
        action: rrp.permission.name,
      });
    });
  });

  const ac = new AccessControl(authRoles);
  return ac;
};
