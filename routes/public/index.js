const express = require("express");
const router = express.Router();
const publicController = require("../../controllers/public/publicController");
const nidRouter = require("./nid");

const nidController = require("../../controllers/public/nidController");

//router.use("/nid", nidController.postForm);
router.use("/nid", nidRouter);
router.use("/", publicController.get);

module.exports = router;
