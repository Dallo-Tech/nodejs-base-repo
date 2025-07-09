const createError = require("http-errors");
const {
  create,
  total,
  getAll,
  createOrConnect,
} = require("../../services/db/genericService");
const { PERMISSION_NAME } = require("../../enum/permissionName");
const { RESOURCE_NAME } = require("../../enum/resourceName");
const { ROLE_NAME, SUB_ROLE_NAME } = require("../../enum/roleName");
const {
  RoleResourcePermission,
  Role,
  Resource,
  Permission,
  sequelize,
} = require("../../models");

exports.createTestResourcePermission = async () => {
  try {
    await sequelize.transaction(async (t1) => {
      const rrpCount = await total(RoleResourcePermission);
      if (rrpCount <= 0) {
        const resourceName = Object.values(RESOURCE_NAME);
        const permissionName = Object.values(PERMISSION_NAME);
        for (const [_, val] of [
          {
            subRole: SUB_ROLE_NAME.STAFF_MANAGER,
            resource: RESOURCE_NAME.STAFF_MANAGEMENT,
          },
          {
            subRole: SUB_ROLE_NAME.ROLE_MANAGER,
            resource: RESOURCE_NAME.ROLE_PERMISSION,
          },
          { subRole: ROLE_NAME.SUPER_ADMIN },
          { subRole: ROLE_NAME.ADMIN },
        ].entries()) {
          for (const [_, _permission] of permissionName.entries()) {
            const allRole = await getAll(Role, { pagination: false }, [], []);
            const createData = async (resourceName) =>
              await createOrConnect(
                Resource,
                { name: resourceName },
                { name: resourceName }
              ).then(
                async (resourceRes) =>
                  await createOrConnect(
                    Permission,
                    { name: _permission },
                    { name: _permission }
                  ).then(
                    async (permissionRes) =>
                      await create(RoleResourcePermission, {
                        roleId: allRole.find((i) => i.subName === val.subRole)
                          .id,
                        resourceId: resourceRes[0]?.id,
                        permissionId: permissionRes[0]?.id,
                      })
                  )
              );

            if (
              val.subRole === ROLE_NAME.SUPER_ADMIN ||
              val.subRole === ROLE_NAME.ADMIN
            ) {
              for (const [_, _resource] of resourceName.entries()) {
                await createData(_resource);
              }
            } else {
              await createData(val.resource);
            }
          }
        }
        console.log("Test Role Resource Permission Created");
      }
    });
  } catch (e) {
    console.log(e);
    throw createError(500, "Error in creating Role");
  }
};
