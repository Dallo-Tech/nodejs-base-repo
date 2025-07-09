const router = require("express").Router();
const roleResourcePermission = require("../../../../controllers/admin/rrp/roleResourcePermission");
const {grantAccess} = require("../../../../middlewares/roleAuth");
const {PERMISSION_NAME} = require("../../../../enum/permissionName");
const {RESOURCE_NAME} = require("../../../../enum/resourceName");

router.post(
    "/",
    grantAccess(PERMISSION_NAME.CREATE_ANY, RESOURCE_NAME.ROLE_PERMISSION),
    roleResourcePermission.create
    // #swagger.tags =['Admin-Role Resource Permission']
    // #swagger.summary = 'Add Role Resource Permission'
    /*  #swagger.parameters['rrp'] ={
      in: 'body',
      description: 'Api to add role resource permission',
      schema: {
      $ref:'#/definitions/roleResourcePermission'}
  } */
);

router.get(
    "/",
    grantAccess(PERMISSION_NAME.READ_ANY, RESOURCE_NAME.ROLE_PERMISSION),
    roleResourcePermission.getAll
    // #swagger.tags =['Admin-Role Resource Permission']'
    // #swagger.summary = 'Get All Role Resource Permission'
);


router.delete(
    "/:id",
    grantAccess(PERMISSION_NAME.DELETE_ANY, RESOURCE_NAME.ROLE_PERMISSION),
    roleResourcePermission.delete
    // #swagger.tags =['Admin-Role Resource Permission']
    // #swagger.summary = 'Delete Role Resource Permission'
);

module.exports = router;
