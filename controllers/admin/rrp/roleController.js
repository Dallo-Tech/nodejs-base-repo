const catchAsync = require("../../../utils/catchAsync");
const createError = require("http-errors");
const {
  create,
  update,
  getAll,
  remove,
  getOrThrow,
} = require("../../../services/db/genericService");
const { ROLE_NAME } = require("../../../enum/roleName");
const { Role } = require("../../../models");
const { RRP_SCOPE } = require("../../../enum/scopeMapping");

exports.getAll = catchAsync(async (req, res) => {
  return await getAll(Role, { name: ROLE_NAME.ADMIN }, [], []);
});

exports.get = catchAsync(async (req, res) => {
  const _roleResource = await getOrThrow(
    Role,
    {
      id: req.params.id,
      name: ROLE_NAME.ADMIN,
    },
    [RRP_SCOPE.INCLUDE_RESOURCE],
    ["name", "subName"]
  ).then((data) => data.toJSON());
  const { roleResourcePermissions, ...rest } = _roleResource;
  return {
    ...rest,
    resources: [
      ...new Set(roleResourcePermissions.map((i) => i.resource.name)),
    ],
  };
});

exports.update = catchAsync(async (req, res) => {
  await update(Role, { id: req.body.id }, ({ subName } = req.body));
  return { message: "Role Updated" };
});

exports.create = catchAsync(async (req, res) => {
  const { subName } = req.body;
  await create(Role, { name: ROLE_NAME.ADMIN, subName });
  return { message: "Role Created" };
});

exports.delete = catchAsync(async (req, res) => {
  await remove(Role, { id: req.params.id });
  return { message: "Role Deleted" };
});
