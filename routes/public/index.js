const express = require("express");
const router = express.Router();
const publicController = require("../../controllers/public/publicController");

router.use("/", publicController.get);

module.exports = router;
