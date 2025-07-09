const router = require("express").Router();
const roleController = require("../../../../controllers/admin/rrp/roleController");
const {grantAccess} = require("../../../../middlewares/roleAuth");
const {PERMISSION_NAME} = require("../../../../enum/permissionName");
const {RESOURCE_NAME} = require("../../../../enum/resourceName");

router.post(
    "/",
    grantAccess(PERMISSION_NAME.CREATE_ANY, RESOURCE_NAME.ROLE_PERMISSION),
    roleController.create
    // #swagger.tags =['Admin-Role']
    // #swagger.summary = 'Add Role'
    /*  #swagger.parameters['role'] ={
                          in: 'body',
                              description: 'Api to add role',
                              schema: {
                              $ref:'#/definitions/addRole'}
                          }  */
);

router.get(
    "/",
    grantAccess(PERMISSION_NAME.READ_ANY, RESOURCE_NAME.ROLE_PERMISSION),
    roleController.getAll
    // #swagger.tags =['Admin-Role']'
    // #swagger.summary = 'Get All Role'
);

router.get(
    "/:id",
    grantAccess(PERMISSION_NAME.READ_ANY, RESOURCE_NAME.ROLE_PERMISSION),
    roleController.get
    // #swagger.tags =['Admin-Role']'
    // #swagger.summary = 'Get One Role'
);

router.patch(
    "/",
    grantAccess(PERMISSION_NAME.UPDATE_ANY, RESOURCE_NAME.ROLE_PERMISSION),
    roleController.update
    // #swagger.tags =['Admin-Role']'
    // #swagger.summary = 'Update Role'
    /*  #swagger.parameters['role'] ={
                      in: 'body',
                          description: 'Api to update role',
                          schema: {
                          $ref:'#/definitions/updateRole'}
                      }  */
);

router.delete(
    "/:id",
    grantAccess(PERMISSION_NAME.DELETE_ANY, RESOURCE_NAME.ROLE_PERMISSION),
    roleController.delete
    // #swagger.tags =['Admin-Role']
    // #swagger.summary = 'Delete Role'
);

module.exports = router;
