const router = require("express").Router();
const roleRouter = require('./role')
const resourceRouter = require('./resource')
const rrpRouter = require('./roleResourcePermission')

router.use("/role", roleRouter);
router.use("/resource", resourceRouter);
router.use("/rrp", rrpRouter);

module.exports = router;