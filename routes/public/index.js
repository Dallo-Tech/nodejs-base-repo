const express = require("express");
const router = express.Router();
const publicController = require("../../controllers/public/publicController");
const NIDRouter = require("./nid")

router.use("/nid", NIDRouter)
router.use("/", publicController.get);

module.exports = router;
