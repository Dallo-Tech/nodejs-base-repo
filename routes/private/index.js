const router = require("express").Router();
const rrpRoutes = require("./admin/rrp");

router.use("/", rrpRoutes);

module.exports = router;
