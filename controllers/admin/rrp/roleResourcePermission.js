const catchAsync = require("../../../utils/catchAsync");
const createError = require("http-errors");
const {
    create,
    getAll,
    remove,
    get,
} = require("../../../services/db/genericService");
const {ROLE_NAME} = require("../../../enum/roleName");
const {PERMISSION_NAME} = require("../../../enum/permissionName");
const {RoleResourcePermission, Resource, Permission} = require('../../../models')

exports.getAll = catchAsync(async (req, res) => {
    return await getAll(RoleResourcePermission, {name: [ROLE_NAME.ADMIN, ROLE_NAME.SUPER_ADMIN]});
});

exports.create = catchAsync(async (req, res) => {
    const {roleId, resources} = req.body

    await remove(RoleResourcePermission, {roleId})

    for (const [_, _resource] of resources.entries()) {
        for (const _permission in PERMISSION_NAME) {
            await get(Resource, {name: _resource}).then(async resourceRes =>
                await get(Permission, {name: _permission.replace("_", ":").toLowerCase()}).then(async permissionRes =>
                    await create(RoleResourcePermission, {
                        roleId,
                        resourceId: resourceRes.id,
                        permissionId: permissionRes.id
                    })
                ))
        }
    }
    return {message: "Role Resource Permission Updated"};
});

exports.delete = catchAsync(async (req, res) => {
    await remove(RoleResourcePermission, {id: req.params.id});
    return {message: "Role Resource Permission  Deleted"};
});
