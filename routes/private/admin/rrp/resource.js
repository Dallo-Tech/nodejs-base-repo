const router = require("express").Router();
const resourceController = require("../../../../controllers/admin/rrp/resourceController");
const {grantAccess} = require("../../../../middlewares/roleAuth");
const {PERMISSION_NAME} = require("../../../../enum/permissionName");
const {RESOURCE_NAME} = require("../../../../enum/resourceName");

router.get(
    "/",
    grantAccess(PERMISSION_NAME.READ_ANY, RESOURCE_NAME.ROLE_PERMISSION),
    resourceController.getAll
    // #swagger.tags =['Admin-Resource']'
    // #swagger.summary = 'Get All Resource'
);


module.exports = router;
